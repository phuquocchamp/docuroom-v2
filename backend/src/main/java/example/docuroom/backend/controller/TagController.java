package example.docuroom.backend.controller;

import example.docuroom.backend.dto.DocumentResponse;
import example.docuroom.backend.dto.TagDTO;
import example.docuroom.backend.dto.response.ApiResponse;
import example.docuroom.backend.service.impl.TagServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/api/tag")
public class TagController {

    private final TagServiceImpl tagService;

    public TagController(TagServiceImpl tagService) {
        this.tagService = tagService;
    }


    @GetMapping
    public String welcome(){
        return "Welcome To Tag API";
    }

    @PostMapping
    public ResponseEntity<ApiResponse<String>> createTag(TagDTO tagDTO){
        return null;
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<DocumentResponse>>> getDocumentsByTag(){

        return null;
    }
}
