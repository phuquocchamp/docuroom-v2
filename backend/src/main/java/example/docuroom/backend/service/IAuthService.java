package example.docuroom.backend.service;

import example.docuroom.backend.dto.request.RegisterRequest;
import example.docuroom.backend.dto.response.RegisterResponse;
import example.docuroom.backend.dto.response.UserResponse;
import example.docuroom.backend.entity.AuthUser;

import java.util.List;

public interface IAuthService {
    RegisterResponse registerUser(RegisterRequest registerRequest);

    List<UserResponse> fetchAllUsers();

    AuthUser findByEmail(String email);
}
