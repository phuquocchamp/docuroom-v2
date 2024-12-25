package example.docuroom.backend.filter;

import example.docuroom.backend.constant.EnvConstant;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.env.Environment;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.stream.Collectors;

public class JWTTokenGeneratorFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            Environment environment = getEnvironment();

            String secret = environment.getProperty(EnvConstant.JWT_SECRET_KEY, EnvConstant.JWT_SECRET_DEFAULT_VALUE);
            SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

            String jwt = Jwts.builder()
                    .issuer("Docuroom").subject("JWT Token")
                    .claim("username", authentication.getName())

                    .claim("roles", authentication.getAuthorities().stream()
                            .filter(a -> a.getAuthority().startsWith("ROLE_"))
                            .map(GrantedAuthority::getAuthority)
                            .collect(Collectors.joining(",")))
                    .claim("authorities", authentication.getAuthorities().stream()
                            .filter(a -> !a.getAuthority().startsWith("ROLE_"))
                            .map(GrantedAuthority::getAuthority)
                            .collect(Collectors.joining(",")))

                    .issuedAt(new Date())
                    .expiration(new Date(new Date().getTime() + 30000000))
                    .signWith(secretKey).compact();

            response.setHeader(EnvConstant.JWT_HEADER, jwt);
        }

        filterChain.doFilter(request, response);
    }


}
