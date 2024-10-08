package com.medicamentar.medicamentar_api.api.controller;


import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medicamentar.medicamentar_api.application.dtos.eventDto.EventResponse;
import com.medicamentar.medicamentar_api.application.dtos.responsesDto.PaginatedResponse;
import com.medicamentar.medicamentar_api.application.services.EventService;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@RestController

public class EventController {

    private final EventService eventService;

    @GetMapping("/events")
    public ResponseEntity<PaginatedResponse<EventResponse>> getEvents(@RequestParam(defaultValue= "0") int page,
                                                         @RequestParam(defaultValue= "6") int size){
        Page<EventResponse> eventPage = (Page<EventResponse>) this.eventService.getEvents(page, size);
        PaginatedResponse<EventResponse> PaginatedResponse = new PaginatedResponse<>(
            eventPage.getContent(),
            eventPage.getTotalPages(),
            eventPage.getTotalElements()
        );
        return ResponseEntity.ok(PaginatedResponse);
    }
}

