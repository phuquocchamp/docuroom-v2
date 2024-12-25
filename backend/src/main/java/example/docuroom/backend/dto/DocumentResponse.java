package example.docuroom.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class DocumentResponse {
    private Long id;
    private String name;
    private String url;
    private String folder;
    private String description;
}
