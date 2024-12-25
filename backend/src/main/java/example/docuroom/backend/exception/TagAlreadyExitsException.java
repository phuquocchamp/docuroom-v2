package example.docuroom.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class TagAlreadyExitsException extends RuntimeException{
    public TagAlreadyExitsException(String message){
        super(message);
    }
}
