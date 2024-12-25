package example.docuroom.backend.service;

public interface IRatingService {
    boolean createRating(int star);
    int getAverageRating();
}
