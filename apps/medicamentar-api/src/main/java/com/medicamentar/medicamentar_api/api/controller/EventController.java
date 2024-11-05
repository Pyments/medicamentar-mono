package com.medicamentar.medicamentar_api.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medicamentar.medicamentar_api.application.dtos.eventDto.EventResponse;
import com.medicamentar.medicamentar_api.application.dtos.responsesDto.ServiceResponse;
import com.medicamentar.medicamentar_api.application.services.EventService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/events")
@Tag(name = "Events")
public class EventController {

    private final EventService eventService;

    @Operation(summary = "Obtém a lista de eventos", method = "GET")
    @GetMapping()
    public ResponseEntity<ServiceResponse<EventResponse>> getEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {
        
        ServiceResponse<EventResponse> response = eventService.getEvents(page, size);
        
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
