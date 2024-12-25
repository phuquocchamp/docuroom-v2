package example.docuroom.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ApiResponse<T> {
    private int status;
    private String message;
    private T data;
}
