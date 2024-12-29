package example.docuroom.backend.service;

import example.docuroom.backend.dto.response.DocumentResponse;
import example.docuroom.backend.dto.request.CommentRequest;
import example.docuroom.backend.dto.request.DocumentRequest;
import example.docuroom.backend.dto.response.CommentResponse;

import java.util.List;

public interface IDocumentService {
    DocumentResponse createDocument(DocumentRequest documentRequest);
    DocumentResponse markDocument(Long documentId);

    List<DocumentResponse> getDocuments(String folder);
    List<DocumentResponse> getDocumentsByUser();
    List<DocumentResponse> getBookmarks();
    DocumentResponse getDocumentById(Long documentId);

    CommentResponse addComment(String folderName, Long documentId, CommentRequest commentRequest);
    List<CommentResponse> getComments(String folderName, Long documentId);

    List<DocumentResponse> searchDocumentsByTag(String tag);
}
