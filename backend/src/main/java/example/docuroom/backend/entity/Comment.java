package example.docuroom.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "comment")
public class Comment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commentID;

    private String message;

}
