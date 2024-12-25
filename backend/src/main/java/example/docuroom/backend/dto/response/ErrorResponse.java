package example.docuroom.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {
    private String apiPath;
    private HttpStatus errorCode;
    private String errorMessage;
    private LocalDateTime errorTime;
}
