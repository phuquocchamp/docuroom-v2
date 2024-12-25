package example.docuroom.backend.config;

import example.docuroom.backend.filter.CsrfCookieFilter;
import example.docuroom.backend.filter.JWTTokenGeneratorFilter;
import example.docuroom.backend.filter.JWTTokenValidationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class CustomSecurityConfig {

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        CsrfTokenRequestAttributeHandler csrfTokenRequestAttributeHandler = new CsrfTokenRequestAttributeHandler();

        http.sessionManagement(ssmc -> ssmc.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.requiresChannel(rcc -> rcc.anyRequest().requiresInsecure()); // Accept HTTP Request
        http.cors(scc -> scc.configurationSource(corsConfigurationSource()));
        http.csrf(csrfConfig -> csrfConfig.csrfTokenRequestHandler(csrfTokenRequestAttributeHandler)
                .ignoringRequestMatchers("/v1/api/auth/register")
                .ignoringRequestMatchers("/v1/api/auth/login")
                .ignoringRequestMatchers("/v1/api/tag/**")
                .ignoringRequestMatchers("/v1/api/file/**")
                .ignoringRequestMatchers("/v1/api/document/**")
                .ignoringRequestMatchers("/v1/api/folder/**")
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
        );
        http.addFilterAfter(new CsrfCookieFilter(), BasicAuthenticationFilter.class);
        http.addFilterAfter(new JWTTokenGeneratorFilter(), BasicAuthenticationFilter.class);
        http.addFilterBefore(new JWTTokenValidationFilter(), BasicAuthenticationFilter.class);


        http.authorizeHttpRequests((requests) -> requests
                .requestMatchers("/v1/api/auth/register").permitAll()
                .requestMatchers("/v1/api/auth/login").permitAll()

                .requestMatchers("/v1/api/tag/**").hasAnyRole("USER", "ADMIN")
                .requestMatchers("/v1/api/document/**").hasAnyRole("USER", "ADMIN")
                .requestMatchers("/v1/api/file/", "/v1/api/file/**").hasAnyRole("USER", "ADMIN")
                .anyRequest().authenticated()
        );
        http.formLogin(withDefaults());
        http.httpBasic(withDefaults());
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
        config.setAllowedMethods(Collections.singletonList("*"));
        config.setAllowCredentials(true);
        config.setAllowedHeaders(Collections.singletonList("*"));
        config.setExposedHeaders(Arrays.asList("Authorization"));
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder){
        CustomUsernamePasswordAuthenticationProvider authenticationProvider = new CustomUsernamePasswordAuthenticationProvider(userDetailsService, passwordEncoder);
        ProviderManager providerManager = new ProviderManager(authenticationProvider);
        providerManager.setEraseCredentialsAfterAuthentication(false);
        return providerManager;
    }

}
