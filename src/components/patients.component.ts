import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../services/common';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent {
  filteredPatients: Patient[] = [];
  loading = false;
  MRN: string = '';
  searchModel = {
    family: '',
    given: '',
    birthdate: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    postal: '',
    telecom: ''
  };

  constructor(private patientService: CommonService) {}

  onSearch() {
    const hasInput = Object.values(this.searchModel).some(val => val && val.trim());
    if (!hasInput && !this.MRN && this.MRN.trim() !== '') {
      this.filteredPatients = [];
      return;
    }

    this.loading = true;
   if (this.MRN && this.MRN.trim() !== '') 
    {
       this.patientService
  .searchPatientByMRN(this.MRN)
  .subscribe(
    res => {
      if (res.statusCode === 200 && res.data) {
        this.filteredPatients = [res.data];
      } else {
        this.filteredPatients = [];
      }
      this.loading = false;
    },
    err => {
      console.error(err);
      this.loading = false;
    }
  );
    }
    else{
 this.patientService.searchPatients(this.searchModel).subscribe(
      res => {
        this.filteredPatients = (res.statusCode === 200 && res.data) ? res.data : [];
        this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false;
      }
    );
    }
   
  }

  viewVitals(patientId: string) {
    console.log('Viewing vitals for patient:', patientId);
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
// src/models/patient.interface.ts
export interface Patient {
  patientId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber?: string;
  emailAddress?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}
