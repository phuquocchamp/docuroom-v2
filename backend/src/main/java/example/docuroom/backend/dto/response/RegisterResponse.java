package example.docuroom.backend.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterResponse {
    private String fullName;
    private String email;
    private String school;
    private LocalDateTime createdAt;
}
