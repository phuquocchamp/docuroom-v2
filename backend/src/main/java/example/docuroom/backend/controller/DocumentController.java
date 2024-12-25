package example.docuroom.backend.controller;

import example.docuroom.backend.dto.DocumentResponse;
import example.docuroom.backend.dto.request.DocumentRequest;
import example.docuroom.backend.service.IDocumentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("v1/api/document")
public class DocumentController {
    private final IDocumentService documentService;

    public DocumentController(IDocumentService documentService){
        this.documentService = documentService;
    }


    @GetMapping()
    public String welcome(){
        return "Welcome to Document API";
    }

    @PostMapping()
    public ResponseEntity<DocumentResponse> createDocument(@RequestBody DocumentRequest documentRequest){

        return new ResponseEntity<>(documentService.createDocument(documentRequest), HttpStatus.CREATED);
    }

    @GetMapping("/fetchDocuments")
    public ResponseEntity<List<DocumentResponse>> fetchDocuments(){
        return new ResponseEntity<>(documentService.fetchDocuments(), HttpStatus.OK);
    }

}
