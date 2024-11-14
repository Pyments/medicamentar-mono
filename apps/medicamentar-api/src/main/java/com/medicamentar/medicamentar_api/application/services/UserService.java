package com.medicamentar.medicamentar_api.application.services;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.medicamentar.medicamentar_api.application.dtos.responsesDto.ServiceResponse;
import com.medicamentar.medicamentar_api.application.dtos.userDto.UserRequest;
import com.medicamentar.medicamentar_api.application.dtos.userDto.UserResponse;
import com.medicamentar.medicamentar_api.domain.entities.User;
import com.medicamentar.medicamentar_api.domain.enums.EventLogAction;
import com.medicamentar.medicamentar_api.domain.repositories.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepo;
    private final EventLogService eLogService;
    private final FileStorageService fileStorageService;

    public UserService(UserRepository userRepo, EventLogService eLogService, FileStorageService fileStorageService){
        this.userRepo = userRepo;
        this.eLogService = eLogService;
        this.fileStorageService = fileStorageService;
    }

    public ServiceResponse<UserResponse> getUserInfo(String email) {
        ServiceResponse<UserResponse> response = new ServiceResponse<>();

        User user = userRepo.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        UserResponse userResponse = new UserResponse(
            user.getName(),
            user.getEmail(),
            user.getAge(),
            user.getBloodType(),
            user.getAddress(),
            user.getHeight(),
            user.getProfileImage()
        );

        response.setMessage("Sucesso!");
        response.setStatus(HttpStatus.OK);
        response.setData(userResponse);

        return response;
    }

    public ServiceResponse<String> updateProfile(UserRequest updateProfile, String email){

        ServiceResponse<String> response = new ServiceResponse<>();

        User user = userRepo.findByEmail(email)
            .orElse(null);
        
            if (user == null) {
                response.setMessage("usuário não encontrado.");
                response.setStatus(HttpStatus.NOT_FOUND);
                return response;
            }
            user.setName(updateProfile.name());
            user.setAge(updateProfile.age());
            user.setWeigth(updateProfile.weigth());
            user.setBloodType(updateProfile.bloodType());
            user.setAddress(updateProfile.address());
            user.setHeight(updateProfile.height());
        
            userRepo.save(user);

            eLogService.saveEvent(EventLogAction.Atualizado, user);

        response.setMessage("Perfil atualizado com sucesso!");
        response.setStatus(HttpStatus.ACCEPTED);
        
        return response;
    }

    public ServiceResponse<UserResponse> updateProfileImage(String email, String imageUrl) {
        ServiceResponse<UserResponse> response = new ServiceResponse<>();
        
        try {
            User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            user.setProfileImage(imageUrl);
            userRepo.save(user);

            UserResponse userResponse = new UserResponse(
                user.getName(),
                user.getEmail(),
                user.getAge(),
                user.getBloodType(),
                user.getAddress(),
                user.getHeight(),
                user.getProfileImage()
            );

            response.setMessage("Imagem de perfil atualizada com sucesso!");
            response.setStatus(HttpStatus.OK);
            response.setData(userResponse);
        } catch (RuntimeException e) {
            response.setMessage(e.getMessage());
            response.setStatus(HttpStatus.BAD_REQUEST);
        }
        
        return response;
    }

    public User findByEmail(String email) {
        return userRepo.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

}
