package com.ayush.College_Management_System.dto.exam;

import com.ayush.College_Management_System.model.enums.ExamType;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import com.ayush.College_Management_System.model.enums.ExamStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExamRequestDTO {

    @NotNull
    private ExamType examType;

    private String session;

    @NotNull
    private LocalDate examDate;

    private String roomNumber;
    private Integer maxMarks;
    private Integer passingMarks;
    
    private LocalTime startTime;
    private LocalTime endTime;

    private ExamStatus status;

    @NotNull
    private Long subjectId;
}
