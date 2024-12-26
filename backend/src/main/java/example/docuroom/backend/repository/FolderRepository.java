package example.docuroom.backend.repository;

import example.docuroom.backend.entity.AuthUser;
import example.docuroom.backend.entity.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FolderRepository extends JpaRepository<Folder, Long> {
    boolean existsByName(String name);
    Optional<Folder> findByName(String name);
    List<Folder> findAllByUser(AuthUser user);
    Optional<Folder> findByUserAndName(AuthUser user, String folderName);
}
