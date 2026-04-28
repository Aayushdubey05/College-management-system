import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfrastructureService } from '../../../services/infrastructure/infrastructure.service';
import { DepartmentService } from '../../../services/department/department.service';
import { InfrastructureRes } from '../../../models/response_dto/infrastructure-res';
import { DepartmentResponse } from '../../../models/response_dto/department';

@Component({
  selector: 'app-infrastructure',
  standalone: false,
  templateUrl: './infrastructure.component.html',
  styleUrl: './infrastructure.component.css'
})
export class InfrastructureComponent implements OnInit {

  infraForm: FormGroup;
  infrastructures: InfrastructureRes[] = [];
  departments: DepartmentResponse[] = [];

  showForm = false;
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder, 
    private is: InfrastructureService,
    private ds: DepartmentService
  ) {
    this.infraForm = this.fb.group({
      roomOrLabName: ['', Validators.required],
      floor: ['', Validators.required],
      block: ['', Validators.required],
      capacity: ['', Validators.required],
      hasProjector: [false],
      noOfComputers: [null],
      type: ['LAB', Validators.required],
      status: ['ACTIVE', Validators.required],
      lastMaintenanceDate: [''],
      departmentId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.loadDepartments();
  }

  loadAll(): void {
    this.is.getAll().subscribe({
      next: (res) => this.infrastructures = res,
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
    this.infraForm.reset({
      hasProjector: false,
      noOfComputers: null,
      type: 'LAB',
      status: 'ACTIVE'
    });
  }

  closeForm() {
    this.showForm = false;
    this.editingId = null;
    this.infraForm.reset();
  }

  onSubmit() {
    if (this.infraForm.invalid) return;
    const payload = this.infraForm.value;
    
    if (this.editingId !== null) {
      this.is.update(this.editingId, payload).subscribe({
        next: () => {
          this.loadAll();
          this.closeForm();
        },
        error: (err) => console.log(err)
      });
    } else {
      this.is.addInfrastructure(payload).subscribe({
        next: () => {
          this.loadAll();
          this.closeForm();
        },
        error: (err) => console.log(err)
      });
    }
  }

  editInfra(infra: InfrastructureRes) {
    this.showForm = true;
    this.editingId = infra.id;
    
    let deptId = '';
    const d = this.departments.find(x => x.name === infra.departmentName);
    if(d) deptId = d.id.toString();

    this.infraForm.patchValue({
      roomOrLabName: infra.roomOrLabName,
      floor: infra.floor,
      block: infra.block,
      capacity: infra.capacity,
      hasProjector: infra.hasProjector,
      noOfComputers: infra.noOfComputers,
      type: infra.type,
      status: infra.status,
      lastMaintenanceDate: infra.lastMaintenanceDate,
      departmentId: deptId
    });
  }

  deleteInfra(id: number) {
    if (!confirm('Delete this infrastructure?')) return;

    this.is.delete(id).subscribe({
      next: () => this.loadAll(),
      error: (err) => console.log(err)
    });
  }
}
