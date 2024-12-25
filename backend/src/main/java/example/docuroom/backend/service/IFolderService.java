package example.docuroom.backend.service;

import example.docuroom.backend.dto.request.FolderRequest;
import example.docuroom.backend.dto.response.FolderResponse;
import example.docuroom.backend.entity.Folder;

import java.util.List;

public interface IFolderService {
    FolderResponse createFolder(String folderName);
    FolderResponse getFolderById(Long id);
    List<Folder> getAllFolders();
    Folder updateFolder(Long id, String newName);
    void deleteFolder(Long id);
    boolean isFolderExists(String name);

}