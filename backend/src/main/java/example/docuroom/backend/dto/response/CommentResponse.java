package example.docuroom.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponse {
    private long id;
    private String message;
    private String user;
    private String createdAt;
}
