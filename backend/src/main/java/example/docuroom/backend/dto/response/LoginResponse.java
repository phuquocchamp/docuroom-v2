package example.docuroom.backend.dto.response;

import example.docuroom.backend.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
  private String token;
}
