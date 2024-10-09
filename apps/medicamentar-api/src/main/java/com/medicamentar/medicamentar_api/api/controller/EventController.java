package com.medicamentar.medicamentar_api.api.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medicamentar.medicamentar_api.application.dtos.eventDto.EventResponse;
import com.medicamentar.medicamentar_api.application.dtos.responsesDto.ServiceResponse;
import com.medicamentar.medicamentar_api.application.services.EventService;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@RestController
@RequestMapping("/events")
public class EventController {

    private final EventService eventService;

    @GetMapping()
    public ResponseEntity<ServiceResponse<EventResponse>> getEvents(@RequestParam(defaultValue= "0") int page,
                                                                    @RequestParam(defaultValue= "6") int size) {
        var response = this.eventService.getEvents(page, size);
        return response.getStatus() == HttpStatus.ACCEPTED
        ? ResponseEntity.status(HttpStatus.ACCEPTED).body(response)
        : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}

