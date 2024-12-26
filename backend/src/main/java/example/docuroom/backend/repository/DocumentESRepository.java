package example.docuroom.backend.repository;

import example.docuroom.backend.entity.DocumentES;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentESRepository extends ElasticsearchRepository<DocumentES, String> {
    @Query("{\"bool\": {\"must\": [{\"match\": {\"tags\": {\"query\": \"?0\", \"operator\": \"and\"}}}]}}")
    List<DocumentES> findByTagsUsingCustomQuery(String tags, Pageable pageable);
}
