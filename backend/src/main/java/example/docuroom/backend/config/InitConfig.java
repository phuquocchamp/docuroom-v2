package example.docuroom.backend.config;


import example.docuroom.backend.constant.AuthorityConstant;
import example.docuroom.backend.constant.RoleConstant;
import example.docuroom.backend.entity.AuthUser;
import example.docuroom.backend.entity.Authority;
import example.docuroom.backend.entity.Role;
import example.docuroom.backend.repository.AuthRepository;
import example.docuroom.backend.repository.AuthorityRepository;
import example.docuroom.backend.repository.RoleRepository;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@Configuration
@Slf4j
public class InitConfig {

    private final PasswordEncoder passwordEncoder;
    private final AuthRepository authRepository;
    private final RoleRepository roleRepository;
    private final AuthorityRepository authorityRepository;

    public InitConfig(
            PasswordEncoder passwordEncoder,
            AuthRepository authRepository,
            RoleRepository roleRepository,
            AuthorityRepository authorityRepository
    ) {
        this.passwordEncoder = passwordEncoder;
        this.authRepository = authRepository;
        this.roleRepository = roleRepository;
        this.authorityRepository = authorityRepository;
    }

    @NonFinal
    static final String ADMIN_USER_NAME = "admin@gmail.com";

    @NonFinal
    static final String ADMIN_PASSWORD = "adminuser@12345";

    @Bean
    ApplicationRunner applicationRunner() {
        log.info("Initializing application.....");
        return args -> {
            // Define Admin User & Default Authority, Role
            if (authRepository.findByEmail(ADMIN_USER_NAME).isEmpty()) {
                Authority readAuthority = Authority.builder()
                        .name(AuthorityConstant.READ_AUTHORITY)
                        .description("READ AUTHORITY")
                        .build();

                Authority writeAuthority = Authority.builder()
                        .name(AuthorityConstant.WRITE_AUTHORITY)
                        .description("WRITE AUTHORITY")
                        .build();

                // Persist Authority objects first
                readAuthority = authorityRepository.save(readAuthority);
                writeAuthority = authorityRepository.save(writeAuthority);

                Set<Authority> adminAuthority = new HashSet<>();
                adminAuthority.add(writeAuthority);
                adminAuthority.add(readAuthority);

                Set<Authority> userAuthority = new HashSet<>();
                userAuthority.add(readAuthority);

                roleRepository.save(Role.builder()
                        .name(RoleConstant.USER_ROLE)
                        .description("USER ROLE")
                        .authorities(userAuthority)
                        .build());

                Role adminRole = roleRepository.save(Role.builder()
                        .name(RoleConstant.ADMIN_ROLE)
                        .description("ADMIN ROLE")
                        .authorities(adminAuthority)
                        .build());

                Set<Role> roles = new HashSet<>();
                roles.add(adminRole);

                AuthUser user = AuthUser.builder()
                        .email(ADMIN_USER_NAME)
                        .password(passwordEncoder.encode(ADMIN_PASSWORD))
                        .roles(roles)
                        .build();

                authRepository.save(user);
                log.warn("admin user has been created with default password: admin, please change it");
            }
            log.info("Application initialization completed .....");
        };
    }
}
