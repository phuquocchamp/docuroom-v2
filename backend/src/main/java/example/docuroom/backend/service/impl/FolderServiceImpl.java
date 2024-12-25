package example.docuroom.backend.service.impl;

import example.docuroom.backend.dto.request.FolderRequest;
import example.docuroom.backend.dto.response.FolderResponse;
import example.docuroom.backend.entity.AuthUser;
import example.docuroom.backend.entity.Folder;
import example.docuroom.backend.exception.ResourceExitsException;
import example.docuroom.backend.exception.ResourceNotFoundException;
import example.docuroom.backend.repository.AuthRepository;
import example.docuroom.backend.repository.FolderRepository;
import example.docuroom.backend.service.IAuthService;
import example.docuroom.backend.service.IFolderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class FolderServiceImpl implements IFolderService {
    private final AuthRepository authRepository;
    private final FolderRepository folderRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public FolderServiceImpl(AuthRepository authRepository, FolderRepository folderRepository, ModelMapper modelMapper) {
        this.authRepository = authRepository;
        this.folderRepository = folderRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public FolderResponse createFolder(FolderRequest folderRequest) {
        if (folderRequest == null || folderRequest.getName().isEmpty()) {
            throw new IllegalArgumentException("Folder name cannot be empty");
        }
        if (folderRepository.existsByName(folderRequest.getName())) {
            throw new ResourceExitsException("Folder with name '" + folderRequest.getName() + "' already exists");
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        AuthUser user = authRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        Folder folder = new Folder();
        folder.setName(folderRequest.getName());
        folder.setUser(user);

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
    public List<FolderResponse> getAllFolders() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        AuthUser user = authRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        return user.getFolders().stream().map(folder -> modelMapper.map(folder, FolderResponse.class)).toList();
    }


    @Override
    public FolderResponse updateFolder(Long id, String newName) {
        Folder folder = folderRepository.findById(id).orElseThrow();
        if (folderRepository.existsByName(newName)) {
            throw new ResourceExitsException("Folder with name '" + newName + "' already exists");
        }
        folder.setName(newName);
        return modelMapper.map(folderRepository.save(folder), FolderResponse.class);
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
