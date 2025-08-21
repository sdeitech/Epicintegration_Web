export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone?: string;
  email?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  mrn: string;
  insuranceId?: string;
}

export interface Vital {
  id: string;
  patientId: string;
  type: 'blood_pressure' | 'heart_rate' | 'temperature' | 'weight' | 'height' | 'oxygen_saturation';
  value: string;
  unit: string;
  timestamp: string;
  provider: string;
}

export interface VitalInput {
  type: string;
  systolic?: number;
  diastolic?: number;
  value?: number;
  unit: string;
}