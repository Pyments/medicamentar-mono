package com.medicamentar.medicamentar_api.application.dtos.userDto;

import lombok.Data;

@Data
public class ImgurResponse {
    private ImgurData data;
    private boolean success;
    private int status;
}