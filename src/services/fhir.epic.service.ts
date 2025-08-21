import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FhirEpicService {
  private baseUrl = 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4';

  constructor(private http: HttpClient) {}

  getPatient(patientId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/Patient/${patientId}`, { headers });
  }

  addPatient(patientData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/fhir+json'
    });
    return this.http.post(`${this.baseUrl}/Patient`, patientData, { headers });
  }

  saveVital(patientId: string, vitalData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/fhir+json'
    });
    // FHIR vital signs are stored as Observations
    return this.http.post(`${this.baseUrl}/Observation`, vitalData, { headers });
  }

    getVital(patientId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
    });
    // FHIR vital signs are stored as Observations, filter by patient
    return this.http.get(
        `${this.baseUrl}/Observation?patient=${patientId}&category=vital-signs`,
        { headers }
    );
    }

    searchPatient(query: string, token: string): Observable<any> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  // Search patient by name, identifier, etc. using FHIR Patient search parameters
  return this.http.get(
    `${this.baseUrl}/Patient?${query}`,
    { headers }
  );
}


}