package example.docuroom.backend.mapper;


import example.docuroom.backend.dto.TagDTO;
import example.docuroom.backend.entity.Tag;

public class TagMapper {
    public static TagDTO mapToTagDTO(Tag tag, TagDTO tagDTO){
        tagDTO.setTagID(tag.getTagID());
        tagDTO.setName(tag.getName());
        return tagDTO;
    }
    public static Tag mapToTag(TagDTO tagDTO, Tag tag){
        tag.setTagID(tagDTO.getTagID());
        tag.setName(tag.getName());
        return tag;
    }
}
