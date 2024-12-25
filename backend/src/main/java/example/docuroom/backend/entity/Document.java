package example.docuroom.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "document")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Document extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "document_id")
    private Long documentID;

    private String name;
    private String description;
    @Column(length = 2000)
    private String url;

    @OneToMany()
    @JoinTable(
            name = "has_comments",
            joinColumns = @JoinColumn(name = "document_id", referencedColumnName = "document_id"),
            inverseJoinColumns = @JoinColumn(name = "comment_id", referencedColumnName = "comment_id")
    )
    private List<Comment> comments = new ArrayList<>();

    @OneToMany
    @JoinTable(
            name = "has_ratings",
            joinColumns = @JoinColumn(name = "document_id", referencedColumnName = "document_id"),
            inverseJoinColumns = @JoinColumn(name = "rating_id", referencedColumnName = "rating_id")
    )
    private List<Rating> ratings = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "document_tags",
            joinColumns = @JoinColumn(name = "document_id", referencedColumnName = "document_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bookmark_id")
    private Bookmark bookmark;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "folder_id")
    private Folder folder;
}
