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
    private final ImgurService imgurService;

    public UserService(UserRepository userRepo, EventLogService eLogService, ImgurService imgurService){
        this.userRepo = userRepo;
        this.eLogService = eLogService;
        this.imgurService = imgurService;
    }

    public ServiceResponse<UserResponse> getUserInfo(String email) {
        ServiceResponse<UserResponse> response = new ServiceResponse<>();

        User user = userRepo.findByEmail(email)
            .orElse(null);

        if (user == null) {
            response.setMessage("Usuário não encontrado.");
            response.setStatus(HttpStatus.NOT_FOUND);
            return response;
        }

        UserResponse userResponse = new UserResponse(
            user.getName(),
            user.getEmail(),
            user.getAge(),
            user.getBloodType(),
            user.getAddress(),
            user.getHeight(),
            user.getWeigth(),
            user.getProfileImage()
        );

        response.setMessage("Sucesso!");
        response.setStatus(HttpStatus.OK);
        response.setData(userResponse);

        return response;
    }

    public ServiceResponse<UserResponse> updateProfile(UserRequest updateProfile, String email) {
        ServiceResponse<UserResponse> response = new ServiceResponse<>();

        try {
            User user = userRepo.findByEmail(email)
                .orElse(null);
            
            if (user == null) {
                response.setMessage("Usuário não encontrado.");
                response.setStatus(HttpStatus.NOT_FOUND);
                return response;
            }

            user.setName(updateProfile.name());
            user.setAge(updateProfile.age());
            user.setWeigth(updateProfile.weigth());
            user.setBloodType(updateProfile.bloodType());
            user.setAddress(updateProfile.address());
            user.setHeight(updateProfile.height());

            if (updateProfile.profileImage() != null && !updateProfile.profileImage().isEmpty()) {
                String imageUrl = imgurService.storeFile(updateProfile.profileImage());
                user.setProfileImage(imageUrl);
            }
        
            userRepo.save(user);
            eLogService.saveEvent(EventLogAction.Atualizado, user);

            UserResponse userResponse = new UserResponse(
                user.getName(),
                user.getEmail(),
                user.getAge(),
                user.getBloodType(),
                user.getAddress(),
                user.getHeight(),
                user.getWeigth(),
                user.getProfileImage()
            );

            response.setMessage("Perfil atualizado com sucesso!");
            response.setStatus(HttpStatus.OK);
            response.setData(userResponse);
            
        } catch (Exception e) {
            response.setMessage("Erro ao atualizar perfil: " + e.getMessage());
            response.setStatus(HttpStatus.BAD_REQUEST);
        }
        
        return response;
    }
}
