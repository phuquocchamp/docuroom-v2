package example.docuroom.backend.service.impl;

import example.docuroom.backend.service.ICategoryService;
import org.springframework.stereotype.Service;

@Service
public class CategoryService implements ICategoryService {

    @Override
    public boolean createCategory(String name) {
        return false;
    }
}
