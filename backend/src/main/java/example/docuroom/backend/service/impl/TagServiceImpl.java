package example.docuroom.backend.service.impl;

import example.docuroom.backend.dto.TagDTO;
import example.docuroom.backend.entity.Tag;
import example.docuroom.backend.exception.TagAlreadyExitsException;
import example.docuroom.backend.mapper.TagMapper;
import example.docuroom.backend.repository.TagRepository;
import example.docuroom.backend.service.ITagService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TagServiceImpl implements ITagService {
    private final TagRepository tagRepository;

    public TagServiceImpl(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @Override
    public TagDTO createTag(TagDTO tagDTO) {

        Tag savedTag = tagRepository.save(TagMapper.mapToTag(tagDTO, new Tag()));
        return TagMapper.mapToTagDTO(savedTag, new TagDTO());
    }
}
