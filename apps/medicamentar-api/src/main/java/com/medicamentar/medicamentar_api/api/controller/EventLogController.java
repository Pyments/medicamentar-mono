package com.medicamentar.medicamentar_api.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medicamentar.medicamentar_api.application.services.EventLogService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/eventsLog")
@Tag(name = "Events Log")
@RequiredArgsConstructor
public class EventLogController {
  private final EventLogService eLogService;

  @Operation(summary = "Lista o Hitórico de eventos", method = "GET")
  @GetMapping()
  public ResponseEntity<?> getHistory() {
    var response = this.eLogService.getHistory();
    return ResponseEntity.status(response.getStatus()).body(response);
  }
}
