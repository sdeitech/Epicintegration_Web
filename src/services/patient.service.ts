import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Patient, Vital, VitalInput } from '../models/patient.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patientsSubject = new BehaviorSubject<Patient[]>(this.getMockPatients());
  private vitalsSubject = new BehaviorSubject<Vital[]>(this.getMockVitals());
  
  patients$ = this.patientsSubject.asObservable();
  vitals$ = this.vitalsSubject.asObservable();

  private getMockPatients(): Patient[] {
    return [
      {
        id: '1',
        firstName: 'Sarah',
        lastName: 'Johnson',
        dateOfBirth: '1985-03-15',
        gender: 'Female',
        phone: '(555) 123-4567',
        email: 'sarah.johnson@email.com',
        address: {
          street: '123 Main St',
          city: 'Springfield',
          state: 'IL',
          zip: '62701'
        },
        mrn: 'MRN001234',
        insuranceId: 'INS-001'
      },
      {
        id: '2',
        firstName: 'Michael',
        lastName: 'Chen',
        dateOfBirth: '1978-11-22',
        gender: 'Male',
        phone: '(555) 987-6543',
        email: 'michael.chen@email.com',
        address: {
          street: '456 Oak Ave',
          city: 'Chicago',
          state: 'IL',
          zip: '60601'
        },
        mrn: 'MRN005678',
        insuranceId: 'INS-002'
      },
      {
        id: '3',
        firstName: 'Emma',
        lastName: 'Rodriguez',
        dateOfBirth: '1992-07-08',
        gender: 'Female',
        phone: '(555) 456-7890',
        email: 'emma.rodriguez@email.com',
        address: {
          street: '789 Pine Rd',
          city: 'Aurora',
          state: 'IL',
          zip: '60502'
        },
        mrn: 'MRN009876',
        insuranceId: 'INS-003'
      },
      {
        id: '4',
        firstName: 'James',
        lastName: 'Wilson',
        dateOfBirth: '1965-12-01',
        gender: 'Male',
        phone: '(555) 321-0987',
        email: 'james.wilson@email.com',
        address: {
          street: '321 Elm St',
          city: 'Naperville',
          state: 'IL',
          zip: '60540'
        },
        mrn: 'MRN543210',
        insuranceId: 'INS-004'
      }
    ];
  }

  private getMockVitals(): Vital[] {
    return [
      {
        id: '1',
        patientId: '1',
        type: 'blood_pressure',
        value: '120/80',
        unit: 'mmHg',
        timestamp: '2024-01-15T10:30:00Z',
        provider: 'Dr. Smith'
      },
      {
        id: '2',
        patientId: '1',
        type: 'heart_rate',
        value: '72',
        unit: 'bpm',
        timestamp: '2024-01-15T10:30:00Z',
        provider: 'Dr. Smith'
      },
      {
        id: '3',
        patientId: '1',
        type: 'temperature',
        value: '98.6',
        unit: '°F',
        timestamp: '2024-01-15T10:30:00Z',
        provider: 'Dr. Smith'
      },
      {
        id: '4',
        patientId: '2',
        type: 'blood_pressure',
        value: '130/85',
        unit: 'mmHg',
        timestamp: '2024-01-14T14:20:00Z',
        provider: 'Dr. Johnson'
      },
      {
        id: '5',
        patientId: '2',
        type: 'weight',
        value: '180',
        unit: 'lbs',
        timestamp: '2024-01-14T14:20:00Z',
        provider: 'Dr. Johnson'
      }
    ];
  }

  searchPatients(query: string): Observable<Patient[]> {
    const patients = this.patientsSubject.value;
    const filtered = patients.filter(patient => 
      patient.firstName.toLowerCase().includes(query.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(query.toLowerCase()) ||
      patient.mrn.toLowerCase().includes(query.toLowerCase()) ||
      patient.email?.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered);
  }

  addPatient(patient: Omit<Patient, 'id'>): Observable<Patient> {
    const newPatient: Patient = {
      ...patient,
      id: (this.patientsSubject.value.length + 1).toString()
    };
    
    const updatedPatients = [...this.patientsSubject.value, newPatient];
    this.patientsSubject.next(updatedPatients);
    
    return of(newPatient);
  }

  getVitalsForPatient(patientId: string): Observable<Vital[]> {
    const vitals = this.vitalsSubject.value.filter(vital => vital.patientId === patientId);
    return of(vitals);
  }

  addVital(patientId: string, vitalInput: VitalInput): Observable<Vital> {
    let value: string;
    
    if (vitalInput.type === 'blood_pressure' && vitalInput.systolic && vitalInput.diastolic) {
      value = `${vitalInput.systolic}/${vitalInput.diastolic}`;
    } else {
      value = vitalInput.value?.toString() || '';
    }

    const newVital: Vital = {
      id: (this.vitalsSubject.value.length + 1).toString(),
      patientId,
      type: vitalInput.type as any,
      value,
      unit: vitalInput.unit,
      timestamp: new Date().toISOString(),
      provider: 'Dr. Current Provider'
    };

    const updatedVitals = [...this.vitalsSubject.value, newVital];
    this.vitalsSubject.next(updatedVitals);
    
    return of(newVital);
  }
}