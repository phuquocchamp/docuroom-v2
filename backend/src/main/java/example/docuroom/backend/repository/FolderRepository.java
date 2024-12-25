package example.docuroom.backend.repository;

import example.docuroom.backend.entity.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FolderRepository extends JpaRepository<Folder, Long> {
    boolean existsByName(String name);
}
