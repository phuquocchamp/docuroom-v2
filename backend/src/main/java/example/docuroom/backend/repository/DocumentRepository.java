package example.docuroom.backend.repository;

import example.docuroom.backend.entity.AuthUser;
import example.docuroom.backend.entity.Document;
import example.docuroom.backend.entity.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    Optional<Document> findByIdAndFolder(Long id, Folder folder);
    List<Document> findAllByUserAndIsMark(AuthUser user, boolean isMark);
    List<Document> findByTagsContaining(String tag);
}
