package example.docuroom.backend.repository;

import example.docuroom.backend.entity.AuthUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AuthRepository extends JpaRepository<AuthUser, Long> {
    boolean existsByEmail(String email);

    Optional<AuthUser> findByEmail(String email);

    List<AuthUser> findAll();
}
