package example.docuroom.backend.mapper;

import example.docuroom.backend.dto.request.RegisterRequest;
import example.docuroom.backend.dto.response.RegisterResponse;
import example.docuroom.backend.entity.AuthUser;

import java.time.LocalDateTime;

public class AuthMapper {
    public static AuthUser mapToAuthUser(RegisterRequest registerRequest){
        AuthUser authUser = new AuthUser();
        authUser.setEmail(registerRequest.getEmail());
        authUser.setFullName(registerRequest.getFullName());
        authUser.setPassword(registerRequest.getPassword());
        authUser.setSchool(registerRequest.getSchool());

        return authUser;
    }

    public static RegisterResponse mapToRegisterResponseDto(AuthUser authUser){
        RegisterResponse response = new RegisterResponse();
        response.setEmail(authUser.getEmail());
        response.setFullName(authUser.getFullName());
        response.setSchool(authUser.getSchool());
        response.setCreatedAt(LocalDateTime.now());
        return response;
    }
}
