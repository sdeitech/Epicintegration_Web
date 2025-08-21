import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpicAuthService {
  private authUrl = 'https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token';

  // These should be stored securely, ideally in environment files
  private clientId = '2a6c33f5-ca09-448a-b3dd-515b5bf0d06a';
  private clientSecret = 'YOUR_CLIENT_SECRET';
  private redirectUri = 'YOUR_REDIRECT_URI';

  constructor(private http: HttpClient) {}

  getToken(code: string): Observable<any> {
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', this.redirectUri)
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret);

    return this.http.post(this.authUrl, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  // Add methods for refreshing tokens, storing tokens, etc. as needed
}