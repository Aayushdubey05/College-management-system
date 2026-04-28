package com.ayush.College_Management_System.dto.infrastructure;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import com.ayush.College_Management_System.model.enums.InfrastructureStatus;
import com.ayush.College_Management_System.model.enums.InfrastructureType;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InfrastructureRequestDTO {

    private String roomOrLabName;
    private Integer floor;
    private String block;
    private Integer capacity;
    private Boolean hasProjector;
    private Integer noOfComputers;
    private InfrastructureType type;
    private InfrastructureStatus status;
    private LocalDate lastMaintenanceDate;

    @NotNull
    private Long departmentId;
}
