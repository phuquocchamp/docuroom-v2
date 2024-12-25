package example.docuroom.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class ResourceExitsException extends RuntimeException{
    public ResourceExitsException(String message){
        super(message);
    }
}
