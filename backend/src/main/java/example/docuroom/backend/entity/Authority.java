package example.docuroom.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "authority")
@Builder
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Authority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;

    @ManyToMany(mappedBy = "authorities")
    private Set<Role> roles;
}
