package example.docuroom.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.exception.SdkClientException;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;
import software.amazon.awssdk.transfer.s3.S3TransferManager;
import software.amazon.awssdk.transfer.s3.model.*;
import software.amazon.awssdk.transfer.s3.progress.LoggingTransferListener;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class S3Service {

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    private final S3Client s3Client;
    private final S3TransferManager transferManager;
    private final S3Presigner presigner;

    @Autowired
    public S3Service(S3Client s3Client, S3TransferManager transferManager, S3Presigner presigner) {
        this.s3Client = s3Client;
        this.transferManager = transferManager;
        this.presigner = presigner;
    }

    public String uploadFile(MultipartFile file, String folderName) {
        String fileName = generateUniqueFileName(file.getOriginalFilename());
        String key = folderName + "/" + fileName;
        File tempFile = createTempFile(file);

        try {
            UploadFileRequest uploadFileRequest = UploadFileRequest.builder()
                    .putObjectRequest(PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key(key)
                            .contentType(file.getContentType()) // Set the content type
                            .build())
                    .addTransferListener(LoggingTransferListener.create())
                    .source(tempFile.toPath())
                    .build();

            FileUpload fileUpload = transferManager.uploadFile(uploadFileRequest);
            fileUpload.completionFuture().join();

            // Generate presigned URL
            return generatePresignedUrl(key);

        } catch (Exception e) {
            throw new RuntimeException("Failed to upload file to S3 folder '" + folderName + "'", e);
        } finally {
            deleteTempFile(tempFile);
        }
    }

    private String generatePresignedUrl(String key) {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        GetObjectPresignRequest getObjectPresignRequest = GetObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(2*24*60)) // URL valid for 60 minutes
                .getObjectRequest(getObjectRequest)
                .build();

        PresignedGetObjectRequest presignedGetObjectRequest = presigner.presignGetObject(getObjectPresignRequest);
        return presignedGetObjectRequest.url().toString();
    }
    public byte[] downloadFile(String fileName) {
        File tempFile = null;
        try {
            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .build();

            // Create a temporary file to store the downloaded content
            tempFile = File.createTempFile("s3-download-", null);

            DownloadFileRequest downloadFileRequest = DownloadFileRequest.builder()
                    .getObjectRequest(getObjectRequest)
                    .destination(tempFile.toPath()) // Use temporary file path
                    .build();

            FileDownload download = transferManager.downloadFile(downloadFileRequest);
            CompletedFileDownload completedFileDownload = download.completionFuture().join();

            // Read the content of the downloaded file into a byte array
            return Files.readAllBytes(tempFile.toPath());
        } catch (IOException e) {
            throw new RuntimeException("Failed to download file from S3", e);
        } finally {
            // Delete the temporary file
            if (tempFile != null && tempFile.exists()) {
                tempFile.delete();
            }
        }
    }

    public String deleteFile(String fileName) {
        try {
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .build();

            s3Client.deleteObject(deleteObjectRequest);
            return "File deleted: " + fileName;
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete file from S3", e);
        }
    }

    public List<String> listAllFiles() {
        try {
            ListObjectsV2Request listObjectsRequest = ListObjectsV2Request.builder()
                    .bucket(bucketName)
                    .build();

            return s3Client.listObjectsV2(listObjectsRequest).contents().stream()
                    .map(S3Object::key)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Failed to list files from S3", e);
        }
    }

    public boolean testConnection() {
        try {
            s3Client.listBuckets();
            return true;
        } catch (SdkClientException e) {
            System.err.println("Error testing S3 connection: " + e.getMessage());
            return false;
        }
    }

    public boolean doesBucketExist(String bucketNameToCheck) {
        try {
            HeadBucketRequest headBucketRequest = HeadBucketRequest.builder()
                    .bucket(bucketNameToCheck)
                    .build();
            s3Client.headBucket(headBucketRequest);
            return true;
        } catch (NoSuchBucketException e) {
            return false;
        } catch (Exception e) {
            System.err.println("Error checking bucket existence: " + e.getMessage());
            return false;
        }
    }

    private String generateUniqueFileName(String originalFilename) {
        return UUID.randomUUID() + "_" + originalFilename;
    }

    private File createTempFile(MultipartFile file) {
        try {
            File tempFile = File.createTempFile("temp-", null);
            try (InputStream is = file.getInputStream()) {
                Files.copy(is, tempFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
            }
            return tempFile;
        } catch (IOException e) {
            throw new RuntimeException("Failed to create temporary file", e);
        }
    }

    private void deleteTempFile(File tempFile) {
        if (!tempFile.delete()) {
            System.err.println("Could not delete temporary file: " + tempFile.getAbsolutePath());
        }
    }
}