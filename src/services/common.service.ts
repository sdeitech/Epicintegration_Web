import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientRegistrationDto } from './patient-registration.dto';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private apiUrl = 'https://localhost:5001/api/patient';

  constructor(private http: HttpClient) {}

  get<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(url, { params, headers });
  }

  post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(url, body, { headers });
  }

  put<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(url, body, { headers });
  }

  delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(url, { headers });
  }

  // Specific method for adding a patient
  addPatient(patient: PatientRegistrationDto): Observable<any> {
    return this.post(`${this.apiUrl}/CreatePatient`, patient);
  }
}
