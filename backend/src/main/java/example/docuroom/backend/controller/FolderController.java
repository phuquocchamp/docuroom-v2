package example.docuroom.backend.controller;

import example.docuroom.backend.dto.request.FolderRequest;
import example.docuroom.backend.dto.response.ApiResponse;
import example.docuroom.backend.dto.response.FolderResponse;
import example.docuroom.backend.entity.Folder;
import example.docuroom.backend.service.IFolderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/v1/api/folder")
public class FolderController {

    private final IFolderService folderService;

    public FolderController(IFolderService folderService) {
        this.folderService = folderService;
    }

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome to Folder API";
    }

    @PostMapping()
    public ResponseEntity<ApiResponse<FolderResponse>> createFolder(@RequestBody FolderRequest folderRequest) {

        ApiResponse<FolderResponse> response = new ApiResponse<>();
        response.setStatus(HttpStatus.CREATED.value());
        response.setMessage("FOLDER CREATED SUCCESSFULLY");
        response.setData(folderService.createFolder(folderRequest));
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<List<FolderResponse>>> fetchFolders() {
        ApiResponse<List<FolderResponse>> response = new ApiResponse<>();
        response.setStatus(HttpStatus.OK.value());
        response.setMessage("FOLDERS FETCHED SUCCESSFULLY");
        response.setData(folderService.getAllFolders());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{folderID}")
    public ResponseEntity<ApiResponse<String>> fetchFolder(@PathVariable("folderID") Long folderID) {
        ApiResponse<String> response = new ApiResponse<>();
        response.setStatus(HttpStatus.OK.value());
        response.setMessage("FOLDER FETCHED SUCCESSFULLY");
        response.setData(folderService.getFolderById(folderID).getName());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/{folderID}")
    public ResponseEntity<ApiResponse<FolderResponse>> updateFolder(@PathVariable("folderID") Long folderID, @RequestBody FolderRequest folderRequest) {
        ApiResponse<FolderResponse> response = new ApiResponse<>();
        response.setStatus(HttpStatus.OK.value());
        response.setMessage("FOLDER UPDATED SUCCESSFULLY");
        response.setData(folderService.updateFolder(folderID, folderRequest.getName()));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
