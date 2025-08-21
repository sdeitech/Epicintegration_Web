import { Component, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './components/header.component';
import { HomeComponent } from './components/home.component';
import { PatientsComponent } from './components/patients.component';
import { AddPatientComponent } from './components/add-patient.component';
import { VitalsComponent } from './components/vitals.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HomeComponent,
    PatientsComponent,
    AddPatientComponent,
    VitalsComponent,
    FooterComponent
  ],
  template: `
    <div class="app-container">
      <app-header 
        [activeTab]="activeTab" 
        (tabChange)="onTabChange($event)">
      </app-header>
      
      <main class="main-content">
        <app-home *ngIf="activeTab === 'Home'"></app-home>
        <app-patients *ngIf="activeTab === 'Patients'"></app-patients>
        <app-add-patient *ngIf="activeTab === 'Add Patient'"></app-add-patient>
        <app-vitals *ngIf="activeTab === 'Vitals'"></app-vitals>
      </main>
      
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: var(--neutral-50);
    }

    .main-content {
      flex: 1;
      padding: 2rem 0;
    }

    @media (max-width: 768px) {
      .main-content {
        padding: 1rem 0;
      }
    }
  `]
})
export class App {
  activeTab = 'Home';

  onTabChange(tab: string) {
    this.activeTab = tab;
  }
}

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(HttpClientModule)
  ]
});
