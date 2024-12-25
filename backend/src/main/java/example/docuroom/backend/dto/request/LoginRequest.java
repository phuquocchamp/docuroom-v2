package example.docuroom.backend.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter
@AllArgsConstructor
public class LoginRequest {

    @NotEmpty(message = "EMAIL MUST NOT BE NULL OR EMPTY")
    private String email;

    @NotEmpty(message = "PASSWORD MUST NOT BE NULL OR EMPTY")
    private String password;
}
