package example.docuroom.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    @NotEmpty(message = "FULL NAME MUST NOT BE NULL OR EMPTY")
    private String fullName;

    @NotEmpty(message = "EMAIL MUST NOT BE NULL OR EMPTY")
    @Email(message = "EMAIL MUST BE VALID")
    private String email;

    @NotEmpty(message = "PASSWORD MUST NOT BE NULL OR EMPTY")
    private String password;

    @NotEmpty(message= "SCHOOL MUST NOT BE NULL OR EMPTY")
    private String school;
}
