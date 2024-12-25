package example.docuroom.backend.service.impl;

import example.docuroom.backend.constant.RoleConstant;
import example.docuroom.backend.dto.request.RegisterRequest;
import example.docuroom.backend.dto.response.RegisterResponse;
import example.docuroom.backend.dto.response.UserResponse;
import example.docuroom.backend.entity.AuthUser;
import example.docuroom.backend.entity.Authority;
import example.docuroom.backend.entity.Role;
import example.docuroom.backend.exception.EmailAlreadyExitsException;
import example.docuroom.backend.mapper.AuthMapper;
import example.docuroom.backend.repository.AuthRepository;
import example.docuroom.backend.repository.AuthorityRepository;
import example.docuroom.backend.repository.RoleRepository;
import example.docuroom.backend.service.IAuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements IAuthService {
    private final AuthRepository authRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public AuthServiceImpl(AuthRepository authRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.authRepository = authRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    @Override
    public RegisterResponse registerUser(RegisterRequest registerRequestDto) {
        String email = registerRequestDto.getEmail();
        if(authRepository.existsByEmail(email)){
            throw new EmailAlreadyExitsException("EMAIL ALREADY EXITS");
        }
        AuthUser authUser = AuthMapper.mapToAuthUser(registerRequestDto);
        authUser.setPassword(passwordEncoder.encode(authUser.getPassword()));
        Set<Role> roles = new HashSet<>();
        roleRepository.findByName(RoleConstant.USER_ROLE).ifPresent(roles::add);
        authUser.setRoles(roles);

        AuthUser savedUser = authRepository.save(authUser);
        return AuthMapper.mapToRegisterResponseDto(savedUser);
    }

    @Override
    public List<UserResponse> fetchAllUsers() {
        List<AuthUser> users = authRepository.findAll();

        if(users != null && !users.isEmpty()){
            List<UserResponse> userResponses = new ArrayList<>();

            for(AuthUser user : users){
                Set<String> authorities = new HashSet<>();

                for(Role role : user.getRoles()){
                    Set<Authority> authoritySet = role.getAuthorities();
                    for(Authority authority : authoritySet){
                        authorities.add(authority.getName());
                    }
                }

                UserResponse userResponse = new UserResponse(
                        user.getId(),
                        user.getEmail(),
                        user.getFullName(),
                        user.getSchool(),
                        user.getRoles().stream().map(Role::getName).collect(Collectors.toSet()),
                        authorities
                );
                userResponses.add(userResponse);
            }
            return userResponses;
        }
        return Collections.emptyList();
    }

    @Override
    public AuthUser findByEmail(String email) {
        return authRepository.findByEmail(email).orElse(null);
    }
}
