// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-hostel',
//   standalone: false,
//   templateUrl: './hostel.component.html',
//   styleUrl: './hostel.component.css'
// })
// export class HostelComponent {

// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HostelService } from '../../../services/hostel/hostel.service'; 
import { HostelRes } from '../../../models/response_dto/hostel-res';

@Component({
  selector: 'app-hostel',
  templateUrl: './hostel.component.html',
  styleUrls: ['./hostel.component.css'],
  standalone: false,
})
export class HostelComponent implements OnInit {
  hostels: HostelRes[] = [];
  hostelForm!: FormGroup;
  showForm = false;
  editingId: number | string | null = null;

  constructor(
    private fb: FormBuilder,
    private hostelService: HostelService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadHostels();
  }

  initForm(): void {
    // Maps to the Hostel Fields specification in the API documentation
    this.hostelForm = this.fb.group({
      hostelName: ['', Validators.required],
      blockName: [''],
      roomNumber: [''],
      roomType: [''],
      floorNumber: [null],
      isOccupied: [false, Validators.required],
      hostelFee: [null],
      messFee: [null],
      studentId: [null],
    });
  }

  loadHostels(): void {
    this.hostelService.getHostels().subscribe({
      next: (res) => {
        this.hostels = res;
      },
      error: (err) => console.error('Error fetching hostels', err),
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.closeForm();
    }
  }

  closeForm(): void {
    this.showForm = false;
    this.editingId = null;
    this.hostelForm.reset({ isOccupied: false }); // Reset boolean to false
  }

  editHostel(hostel: HostelRes): void {
    this.editingId = hostel.id; // Assuming the ID is available on the Res DTO
    this.hostelForm.patchValue(hostel);
    this.showForm = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteHostel(id: number | string): void {
    if (confirm('Are you sure you want to delete this hostel record?')) {
      this.hostelService.deleteHostel(id).subscribe({
        next: () => this.loadHostels(),
        error: (err) => console.error('Error deleting hostel', err),
      });
    }
  }

  onSubmit(): void {
    if (this.hostelForm.invalid) {
      this.hostelForm.markAllAsTouched();
      return;
    }

    const formData = this.hostelForm.value;

    if (this.editingId) {
      this.hostelService.updateHostel(this.editingId, formData).subscribe({
        next: () => {
          this.loadHostels();
          this.closeForm();
        },
        error: (err) => console.error('Error updating hostel', err),
      });
    } else {
      this.hostelService.addHostel(formData).subscribe({
        next: () => {
          this.loadHostels();
          this.closeForm();
        },
        error: (err) => console.error('Error adding hostel', err),
      });
    }
  }
}