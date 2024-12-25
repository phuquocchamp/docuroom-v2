package example.docuroom.backend.service.impl;

import example.docuroom.backend.dto.DocumentResponse;
import example.docuroom.backend.dto.request.DocumentRequest;
import example.docuroom.backend.entity.Document;
import example.docuroom.backend.entity.Folder;
import example.docuroom.backend.repository.DocumentRepository;
import example.docuroom.backend.repository.FolderRepository;
import example.docuroom.backend.service.IDocumentService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentServiceImpl implements IDocumentService {
    private final DocumentRepository documentRepository;
    private final FolderRepository folderRepository;
    private final ModelMapper modelMapper;

    public DocumentServiceImpl(DocumentRepository documentRepository, FolderRepository folderRepository, ModelMapper modelMapper) {
        this.documentRepository = documentRepository;
        this.folderRepository = folderRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public DocumentResponse createDocument(DocumentRequest documentRequest) {
        if (documentRequest.getName() == null || documentRequest.getName().isEmpty()) {
            throw new IllegalArgumentException("DOCUMENT NAME CANNOT BE EMPTY");
        }

        Folder folder = folderRepository.findByName(documentRequest.getFolder());
        if (folder == null) {
            throw new IllegalArgumentException("FOLDER MUST BE NOT EMPTY");
        }

        Document document = new Document();
        document.setName(documentRequest.getName());
        document.setUrl(documentRequest.getUrl());
        document.setDescription(documentRequest.getDescription());
        document.setFolder(folder);

        Document savedDocument = documentRepository.save(document);

        DocumentResponse documentResponse = new DocumentResponse();
        documentResponse.setId(savedDocument.getDocumentID());
        documentResponse.setName(savedDocument.getName());
        documentResponse.setUrl(savedDocument.getUrl());
        documentResponse.setDescription(savedDocument.getDescription());
        documentResponse.setFolder(savedDocument.getFolder().getName());


        return documentResponse;
    }

    @Override
    public List<DocumentResponse> getDocuments(String folderName) {

        Folder folder = folderRepository.findByName(folderName);
        if (folder == null) {
            return List.of(); // Hoặc throw exception nếu folder không tồn tại
        }

        return folder.getDocuments().stream()
                .map(document -> new DocumentResponse(
                        document.getDocumentID(),
                        document.getName(),
                        document.getUrl(),
                        document.getDescription(),
                        document.getFolder().getName()))
                .collect(Collectors.toList());

    }

}
