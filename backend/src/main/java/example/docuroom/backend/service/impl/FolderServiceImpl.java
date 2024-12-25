package example.docuroom.backend.service.impl;

import example.docuroom.backend.dto.request.FolderRequest;
import example.docuroom.backend.dto.response.FolderResponse;
import example.docuroom.backend.entity.Folder;
import example.docuroom.backend.exception.ResourceExitsException;
import example.docuroom.backend.exception.ResourceNotFoundException;
import example.docuroom.backend.repository.FolderRepository;
import example.docuroom.backend.service.IFolderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FolderServiceImpl implements IFolderService {
    private final FolderRepository folderRepository;

    @Autowired
    public FolderServiceImpl(FolderRepository folderRepository) {
        this.folderRepository = folderRepository;
    }

    @Override
    public FolderResponse createFolder(String folderName) {
        if (folderName == null || folderName.isEmpty()) {
            throw new IllegalArgumentException("Folder name cannot be empty");
        }
        if (folderRepository.existsByName(folderName)) {
            throw new ResourceExitsException("Folder with name '" + folderName + "' already exists");
        }
        Folder folder = new Folder();
        folder.setName(folderName);


        Folder savedFolder = folderRepository.save(folder);
        return new FolderResponse(savedFolder.getId(), savedFolder.getName());
    }

    @Override
    public FolderResponse getFolderById(Long id) {
        Folder retrieved = folderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FOLDER", "ID", id.toString()));
        return new FolderResponse(retrieved.getId(), retrieved.getName());
    }

    @Override
    public List<Folder> getAllFolders() {
        return folderRepository.findAll();
    }

    @Override
    public Folder updateFolder(Long id, String newName) {
        Folder folder = folderRepository.findById(id).orElseThrow();
        if (folderRepository.existsByName(newName)) {
            throw new ResourceExitsException("Folder with name '" + newName + "' already exists");
        }
        folder.setName(newName);
        return folderRepository.save(folder);
    }

    @Override
    public void deleteFolder(Long id) {
        Folder folder = folderRepository.findById(id).orElseThrow();
        folderRepository.delete(folder);
    }

    @Override
    public boolean isFolderExists(String name) {
        return folderRepository.existsByName(name);
    }
}
