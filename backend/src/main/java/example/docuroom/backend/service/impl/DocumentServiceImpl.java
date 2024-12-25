package example.docuroom.backend.service.impl;

import example.docuroom.backend.dto.DocumentResponse;
import example.docuroom.backend.dto.request.DocumentRequest;
import example.docuroom.backend.entity.Document;
import example.docuroom.backend.entity.Folder;
import example.docuroom.backend.repository.DocumentRepository;
import example.docuroom.backend.service.IDocumentService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentServiceImpl implements IDocumentService {
    private final DocumentRepository documentRepository;
    private final ModelMapper modelMapper;

    public DocumentServiceImpl(DocumentRepository documentRepository, ModelMapper modelMapper) {
        this.documentRepository = documentRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public DocumentResponse createDocument(DocumentRequest documentRequest) {
//        if(documentRequest.getName() == null || documentRequest.getName().isEmpty()) {
//            throw new IllegalArgumentException("Document name cannot be empty");
//        }
//
//        Folder folder = new Folder();
//
//
//        Document document = new Document();
//        document.setName(documentRequest.getName());
//
//        DocumentResponse documentResponse = new DocumentResponse();
//

        return modelMapper.map(documentRepository.save(modelMapper.map(documentRequest, Document.class)), DocumentResponse.class);
    }

    @Override
    public List<DocumentResponse> fetchDocuments() {
        return List.of();
    }
}
