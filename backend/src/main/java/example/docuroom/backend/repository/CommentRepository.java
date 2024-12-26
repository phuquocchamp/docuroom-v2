package example.docuroom.backend.repository;

import example.docuroom.backend.entity.Comment;
import example.docuroom.backend.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByDocumentOrderByTimeCreatedDesc(Document document);
}
