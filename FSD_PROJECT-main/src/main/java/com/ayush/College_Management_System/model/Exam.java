package com.ayush.College_Management_System.model;

import com.ayush.College_Management_System.model.enums.ExamType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import com.ayush.College_Management_System.model.enums.ExamStatus;

@Entity
@Table(name = "exams")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"subject", "results"})
public class Exam extends BaseEntity {

    @Enumerated(EnumType.STRING)
    private ExamType examType;

    private String session;
    private LocalDate examDate;
    private String roomNumber;
    private Integer maxMarks;
    private Integer passingMarks;
    private LocalTime startTime;
    private LocalTime endTime;

    @Enumerated(EnumType.STRING)
    private ExamStatus status = ExamStatus.SCHEDULED;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sub_id", nullable = false)
    private Subject subject;

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Results> results;
}