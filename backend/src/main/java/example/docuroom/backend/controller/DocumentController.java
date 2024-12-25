package example.docuroom.backend.controller;

import example.docuroom.backend.dto.DocumentResponse;
import example.docuroom.backend.dto.request.DocumentRequest;
import example.docuroom.backend.dto.response.ApiResponse;
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
    public ResponseEntity<ApiResponse<DocumentResponse>> createDocument(@RequestBody DocumentRequest documentRequest){
        ApiResponse<DocumentResponse> response = new ApiResponse<>();

        response.setStatus(HttpStatus.CREATED.value());
        response.setMessage("DOCUMENT CREATED SUCCESSFULLY");
        response.setData(documentService.createDocument(documentRequest));

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{folder}")
    public ResponseEntity<ApiResponse<List<DocumentResponse>>> fetchDocuments(@PathVariable("folder") String folder){
        ApiResponse<List<DocumentResponse>> response = new ApiResponse<>();
        response.setStatus(HttpStatus.OK.value());
        response.setMessage("DOCUMENTS FETCHED SUCCESSFULLY");
        response.setData(documentService.getDocuments(folder));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
