import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamService } from '../../../services/exam/exam.service';
import { SubjectService } from '../../../services/subject/subject.service';
import { ExamRes } from '../../../models/response_dto/exam-res';
import { SubjectRes } from '../../../models/response_dto/subject-res';

@Component({
  selector: 'app-exam',
  standalone: false,
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css'
})
export class ExamComponent implements OnInit {

  examForm: FormGroup;
  exams: ExamRes[] = [];
  subjects: SubjectRes[] = [];

  showForm = false;
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder, 
    private es: ExamService,
    private ss: SubjectService
  ) {
    this.examForm = this.fb.group({
      examType: ['MIDTERM', Validators.required],
      session: ['', Validators.required],
      examDate: ['', Validators.required],
      roomNumber: ['', Validators.required],
      maxMarks: ['', Validators.required],
      passingMarks: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      status: ['SCHEDULED', Validators.required],
      subjectId: ['WPMH101', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.loadSubjects();
  }

  loadAll(): void {
    this.es.getExams().subscribe({
      next: (res) => this.exams = res,
      error: (err) => console.log(err)
    });
  }

  loadSubjects(): void {
    this.ss.getSubjects().subscribe({
      next: (res) => this.subjects = res,
      error: (err) => console.log(err)
    });
  }

  toggleForm() {
    this.showForm = true;
    this.editingId = null;
    this.examForm.reset({
      examType: 'MIDTERM',
      status: 'SCHEDULED'
    });
  }

  closeForm() {
    this.showForm = false;
    this.editingId = null;
    this.examForm.reset();
  }

  onSubmit() {
    if (this.examForm.invalid) return;
    const payload = this.examForm.value;
    
    if (this.editingId !== null) {
      this.es.updateExam(this.editingId, payload).subscribe({
        next: () => {
          this.loadAll();
          this.closeForm();
        },
        error: (err) => console.log(err)
      });
    } else {
      this.es.addExam(payload).subscribe({
        next: () => {
          this.loadAll();
          this.closeForm();
        },
        error: (err) => console.log(err)
      });
    }
  }

  editExam(ex: ExamRes) {
    this.showForm = true;
    this.editingId = ex.id;
    
    let subId = '';
    const s = this.subjects.find(x => x.subCode === ex.subjectCode);
    if(s) subId = s.id.toString();

    this.examForm.patchValue({
      examType: ex.examType,
      session: ex.session,
      examDate: ex.examDate,
      roomNumber: ex.roomNumber,
      maxMarks: ex.maxMarks,
      passingMarks: ex.passingMarks,
      startTime: ex.startTime,
      endTime: ex.endTime,
      status: ex.status,
      subjectId: subId
    });
  }

  deleteExam(id: number) {
    if (!confirm('Delete this exam?')) return;

    this.es.deleteExam(id).subscribe({
      next: () => this.loadAll(),
      error: (err) => console.log(err)
    });
  }
}
