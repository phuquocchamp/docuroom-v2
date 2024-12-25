package example.docuroom.backend.controller;

import example.docuroom.backend.dto.response.ApiResponse;
import example.docuroom.backend.service.ICategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/api/category")
public class CategoryController {
    private final ICategoryService iCategoryService;

    public CategoryController(ICategoryService iCategoryService){
        this.iCategoryService = iCategoryService;
    }



}
