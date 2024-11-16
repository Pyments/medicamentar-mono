package com.medicamentar.medicamentar_api.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.medicamentar.medicamentar_api.application.dtos.responsesDto.ServiceResponse;
import com.medicamentar.medicamentar_api.application.dtos.userDto.UserRequest;
import com.medicamentar.medicamentar_api.application.dtos.userDto.UserResponse;
import com.medicamentar.medicamentar_api.application.services.UserService;
import com.medicamentar.medicamentar_api.infrastructure.security.TokenService;
import com.medicamentar.medicamentar_api.application.services.ImgurService;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
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

        String email = tokenService.getEmailFromToken(request);
        var response = userService.getUserInfo(email);

        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Operation(summary = "Atualiza as informações do usuário.", method = "PUT")
    @PutMapping
    public ResponseEntity<ServiceResponse<String>> updateProfile(@RequestBody UserRequest userRequest) {

        String email = tokenService.getEmailFromToken(request);
        var response = userService.updateProfile(userRequest, email);
        
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @PostMapping(value = "/profile-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload de imagem de perfil", method = "POST")
    @Parameter(
        content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE)
    )
    public ResponseEntity<ServiceResponse<UserResponse>> uploadProfileImage(
            @RequestParam("file") MultipartFile file) {
        try {
            String email = tokenService.getEmailFromToken(request);
            String imageUrl = imgurService.storeFile(file);
            
            var response = userService.updateProfileImage(email, imageUrl);
            return ResponseEntity.status(response.getStatus()).body(response);
        } catch (Exception e) {
            var errorResponse = new ServiceResponse<UserResponse>();
            errorResponse.setMessage("Erro ao fazer upload da imagem: " + e.getMessage());
            errorResponse.setStatus(HttpStatus.BAD_REQUEST);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}
