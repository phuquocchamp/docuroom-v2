package example.docuroom.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private Long id;

    private String name;

    @Column(length = 2000)
    private String description;

    @Column(length = 2000)
    private String url;

    private Boolean isMark;

    private String tags;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private AuthUser user;

    @OneToMany(mappedBy = "document", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany
    @JoinTable(
            name = "has_ratings",
            joinColumns = @JoinColumn(name = "document_id", referencedColumnName = "document_id"),
            inverseJoinColumns = @JoinColumn(name = "rating_id", referencedColumnName = "rating_id")
    )
    private List<Rating> ratings = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "folder_id")
    private Folder folder;
}
