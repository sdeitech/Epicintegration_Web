import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { Patient, Vital, VitalInput } from '../models/patient.interface';

@Component({
  selector: 'app-vitals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="vitals-container">
      <div class="page-header">
        <h1 class="page-title">Vitals Management</h1>
        <p class="page-description">Monitor and record patient vitals through Epic FHIR observations</p>
      </div>

      <div class="patient-selector card">
        <div class="selector-header">
          <h2>Select Patient</h2>
          <div class="status-badges">
            <span class="badge badge-success">FHIR Connected</span>
            <span class="badge badge-success">Real-time Sync</span>
          </div>
        </div>
        <select 
          class="form-input patient-select"
          [(ngModel)]="selectedPatientId"
          (change)="onPatientSelect()"
        >
          <option value="">Choose a patient...</option>
          <option *ngFor="let patient of patients" [value]="patient.id">
            {{ patient.firstName }} {{ patient.lastName }} ({{ patient.mrn }})
          </option>
        </select>
      </div>

      <div *ngIf="selectedPatientId" class="vitals-content">
        <div class="vitals-header">
          <div class="patient-info">
            <h2>{{ selectedPatient?.firstName }} {{ selectedPatient?.lastName }}</h2>
            <p>MRN: {{ selectedPatient?.mrn }} | DOB: {{ formatDate(selectedPatient?.dateOfBirth || '') }}</p>
          </div>
          <button class="btn btn-primary" (click)="showAddVitalModal = true">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Record Vital
          </button>
        </div>

        <div class="vitals-table-container card">
          <div class="table-header">
            <h3>Vitals History</h3>
            <p>Latest observations from Epic FHIR resources</p>
          </div>
          
          <div *ngIf="patientVitals.length === 0" class="empty-vitals">
            <div class="empty-icon">
              <svg width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L3.5 16.99z"/>
              </svg>
            </div>
            <h4>No vitals recorded</h4>
            <p>Record the first vital sign for this patient</p>
          </div>

          <table *ngIf="patientVitals.length > 0" class="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Value</th>
                <th>Unit</th>
                <th>Date/Time</th>
                <th>Provider</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let vital of patientVitals">
                <td>
                  <div class="vital-type">
                    <span class="vital-icon">{{ getVitalIcon(vital.type) }}</span>
                    {{ formatVitalType(vital.type) }}
                  </div>
                </td>
                <td class="vital-value">{{ vital.value }}</td>
                <td>{{ vital.unit }}</td>
                <td>{{ formatDateTime(vital.timestamp) }}</td>
                <td>{{ vital.provider }}</td>
                <td>
                  <span class="badge badge-success">Recorded</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Add Vital Modal -->
      <div *ngIf="showAddVitalModal" class="modal-overlay" (click)="closeModal($event)">
        <div class="modal">
          <div class="modal-header">
            <h3>Record New Vital</h3>
            <button class="modal-close" (click)="showAddVitalModal = false">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
          
          <form (ngSubmit)="onAddVital()" class="modal-body">
            <div class="form-group">
              <label class="form-label">Vital Type *</label>
              <select class="form-input" [(ngModel)]="newVital.type" name="type" required>
                <option value="">Select vital type</option>
                <option value="blood_pressure">Blood Pressure</option>
                <option value="heart_rate">Heart Rate</option>
                <option value="temperature">Temperature</option>
                <option value="weight">Weight</option>
                <option value="height">Height</option>
                <option value="oxygen_saturation">Oxygen Saturation</option>
              </select>
            </div>

            <div *ngIf="newVital.type === 'blood_pressure'" class="bp-inputs">
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Systolic *</label>
                  <input 
                    type="number" 
                    class="form-input" 
                    [(ngModel)]="newVital.systolic"
                    name="systolic"
                    placeholder="120"
                    required
                  >
                </div>
                <div class="form-group">
                  <label class="form-label">Diastolic *</label>
                  <input 
                    type="number" 
                    class="form-input" 
                    [(ngModel)]="newVital.diastolic"
                    name="diastolic"
                    placeholder="80"
                    required
                  >
                </div>
              </div>
            </div>

            <div *ngIf="newVital.type !== 'blood_pressure' && newVital.type" class="form-group">
              <label class="form-label">Value *</label>
              <input 
                type="number" 
                class="form-input" 
                [(ngModel)]="newVital.value"
                name="value"
                [placeholder]="getValuePlaceholder(newVital.type)"
                required
              >
            </div>

            <div *ngIf="newVital.type" class="form-group">
              <label class="form-label">Unit</label>
              <input 
                type="text" 
                class="form-input" 
                [(ngModel)]="newVital.unit"
                name="unit"
                [value]="getDefaultUnit(newVital.type)"
                readonly
              >
            </div>

            <div class="modal-actions">
              <button type="button" class="btn btn-secondary" (click)="showAddVitalModal = false">
                Cancel
              </button>
              <button type="submit" class="btn btn-success" [disabled]="!isValidVital()">
                Record Vital
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .vitals-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .page-header {
      margin-bottom: 2rem;
    }

    .page-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--neutral-800);
      margin-bottom: 0.5rem;
    }

    .page-description {
      color: var(--neutral-600);
      font-size: 1.1rem;
    }

    .patient-selector {
      padding: 1.5rem;
      margin-bottom: 2rem;
    }

    .selector-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .selector-header h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--neutral-800);
    }

    .status-badges {
      display: flex;
      gap: 0.5rem;
    }

    .patient-select {
      font-size: 1rem;
      padding: 0.75rem;
    }

    .vitals-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
    }

    .patient-info h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--primary-blue);
      margin-bottom: 0.25rem;
    }

    .patient-info p {
      color: var(--neutral-600);
      font-size: 0.875rem;
    }

    .vitals-table-container {
      padding: 1.5rem;
    }

    .table-header {
      margin-bottom: 1.5rem;
    }

    .table-header h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--neutral-800);
      margin-bottom: 0.25rem;
    }

    .table-header p {
      color: var(--neutral-600);
      font-size: 0.875rem;
    }

    .empty-vitals {
      text-align: center;
      padding: 3rem 1rem;
      color: var(--neutral-500);
    }

    .empty-icon {
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    .empty-vitals h4 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--neutral-700);
    }

    .vital-type {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .vital-icon {
      font-size: 1.125rem;
    }

    .vital-value {
      font-weight: 600;
      color: var(--primary-blue);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid var(--neutral-200);
    }

    .modal-header h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--neutral-800);
    }

    .modal-close {
      background: none;
      border: none;
      color: var(--neutral-500);
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 0.25rem;
    }

    .modal-close:hover {
      background: var(--neutral-100);
      color: var(--neutral-700);
    }

    .modal-body {
      padding: 1.5rem;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .modal-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid var(--neutral-200);
    }

    @media (max-width: 768px) {
      .vitals-container {
        padding: 1rem;
      }

      .vitals-header {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }

      .table {
        font-size: 0.8rem;
      }

      .form-grid {
        grid-template-columns: 1fr;
      }

      .modal-actions {
        flex-direction: column-reverse;
      }
    }
  `]
})
export class VitalsComponent implements OnInit {
  patients: Patient[] = [];
  selectedPatientId = '';
  selectedPatient: Patient | null = null;
  patientVitals: Vital[] = [];
  showAddVitalModal = false;

  newVital: VitalInput = {
    type: '',
    unit: ''
  };

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.patientService.patients$.subscribe(patients => {
      this.patients = patients;
    });
  }

  onPatientSelect() {
    if (this.selectedPatientId) {
      this.selectedPatient = this.patients.find(p => p.id === this.selectedPatientId) || null;
      this.loadVitals();
    } else {
      this.selectedPatient = null;
      this.patientVitals = [];
    }
  }

  loadVitals() {
    if (this.selectedPatientId) {
      this.patientService.getVitalsForPatient(this.selectedPatientId).subscribe(vitals => {
        this.patientVitals = vitals.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      });
    }
  }

  onAddVital() {
    if (!this.selectedPatientId || !this.isValidVital()) return;

    this.patientService.addVital(this.selectedPatientId, this.newVital).subscribe(vital => {
      this.loadVitals();
      this.resetVitalForm();
      this.showAddVitalModal = false;
    });
  }

  resetVitalForm() {
    this.newVital = {
      type: '',
      unit: ''
    };
  }

  isValidVital(): boolean {
    if (!this.newVital.type) return false;
    
    if (this.newVital.type === 'blood_pressure') {
      return !!(this.newVital.systolic && this.newVital.diastolic);
    }
    
    return !!this.newVital.value;
  }

  closeModal(event: Event) {
    if (event.target === event.currentTarget) {
      this.showAddVitalModal = false;
    }
  }

  getVitalIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'blood_pressure': '🩺',
      'heart_rate': '💓',
      'temperature': '🌡️',
      'weight': '⚖️',
      'height': '📏',
      'oxygen_saturation': '🫁'
    };
    return icons[type] || '📊';
  }

  formatVitalType(type: string): string {
    const formatted: { [key: string]: string } = {
      'blood_pressure': 'Blood Pressure',
      'heart_rate': 'Heart Rate',
      'temperature': 'Temperature',
      'weight': 'Weight',
      'height': 'Height',
      'oxygen_saturation': 'Oxygen Saturation'
    };
    return formatted[type] || type;
  }

  getDefaultUnit(type: string): string {
    const units: { [key: string]: string } = {
      'blood_pressure': 'mmHg',
      'heart_rate': 'bpm',
      'temperature': '°F',
      'weight': 'lbs',
      'height': 'in',
      'oxygen_saturation': '%'
    };
    this.newVital.unit = units[type] || '';
    return units[type] || '';
  }

  getValuePlaceholder(type: string): string {
    const placeholders: { [key: string]: string } = {
      'heart_rate': '72',
      'temperature': '98.6',
      'weight': '150',
      'height': '68',
      'oxygen_saturation': '98'
    };
    return placeholders[type] || '';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }
}