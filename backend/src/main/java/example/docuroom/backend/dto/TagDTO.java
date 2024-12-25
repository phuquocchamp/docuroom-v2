package example.docuroom.backend.dto;

import example.docuroom.backend.entity.BaseEntity;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TagDTO extends BaseEntity {
    private Long tagID;

    @NotEmpty(message = "Tag can not be null or empty")
    private String name;
}
