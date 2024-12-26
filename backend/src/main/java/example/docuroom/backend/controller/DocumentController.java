package example.docuroom.backend.controller;

import example.docuroom.backend.dto.response.DocumentResponse;
import example.docuroom.backend.dto.request.CommentRequest;
import example.docuroom.backend.dto.request.DocumentRequest;
import example.docuroom.backend.dto.response.ApiResponse;
import example.docuroom.backend.dto.response.CommentResponse;
import example.docuroom.backend.service.IDocumentService;
import jakarta.validation.Valid;
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


    @GetMapping("/welcome")
    public String welcome(){
        return "Welcome to Document API";
    }

    @PostMapping()
    public ResponseEntity<ApiResponse<DocumentResponse>> createDocument(@Valid @RequestBody DocumentRequest documentRequest){
        ApiResponse<DocumentResponse> response = new ApiResponse<>();

        response.setStatus(HttpStatus.CREATED.value());
        response.setMessage("DOCUMENT CREATED SUCCESSFULLY");
        response.setData(documentService.createDocument(documentRequest));

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/mark/{document_id}")
    public ResponseEntity<ApiResponse<DocumentResponse>> markDocument(@PathVariable("document_id") Long document_id){
        ApiResponse<DocumentResponse> response = new ApiResponse<>();

        response.setStatus(HttpStatus.CREATED.value());
        response.setMessage("DOCUMENT MARKED SUCCESSFULLY");
        response.setData(documentService.markDocument(document_id));

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/bookmarks")
    public ResponseEntity<ApiResponse<List<DocumentResponse>>> fetchBookmarkDocuments(){
        ApiResponse<List<DocumentResponse>> response = new ApiResponse<>();

        response.setStatus(HttpStatus.CREATED.value());
        response.setMessage("DOCUMENT MARKED SUCCESSFULLY");
        response.setData(documentService.getBookmarks());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{folder}")
    public ResponseEntity<ApiResponse<List<DocumentResponse>>> fetchDocuments(@PathVariable("folder") String folder){
        ApiResponse<List<DocumentResponse>> response = new ApiResponse<>();
        response.setStatus(HttpStatus.OK.value());
        response.setMessage("DOCUMENTS FETCHED SUCCESSFULLY");
        response.setData(documentService.getDocuments(folder));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    // /v1/api/document/{folder}/{document_id}/comments
    @PostMapping("/{folder}/{document_id}/comments")
    public ResponseEntity<ApiResponse<List<CommentResponse>>> addComment(
            @PathVariable("folder") String folder,
            @PathVariable("document_id") Long document_id,
            @RequestBody CommentRequest commentRequest
    ){
        ApiResponse<List<CommentResponse>> response = new ApiResponse<>();

        response.setStatus(HttpStatus.CREATED.value());
        response.setMessage("COMMENT ADDED SUCCESSFULLY");
        response.setData(documentService.addComment(folder, document_id, commentRequest));

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    @GetMapping("/{folder}/{document_id}/comments")
    public ResponseEntity<ApiResponse<List<CommentResponse>>> fetchComments(
            @PathVariable("folder") String folder,
            @PathVariable("document_id") Long document_id
    ){
        ApiResponse<List<CommentResponse>> response = new ApiResponse<>();

        response.setStatus(HttpStatus.CREATED.value());
        response.setMessage("COMMENT ADDED SUCCESSFULLY");
        response.setData(documentService.getComments(folder, document_id));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<DocumentResponse>>> searchDocumentsByTag(@RequestParam("tags") String tags) {
        List<DocumentResponse> documents = documentService.searchDocumentsByTag(tags);
        ApiResponse<List<DocumentResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setStatus(HttpStatus.OK.value());
        apiResponse.setMessage("Documents searched successfully");
        apiResponse.setData(documents);

        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }


}
