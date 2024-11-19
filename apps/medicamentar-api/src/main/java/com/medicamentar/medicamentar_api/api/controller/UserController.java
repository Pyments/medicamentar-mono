package com.medicamentar.medicamentar_api.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.medicamentar.medicamentar_api.application.dtos.responsesDto.ServiceResponse;
import com.medicamentar.medicamentar_api.application.dtos.userDto.UserRequest;
import com.medicamentar.medicamentar_api.application.dtos.userDto.UserResponse;
import com.medicamentar.medicamentar_api.application.services.UserService;
import com.medicamentar.medicamentar_api.domain.entities.User;
import com.medicamentar.medicamentar_api.infrastructure.security.TokenService;
import com.medicamentar.medicamentar_api.application.services.ImgurService;

import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

@RestController
@RequestMapping("/user")
@Tag(name = "Profile")
public class UserController {

    private final UserService userService;
    private final TokenService tokenService;
    private final HttpServletRequest request;
    private final ImgurService imgurService;

    public UserController(UserService userService, TokenService tokenService, HttpServletRequest request, ImgurService imgurService){
        this.userService = userService;
        this.tokenService = tokenService;
        this.request = request;
        this.imgurService = imgurService;
    }

    @Operation(summary = "Retorna informações do usuário.", method = "GET")
    @GetMapping
    public ResponseEntity<ServiceResponse<UserResponse>> profileInfo() {

        User user = tokenService.getCurrentUser();
        var response = userService.getUserInfo(user.getEmail());

        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Operation(summary = "Atualiza as informações do usuário.", method = "PUT")
    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ServiceResponse<UserResponse>> updateProfile(@ModelAttribute UserRequest userRequest) {

        try {
            User user = tokenService.getCurrentUser();
            var response = userService.updateProfile(userRequest, user.getEmail());
            return ResponseEntity.status(response.getStatus()).body(response);
        } catch (Exception e) {
            var errorResponse = new ServiceResponse<UserResponse>();
            errorResponse.setMessage("Erro ao atualizar perfil: " + e.getMessage());
            errorResponse.setStatus(HttpStatus.BAD_REQUEST);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}
