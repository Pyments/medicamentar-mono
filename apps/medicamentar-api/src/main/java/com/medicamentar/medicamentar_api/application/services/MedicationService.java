package com.medicamentar.medicamentar_api.application.services;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.medicamentar.medicamentar_api.application.dtos.medicationDto.MedicationRequest;
import com.medicamentar.medicamentar_api.application.dtos.medicationDto.MedicationResponse;
import com.medicamentar.medicamentar_api.application.dtos.responsesDto.ServiceResponse;
import com.medicamentar.medicamentar_api.domain.entities.Medication;
import com.medicamentar.medicamentar_api.domain.enums.EventLogAction;
import com.medicamentar.medicamentar_api.domain.repositories.MedicationRepository;


@Service
public class MedicationService {

    private final MedicationRepository medicationRepo;
    private final EventLogService eLogService;
    public MedicationService(MedicationRepository medicationRepo, EventLogService eLogService) {
        this.medicationRepo = medicationRepo;
        this.eLogService = eLogService;
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
        this.eLogService.saveEvent(EventLogAction.Criado, entity);

        response.setMessage("Medicamento criado com sucesso!");
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
        response.setMessage("Exibindo medicamentos.");
    
        return response;
    }

    public ServiceResponse<String> updateMedication(String id, MedicationRequest updateMedication) {
        ServiceResponse<String> response = new ServiceResponse<String>();

        var medicationId = UUID.fromString(id);

        var medicationEntity = this.medicationRepo.findById(medicationId);

        if (medicationEntity.isPresent()) {
            var medication = medicationEntity.get();

                medication.setName(updateMedication.name());
                medication.setType(updateMedication.type());
                medication.setDose(updateMedication.dose());
                medication.setUnity(updateMedication.unity());
                medication.setAmount(updateMedication.amount());
                medication.setPeriod(updateMedication.period());
                medication.setValidate(updateMedication.validate());

            medicationRepo.save(medication);
            this.eLogService.saveEvent(EventLogAction.Atualizado, medication);

            response.setMessage("Atualizado com sucesso!");
            response.setStatus(HttpStatus.ACCEPTED);
            return response;
        }
        response.setMessage("Medicamento não encontrado.");
        response.setStatus(HttpStatus.BAD_REQUEST);
        return response;
    }

    public ServiceResponse<String> deleteMedication(String id) {
        ServiceResponse<String> response = new ServiceResponse<>();
    
        var medicationId = UUID.fromString(id);
    
        var medication = medicationRepo.findById(medicationId);
    
        if (medication.isPresent()) {
            medicationRepo.deleteById(medicationId);
            this.eLogService.saveEvent(EventLogAction.Deletado, medication.get());

            response.setMessage("Medicamento deletado com sucesso!");
            response.setStatus(HttpStatus.ACCEPTED);
        } else {
            response.setMessage("Medicamento não encontrado.");
            response.setStatus(HttpStatus.NOT_FOUND);
        }
    
        return response;
    }
}
