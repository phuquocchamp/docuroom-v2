package example.docuroom.backend.config;

import example.docuroom.backend.entity.AuthUser;
import example.docuroom.backend.exception.ResourceNotFoundException;
import example.docuroom.backend.repository.AuthRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final AuthRepository authRepository;

    public CustomUserDetailsService(AuthRepository authRepository) {
        this.authRepository = authRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AuthUser authUser = authRepository.findByEmail(username).orElseThrow(
                () -> new ResourceNotFoundException("USER", "EMAIL", username)
        );

        return new User(authUser.getEmail(), authUser.getPassword(), getGrantedAuthorities(authUser));
    }

    private Collection<? extends GrantedAuthority> getGrantedAuthorities(AuthUser authUser) {
        // Lấy danh sách authorities từ các role
        Collection<? extends GrantedAuthority> authorities = authUser.getRoles()
                .stream()
                .flatMap(role -> role.getAuthorities().stream())
                .map(authority -> new SimpleGrantedAuthority(authority.getName()))
                .toList();

        // Lấy danh sách roles
        Collection<? extends GrantedAuthority> roles = authUser.getRoles()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .toList();

        // Nối 2 danh sách roles và authorities
        return Stream.concat(roles.stream(), authorities.stream())
                .collect(Collectors.toList());
    }
}
