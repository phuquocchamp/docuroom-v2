package example.docuroom.backend.repository;

import example.docuroom.backend.entity.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {

}
