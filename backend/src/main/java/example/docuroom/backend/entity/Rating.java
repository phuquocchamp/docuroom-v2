package example.docuroom.backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "ratting")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Rating extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rating_id")
    private Long ratingID;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private AuthUser user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "document_id", referencedColumnName = "document_id")
    private Document document;

    private int ratting;

}
