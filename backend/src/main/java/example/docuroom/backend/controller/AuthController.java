package example.docuroom.backend.controller;

import example.docuroom.backend.constant.EnvConstant;
import example.docuroom.backend.dto.request.LoginRequest;
import example.docuroom.backend.dto.request.RegisterRequest;
import example.docuroom.backend.dto.response.ApiResponse;
import example.docuroom.backend.dto.response.LoginResponse;
import example.docuroom.backend.dto.response.RegisterResponse;
import example.docuroom.backend.dto.response.UserResponse;
import example.docuroom.backend.service.IAuthService;
import example.docuroom.backend.service.impl.AuthServiceImpl;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.validation.Valid;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/v1/api/auth")
public class AuthController {
    private final PasswordEncoder passwordEncoder;
    private final IAuthService authService;
    private final AuthenticationManager authenticationManager;
    private final Environment environment;

    public AuthController(PasswordEncoder passwordEncoder, IAuthService authService, AuthenticationManager authenticationManager, Environment environment) {
        this.passwordEncoder = passwordEncoder;
        this.authService = authService;
        this.authenticationManager = authenticationManager;
        this.environment = environment;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<RegisterResponse>> registerUser(@RequestBody @Valid RegisterRequest registerRequest){

        ApiResponse<RegisterResponse> response = new ApiResponse<>();
        response.setStatus(HttpStatus.CREATED.value());
        response.setMessage("USER REGISTERED SUCCESSFULLY");
        response.setData(authService.registerUser(registerRequest));

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> loginUser(@RequestBody @Valid LoginRequest loginRequest){
        String jwt = "";
        Authentication authentication = UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.getEmail(), loginRequest.getPassword());

        Authentication authenticationResponse = authenticationManager.authenticate(authentication);

        if(authenticationResponse != null && authenticationResponse.isAuthenticated()){

            String secret = environment.getProperty(EnvConstant.JWT_SECRET_KEY, EnvConstant.JWT_SECRET_DEFAULT_VALUE);
            SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

            jwt = Jwts.builder()
                .issuer("Docuroom").subject("JWT Token")
                .claim("username", authenticationResponse.getName())

                .claim("roles", authenticationResponse.getAuthorities().stream()
                        .filter(a -> a.getAuthority().startsWith("ROLE_"))
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.joining(",")))

                .claim("authorities", authenticationResponse.getAuthorities().stream()
                        .filter(a -> !a.getAuthority().startsWith("ROLE_"))
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.joining(",")))
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime() + 30000000))
                .signWith(secretKey).compact();
        }


        ApiResponse<LoginResponse> response = new ApiResponse<>();
        response.setStatus(HttpStatus.OK.value());
        response.setMessage("USER LOGGED IN SUCCESSFULLY");
        response.setData(new LoginResponse(jwt));

        return ResponseEntity
                .status(HttpStatus.OK.value())
                .header(EnvConstant.JWT_HEADER, jwt)
                .body(response);

    }

    @PreAuthorize("hasAuthority('WRITE')")
    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserResponse>>> fetchUsers(){

        ApiResponse<List<UserResponse>> response = new ApiResponse<>();
        response.setStatus(HttpStatus.OK.value());
        response.setMessage("USERS FETCHED SUCCESSFULLY");
        response.setData(authService.fetchAllUsers());

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

}
