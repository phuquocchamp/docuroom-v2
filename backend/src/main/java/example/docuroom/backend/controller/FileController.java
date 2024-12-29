package example.docuroom.backend.controller;
import example.docuroom.backend.dto.response.ApiResponse;
import example.docuroom.backend.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("v1/api/files")
public class FileController {
    private final S3Service s3Service;
    private static final long MAX_ALLOWED_SIZE = 10 * 1024 * 1024;

    public FileController(S3Service s3Service) {
        this.s3Service = s3Service;
    }

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<String>> uploadFile(
            @RequestParam(value = "file") MultipartFile file,
            @RequestParam(value = "folderName", required = false, defaultValue = "private") String folderName
    ) {
        if (file.getSize() > MAX_ALLOWED_SIZE) {
            ApiResponse<String> response = new ApiResponse<>();
            response.setStatus(HttpStatus.PAYLOAD_TOO_LARGE.value());
            response.setMessage("FILE SIZE TOO LARGE");
            return new ResponseEntity<>(response, HttpStatus.PAYLOAD_TOO_LARGE);
        }

        ApiResponse<String> response = new ApiResponse<>();
        response.setStatus(HttpStatus.OK.value());
        response.setMessage("FILE UPLOADED SUCCESSFULLY");
        response.setData(s3Service.uploadFile(file, folderName));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable String fileName) {
        byte[] data = s3Service.downloadFile(fileName);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-disposition", "attachment; filename=" + fileName);
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        return ResponseEntity.ok().headers(headers).body(data);
    }

    @DeleteMapping("/delete/{fileName}")
    public ResponseEntity<String> deleteFile(@PathVariable String fileName) {
        return new ResponseEntity<>(s3Service.deleteFile(fileName), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<String>> listAllFiles() {
        return new ResponseEntity<>(s3Service.listAllFiles(), HttpStatus.OK);
    }

    @GetMapping("/test-connection")
    public ResponseEntity<Map<String, Boolean>> testS3Connection() {
        boolean isConnected = s3Service.testConnection();
        Map<String, Boolean> response = new HashMap<>();
        response.put("isConnected", isConnected);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/check-bucket/{bucketName}")
    public ResponseEntity<Map<String, Boolean>> checkBucketExists(@PathVariable String bucketName) {
        boolean bucketExists = s3Service.doesBucketExist(bucketName);
        Map<String, Boolean> response = new HashMap<>();
        response.put("bucketExists", bucketExists);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}