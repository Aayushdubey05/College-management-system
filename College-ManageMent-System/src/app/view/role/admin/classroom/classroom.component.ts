import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassroomService } from '../../../services/classroom/classroom.service';
import { DepartmentService } from '../../../services/department/department.service';
import { ClassroomRes } from '../../../models/response_dto/classroom-res';
import { DepartmentResponse } from '../../../models/response_dto/department';

@Component({
  selector: 'app-classroom',
  standalone: false,
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.css'
})
export class ClassroomComponent implements OnInit {

  classroomForm: FormGroup;
  classrooms: ClassroomRes[] = [];
  departments: DepartmentResponse[] = [];

  showForm = false;
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder, 
    private cs: ClassroomService,
    private ds: DepartmentService
  ) {
    this.classroomForm = this.fb.group({
      roomNumber: ['', Validators.required],
      building: ['', Validators.required],
      floor: ['', Validators.required],
      capacity: ['', Validators.required],
      classroomType: ['LECTURE_HALL', Validators.required],
      hasProjector: [false],
      hasAC: [false],
      hasSmartBoard: [false],
      hasAudioSystem: [false],
      isAvailable: [true],
      departmentId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.loadDepartments();
  }

  loadAll(): void {
    this.cs.getClassrooms().subscribe({
      next: (res) => this.classrooms = res,
      error: (err) => console.log(err)
    });
  }

  loadDepartments(): void {
    this.ds.getDepts().subscribe({
      next: (res) => this.departments = res,
      error: (err) => console.log(err)
    });
  }

  toggleForm() {
    this.showForm = true;
    this.editingId = null;
    this.classroomForm.reset({
      classroomType: 'LECTURE_HALL',
      hasProjector: false,
      hasAC: false,
      hasSmartBoard: false,
      hasAudioSystem: false,
      isAvailable: true
    });
  }

  closeForm() {
    this.showForm = false;
    this.editingId = null;
    this.classroomForm.reset();
  }

  onSubmit() {
    if (this.classroomForm.invalid) return;
    const payload = this.classroomForm.value;
    
    if (this.editingId !== null) {
      this.cs.updateClassroom(this.editingId, payload).subscribe({
        next: () => {
          this.loadAll();
          this.closeForm();
        },
        error: (err) => console.log(err)
      });
    } else {
      this.cs.addClassroom(payload).subscribe({
        next: () => {
          this.loadAll();
          this.closeForm();
        },
        error: (err) => console.log(err)
      });
    }
  }

  editClassroom(cls: ClassroomRes) {
    this.showForm = true;
    this.editingId = cls.id;
    
    let deptId = '';
    const d = this.departments.find(x => x.name === cls.departmentName);
    if(d) deptId = d.id.toString();

    this.classroomForm.patchValue({
      roomNumber: cls.roomNumber,
      building: cls.building,
      floor: cls.floor,
      capacity: cls.capacity,
      classroomType: cls.classroomType,
      hasProjector: cls.hasProjector,
      hasAC: cls.hasAC,
      hasSmartBoard: cls.hasSmartBoard,
      hasAudioSystem: cls.hasAudioSystem,
      isAvailable: cls.isAvailable,
      departmentId: deptId
    });
  }

  deleteClassroom(id: number) {
    if (!confirm('Delete this classroom?')) return;

    this.cs.deleteClassroom(id).subscribe({
      next: () => this.loadAll(),
      error: (err) => console.log(err)
    });
  }
}
