package com.medicamentar.medicamentar_api.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping(value = "/helloWorld", produces = {"application/json"})
@Tag(name = "HelloWorld!")
public class HelloWorldController {
  @Operation(summary = "Pequena descrição do endpoint", method = "GET")
  @GetMapping()
  public String helloWorld() {
      return "Hello World!";
  }
}