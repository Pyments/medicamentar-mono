package com.medicamentar.medicamentar_api.application.services;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.medicamentar.medicamentar_api.application.dtos.medicationDto.MedicationRequest;
import com.medicamentar.medicamentar_api.application.dtos.medicationDto.MedicationResponse;
import com.medicamentar.medicamentar_api.application.dtos.medicationDto.UpdateRequest;
import com.medicamentar.medicamentar_api.application.dtos.responsesDto.ServiceResponse;
import com.medicamentar.medicamentar_api.domain.entities.Medication;
import com.medicamentar.medicamentar_api.domain.repositories.MedicationRepository;


@Service
public class MedicationService {

    private final MedicationRepository medicationRepo;
    public MedicationService(MedicationRepository medicationRepo) {
        this.medicationRepo = medicationRepo;
    }
    
    public ServiceResponse<String> createMedication(MedicationRequest medicationRegister){
        ServiceResponse<String> response = new ServiceResponse<String>();

        var entity = new Medication();
        entity.setName(medicationRegister.name());
        entity.setType(medicationRegister.type());
        entity.setDose(medicationRegister.dose());
        entity.setAmount(medicationRegister.amount());
        entity.setUnity(medicationRegister.unity());
        entity.setPeriod(medicationRegister.period());
        entity.setValidate(medicationRegister.validate());

        this.medicationRepo.save(entity);

        response.setMessage("Medicine added!");
        response.setStatus(HttpStatus.CREATED);
        return response;
    }

    public ServiceResponse<List<MedicationResponse>> getMedications() {
        ServiceResponse<List<MedicationResponse>> response = new ServiceResponse<>();
    
       
        List<Medication> medications = medicationRepo.findAll();
    
        
        List<MedicationResponse> medicationResponses = medications.stream()
            .map(medication -> new MedicationResponse(
                medication.getId(),
                medication.getName(),
                medication.getType(),      
                medication.getDose(),
                medication.getAmount(),
                medication.getUnity(),      
                medication.getPeriod(),
                medication.getValidate()    
            ))
            .collect(Collectors.toList());
    
       
        response.setData(medicationResponses);
        response.setStatus(HttpStatus.ACCEPTED);
        response.setMessage("Medications retrieved successfully");
    
        return response;
    }

    public ServiceResponse<String> updateMedication(String id, UpdateRequest updateMedication) {
        ServiceResponse<String> response = new ServiceResponse<String>();

        var medicationId = UUID.fromString(id);

        var medicationEntity = this.medicationRepo.findById(medicationId);

        if (medicationEntity.isPresent()) {
            var medication = medicationEntity.get();

            if (updateMedication.name() != null) {
                medication.setName(updateMedication.name());
            }

            if (updateMedication.dose() != null) {
                medication.setDose(updateMedication.dose());
            }

            if (updateMedication.amount() != null) {
                medication.setAmount(updateMedication.amount());
            }

            if (updateMedication.period() != null) {
                medication.setPeriod(updateMedication.period());
            }

            if (updateMedication.validate() != null) {
                medication.setValidate(updateMedication.validate());
            }

            medicationRepo.save(medication);

            response.setMessage("Updated successfully!");
            response.setStatus(HttpStatus.ACCEPTED);
            return response;
        }
        response.setMessage("Updated Failed!");
        response.setStatus(HttpStatus.BAD_REQUEST);
        return response;
    }

    public ServiceResponse<String> deleteMedication(String id) {
        ServiceResponse<String> response = new ServiceResponse<>();
    
        var medicationId = UUID.fromString(id);
    
        var medicationExists = medicationRepo.existsById(medicationId);
    
        if (medicationExists) {
            medicationRepo.deleteById(medicationId);
            response.setMessage("Medicine deleted successfully!");
            response.setStatus(HttpStatus.ACCEPTED);
        } else {
            response.setMessage("Medicine not found!");
            response.setStatus(HttpStatus.NOT_FOUND);
        }
    
        return response;
    }
}
