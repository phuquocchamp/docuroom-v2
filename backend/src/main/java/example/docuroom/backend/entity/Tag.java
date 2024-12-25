package example.docuroom.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import javax.print.Doc;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tag")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tag extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private Long tagID;
    private String name;
    @ManyToMany(mappedBy = "tags")
    private List<Document> documents;
}
