import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientRegistrationDto } from '../app/models/patient-registration.dto';
PatientRegistrationDto

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private apiUrl = 'http://3.131.105.103:8110/api'; // change to your C# API

  constructor(private http: HttpClient) {}

  addPatient(patient: PatientRegistrationDto): Observable<PatientRegistrationDto> {
    return this.http.post<PatientRegistrationDto>(`${this.apiUrl}/Patient/CreatePatient`, patient);
  }

searchPatients(searchModel: any): Observable<any> {
  let params = new HttpParams();

  for (const key in searchModel) {
    const value = searchModel[key];
    if (value && value.trim() !== '') {
      const paramKey = this.mapKeyToQueryParam(key);
      params = params.append(paramKey, value);
    }
  }

  return this.http.get<any>(`${this.apiUrl}/Patient/search`, { params });
}

private mapKeyToQueryParam(key: string): string {
  const map: any = {
    city: 'address-city',
    state: 'address-state',
    postal: 'address-postalcode'
  };
  return map[key] || key;
}
searchPatientByMRN(id: any): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/Patient/ReadPatient/${id}`);
}
}
