package example.docuroom.backend.dto.response;

import jakarta.annotation.Nonnull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponse {
    private long id;
    private String documentId;
    private String message;
    private String author;
    private String timeCreated;
}
