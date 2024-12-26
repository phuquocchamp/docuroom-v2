package example.docuroom.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class DocumentRequest {
    private String name;
    private String url;
    private String folder;
    private String tags;
    private String description;
}
