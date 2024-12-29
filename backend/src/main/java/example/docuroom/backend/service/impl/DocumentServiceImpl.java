package example.docuroom.backend.service.impl;

import example.docuroom.backend.dto.request.CommentRequest;
import example.docuroom.backend.dto.request.DocumentRequest;
import example.docuroom.backend.dto.response.CommentResponse;
import example.docuroom.backend.dto.response.DocumentResponse;
import example.docuroom.backend.entity.*;
import example.docuroom.backend.exception.ResourceNotFoundException;
import example.docuroom.backend.repository.*;
import example.docuroom.backend.service.IDocumentService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class DocumentServiceImpl implements IDocumentService {
    private final DocumentRepository documentRepository;
    private final FolderRepository folderRepository;
    private final ModelMapper modelMapper;
    private final CommentRepository commentRepository;
    private final AuthRepository authRepository;
    private final DocumentESRepository documentESRepository;

    public DocumentServiceImpl(DocumentRepository documentRepository, FolderRepository folderRepository, ModelMapper modelMapper, CommentRepository commentRepository, AuthRepository authRepository, DocumentESRepository documentESRepository) {
        this.documentRepository = documentRepository;
        this.folderRepository = folderRepository;
        this.modelMapper = modelMapper;
        this.commentRepository = commentRepository;
        this.authRepository = authRepository;
        this.documentESRepository = documentESRepository;
    }

    @Override
    public DocumentResponse createDocument(DocumentRequest documentRequest) {
        if (documentRequest.getName() == null || documentRequest.getName().isEmpty()) {
            throw new IllegalArgumentException("DOCUMENT NAME CANNOT BE EMPTY");
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        AuthUser user = authRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("USER", "EMAIL", userEmail));

        Folder folder = folderRepository.findByName(documentRequest.getFolder()).orElseThrow(() -> new ResourceNotFoundException("FOLDER", "NAME", documentRequest.getFolder()));

        Document document = new Document();
        document.setName(documentRequest.getName());
        document.setUrl(documentRequest.getUrl());
        document.setDescription(documentRequest.getDescription());
        document.setFolder(folder);
        document.setTags(documentRequest.getTags());
        document.setUser(user);

        Document savedDocument = documentRepository.save(document);

        // Index document vào Elasticsearch
        DocumentES documentES = convertToDocumentES(savedDocument);
        documentESRepository.save(documentES);

        DocumentResponse documentResponse = new DocumentResponse();
        documentResponse.setId(savedDocument.getId());
        documentResponse.setName(savedDocument.getName());
        documentResponse.setUrl(savedDocument.getUrl());
        documentResponse.setTags(savedDocument.getTags());
        documentResponse.setDescription(savedDocument.getDescription());
        documentResponse.setFolder(savedDocument.getFolder().getName());
        documentResponse.setCreatedAt(savedDocument.getCreatedAt().toString());
        documentResponse.setCreatedBy(savedDocument.getCreatedBy());

        return documentResponse;
    }

    @Override
    public DocumentResponse markDocument(Long documentId) {

        Document document = documentRepository.findById(documentId).orElseThrow(() -> new ResourceNotFoundException("DOCUMENT", "ID", documentId.toString()));
        if(document.getIsMark() == null){
            document.setIsMark(true);
        }else{
            document.setIsMark(!document.getIsMark());
        }

        Document savedDocument = documentRepository.save(document);

        DocumentResponse documentResponse = new DocumentResponse();
        documentResponse.setId(savedDocument.getId());
        documentResponse.setName(savedDocument.getName());
        documentResponse.setUrl(savedDocument.getUrl());
        documentResponse.setTags(savedDocument.getTags());
        documentResponse.setIsMark(savedDocument.getIsMark());
        documentResponse.setDescription(savedDocument.getDescription());
        documentResponse.setFolder(savedDocument.getFolder().getName());

        return documentResponse;
    }

    @Override
    public List<DocumentResponse> getDocuments(String folderName) {
        AuthUser user = getCurrentUser();
        Folder folder = folderRepository.findByUserAndName(user, folderName).orElseThrow(() -> new ResourceNotFoundException("FOLDER", "NAME", folderName));


        return folder.getDocuments().stream()
                .map(document -> new DocumentResponse(
                        document.getId(),
                        document.getName(),
                        document.getUrl(),
                        document.getTags(),
                        document.getIsMark(),
                        document.getFolder().getName(),
                        document.getDescription(),
                        document.getCreatedAt().toString(),
                        document.getCreatedBy()
                        ))
                .collect(Collectors.toList());
    }

    @Override
    public List<DocumentResponse> getDocumentsByUser() {

        AuthUser user = getCurrentUser();
        List<Document> documents = user.getDocuments();

        return documents.stream()
                .map(document -> new DocumentResponse(
                        document.getId(),
                        document.getName(),
                        document.getUrl(),
                        document.getTags(),
                        document.getIsMark(),
                        document.getFolder().getName(),
                        document.getDescription(),
                        document.getCreatedAt().toString(),
                        document.getCreatedBy())

                       )
                .collect(Collectors.toList());
    }

    private AuthUser getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        return authRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("USER", "EMAIL", userEmail));
    }

    @Override
    public List<DocumentResponse> getBookmarks() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        AuthUser user = authRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("USER", "EMAIL", userEmail));


        List<Document> documents = documentRepository.findAllByUserAndIsMark(user, true);
        return documents.stream()
                .map(document -> new DocumentResponse(
                        document.getId(),
                        document.getName(),
                        document.getUrl(),
                        document.getTags(),
                        document.getIsMark(),
                        document.getFolder().getName(),
                        document.getDescription(),
                        document.getCreatedAt().toString(),
                        document.getCreatedBy())
                )
                .collect(Collectors.toList());
    }

    @Override
    public DocumentResponse getDocumentById(Long documentId) {
        Document document = documentRepository.findById(documentId).orElseThrow(() -> new ResourceNotFoundException("DOCUMENT", "ID", documentId.toString()));

        return new DocumentResponse(
                document.getId(),
                document.getName(),
                document.getUrl(),
                document.getTags(),
                document.getIsMark(),
                document.getFolder().getName(),
                document.getDescription(),
                document.getCreatedAt().toString(),
                document.getCreatedBy()
        );
    }

    @Override
    public CommentResponse addComment(String folderName, Long documentId, CommentRequest commentRequest) {

        AuthUser currentUser = getCurrentUser();
        Folder folder = folderRepository.findByUserAndName(currentUser, folderName).orElseThrow(() -> new ResourceNotFoundException("FOLDER", "NAME", folderName));

        Document document = documentRepository.findByIdAndFolder(documentId, folder).orElseThrow(() -> new ResourceNotFoundException("DOCUMENT", "ID", documentId.toString()));


        Comment newComment = new Comment();
        newComment.setDocument(document);
        newComment.setUser(currentUser);
        newComment.setMessage(commentRequest.getMessage());

        commentRepository.save(newComment);
        CommentResponse commentResponse = new CommentResponse();
        commentResponse.setId(newComment.getCommentID());
        commentResponse.setMessage(newComment.getMessage());
        commentResponse.setUser(newComment.getUser().getEmail());
        commentResponse.setCreatedAt(newComment.getCreatedAt().toString());

        return commentResponse;
    }

    @Override
    public List<CommentResponse> getComments(String folderName, Long documentId) {
        AuthUser user = getCurrentUser();
        Folder folder = folderRepository.findByUserAndName(user, folderName).orElseThrow(() -> new ResourceNotFoundException("FOLDER", "NAME", folderName));
        Document document = documentRepository.findByIdAndFolder(documentId, folder).orElseThrow(() -> new ResourceNotFoundException("DOCUMENT", "ID", documentId.toString()));
        List<Comment> comments = commentRepository.findByDocumentOrderByCreatedAtDesc(document);

        return comments.stream()
                .map(comment -> new CommentResponse(
                        comment.getCommentID(),
                        comment.getMessage(),
                        comment.getUser().getEmail(),
                        comment.getCreatedAt().toString()
                ))
                .collect(Collectors.toList());
    }
    @Override
    public List<DocumentResponse> searchDocumentsByTag(String tag) {
        // Phân tách các tag từ chuỗi tìm kiếm
        String[] searchTags = tag.split("\\s+");

        // Tạo danh sách để lưu trữ kết quả tìm kiếm
        List<DocumentES> matchingDocuments = null;

        // Tìm kiếm với từng tag và cộng dồn kết quả
        for (String searchTag : searchTags) {
            // Loại bỏ ký tự '#' nếu có
            String cleanTag = searchTag.startsWith("#") ? searchTag.substring(1) : searchTag;

            // Tìm kiếm với tag đã được làm sạch
            List<DocumentES> documentsForTag = documentESRepository.findByTagsUsingCustomQuery(cleanTag, PageRequest.of(0, 10));

            // Cộng dồn kết quả
            if (matchingDocuments == null) {
                matchingDocuments = documentsForTag;
            } else {
                matchingDocuments.addAll(documentsForTag);
            }
        }

        // Đếm số lần xuất hiện của mỗi document
        final var documentCounts = new java.util.HashMap<String, Integer>();
        assert matchingDocuments != null;
        for (DocumentES doc : matchingDocuments) {
            documentCounts.put(doc.getId(), documentCounts.getOrDefault(doc.getId(), 0) + 1);
        }

        // Sắp xếp documents dựa trên số lần xuất hiện (nhiều tag trùng khớp hơn sẽ ở trên)
        matchingDocuments.sort((doc1, doc2) -> documentCounts.get(doc2.getId()).compareTo(documentCounts.get(doc1.getId())));

        // Loại bỏ các document trùng lặp
        matchingDocuments = matchingDocuments.stream()
                .filter(doc -> {
                    boolean isDuplicate = documentCounts.containsKey(doc.getId()) && documentCounts.get(doc.getId()) == 0;
                    documentCounts.put(doc.getId(), 0); // Đánh dấu là đã xử lý
                    return !isDuplicate;
                })
                .collect(Collectors.toList());

        // Chuyển đổi và trả về kết quả
        return matchingDocuments.stream()
                .map(this::convertToDocumentResponse)
                .collect(Collectors.toList());
    }


    private DocumentES convertToDocumentES(Document document) {
        DocumentES documentES = new DocumentES();
        documentES.setId(document.getId().toString());
        documentES.setName(document.getName());
        documentES.setUrl(document.getUrl());
        documentES.setIsMark(document.getIsMark());
        documentES.setDescription(document.getDescription());
        documentES.setFolder(document.getFolder().getName());
        documentES.setTags(document.getTags());
        return documentES;
    }

    private DocumentResponse convertToDocumentResponse(DocumentES documentES) {
        DocumentResponse documentResponse = new DocumentResponse();
        documentResponse.setId(Long.valueOf(documentES.getId()));
        documentResponse.setName(documentES.getName());
        documentResponse.setUrl(documentES.getUrl());
        documentResponse.setIsMark(documentES.getIsMark());
        documentResponse.setDescription(documentES.getDescription());
        documentResponse.setTags(documentES.getTags());
        documentResponse.setFolder(documentES.getFolder());
        return documentResponse;
    }

}

