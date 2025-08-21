import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PatientRegistrationDto } from '../app/models/patient-registration.dto';
import { CommonService } from '../services/common';


@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent {
  patientForm: FormGroup;
  isSubmitting = false;
  successMessage = '';

  constructor(private fb: FormBuilder, private commonService: CommonService) {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: [''],
      emailAddress: [''],
      streetAddress: [''],
      city: [''],
      state: [''],
      zipCode: ['']
    });
  }

  onSubmit() {
    if (this.isSubmitting || this.patientForm.invalid) return;

    this.isSubmitting = true;

    const patientData: PatientRegistrationDto = this.patientForm.value;

   this.commonService.addPatient(patientData).subscribe(
  (response: any) => {
    const patientId = response.data.split('/').pop();
    this.successMessage = `Patient created successfully! ID: ${patientId}`;
    this.resetForm();
    this.isSubmitting = false;

    setTimeout(() => {
      this.successMessage = '';
    }, 5000);
  },
  (error: any) => {
    console.error('Error adding patient:', error);
    this.isSubmitting = false;
  }
);
  }

  resetForm() {
    this.patientForm.reset();
  }
}
