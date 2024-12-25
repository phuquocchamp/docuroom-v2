package example.docuroom.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("v1/api/folder")
public class DemoController {

    @RequestMapping()
    public String welcome(){
        return "Welcome to Docuroom API";
    }
}
