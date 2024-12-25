package example.docuroom.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "bookmark")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Bookmark extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookmark_id")
    private Long bookmarkID;

    private boolean isMark;

    @OneToMany(
            mappedBy = "bookmark",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Document> document;
}
