package example.docuroom.backend.filter;

import example.docuroom.backend.constant.EnvConstant;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class JWTTokenValidationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = request.getHeader(EnvConstant.JWT_HEADER);
        if(jwt != null && jwt.startsWith("Bearer ")){
            jwt = jwt.substring(7);
            try{
                Environment environment = getEnvironment();

                String secret = environment.getProperty(EnvConstant.JWT_SECRET_KEY, EnvConstant.JWT_SECRET_DEFAULT_VALUE);
                SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

                Claims claims = Jwts.parser()
                        .verifyWith(secretKey)
                        .build()
                        .parseSignedClaims(jwt)
                        .getPayload();

                String username = String.valueOf(claims.get("username"));
                String roles = String.valueOf(claims.get("roles"));
                String authorities = String.valueOf(claims.get("authorities"));
                List<GrantedAuthority> grantedAuthorities = AuthorityUtils.commaSeparatedStringToAuthorityList(roles + "," + authorities);

                Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, grantedAuthorities );
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (ExpiredJwtException ex) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Token Expired");
                return;
            } catch (MalformedJwtException | SignatureException ex) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid Token");
                return;
            } catch (Exception exception) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Authentication Failed");
                return;
            }
        }


        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return request.getServletPath().equals("/login"); // Ví dụ: bỏ qua filter cho request đến /login
    }
}
