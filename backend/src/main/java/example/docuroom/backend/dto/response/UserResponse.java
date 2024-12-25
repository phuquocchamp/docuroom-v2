package example.docuroom.backend.dto.response;

import example.docuroom.backend.entity.Authority;
import example.docuroom.backend.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String email;
    private String fullName;
    private String school;
    private Set<String> roles;
    private Set<String> authorities;
}
