package example.docuroom.backend.service;

import example.docuroom.backend.dto.DocumentResponse;
import example.docuroom.backend.dto.request.DocumentRequest;

import java.util.List;

public interface IDocumentService {
    DocumentResponse createDocument(DocumentRequest documentRequest);
    List<DocumentResponse> getDocuments(String folder);
}
