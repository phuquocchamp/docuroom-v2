package example.docuroom.backend.entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "documents")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class DocumentES {
    @Id
    private String id;

    @Field(type = FieldType.Text)
    private String name;

    @Field(type = FieldType.Text)
    private String url;

    @Field(type = FieldType.Boolean)
    private Boolean isMark;

    @Field(type = FieldType.Text)
    private String description;

    @Field(type = FieldType.Text)
    private String folder;

    @Field(type = FieldType.Text)
    private String tags;
}
