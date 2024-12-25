package example.docuroom.backend.repository;

import example.docuroom.backend.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {

}
