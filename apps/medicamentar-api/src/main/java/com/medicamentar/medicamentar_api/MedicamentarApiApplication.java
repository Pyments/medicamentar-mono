package com.medicamentar.medicamentar_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@ConfigurationPropertiesScan
@OpenAPIDefinition(info = @Info(title = "Swagger OpenApi", version = "1", description = "Medicamentar API"))
public class MedicamentarApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(MedicamentarApiApplication.class, args);
	}

}
