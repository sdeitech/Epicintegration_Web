export class PatientRegistrationDto {
  firstName!: string;
  lastName!: string;
  dateOfBirth!: string; // ISO string, e.g., "2025-08-17"
  gender!: string;

  phoneNumber?: string;
  emailAddress?: string;

  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}
