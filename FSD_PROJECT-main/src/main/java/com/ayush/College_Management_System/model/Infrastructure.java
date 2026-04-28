package com.ayush.College_Management_System.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import com.ayush.College_Management_System.model.enums.InfrastructureStatus;
import com.ayush.College_Management_System.model.enums.InfrastructureType;
import com.ayush.College_Management_System.model.BaseEntity;
import com.ayush.College_Management_System.model.Department;


@Entity
@Table(name = "infrastructure")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"department"})
public class Infrastructure extends BaseEntity {

    private String roomOrLabName;
    private Integer floor;
    private String block;
    private Integer capacity;
    private Boolean hasProjector;
    private Integer noOfComputers;
    
    @Enumerated(EnumType.STRING)
    private InfrastructureType type;

    @Enumerated(EnumType.STRING)
    private InfrastructureStatus status = InfrastructureStatus.ACTIVE;

    private LocalDate lastMaintenanceDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dept_id", nullable = false)
    private Department department;
}