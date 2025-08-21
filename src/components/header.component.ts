import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="header-container">
        <div class="logo-section">
          <div class="logo">
          <div class="logo">
              <img src="assets/splashLogo.png" alt="Logo" width="80" height="80" style="border-radius:10px;" />
              <!-- SVG or other logo elements -->
          </div>   
         
          </div>
          
        </div>
        
        <nav class="navigation">
          <button 
            *ngFor="let tab of tabs" 
            class="nav-button"
            [class.active]="tab === activeTab"
            (click)="tabChange.emit(tab)">
            {{ tab }}
          </button>
        </nav>
        
        <div class="user-section">
          <div class="integration-badge">
            <span>SMART on FHIR</span>
            <span class="separator">•</span>
            <span>Epic Sandbox</span>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-blue-light) 100%);
      color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .integration-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.15);
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .separator {
      opacity: 0.6;
    }

    .navigation {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .nav-button {
      background: none;
      border: none;
      color: white;
      padding: 0.75rem 1.25rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      opacity: 0.8;
       font-family: 'Outfit';
    }

    .nav-button:hover {
      background: rgba(255, 255, 255, 0.15);
      opacity: 1;
    }

    .nav-button.active {
      background: rgba(255, 255, 255, 0.2);
      opacity: 1;
    }

    .user-section {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .user-info {
      text-align: right;
    }

    .user-name {
      display: block;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .user-role {
      display: block;
      font-size: 0.75rem;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .header-container {
        padding: 1rem;
        flex-wrap: wrap;
        gap: 1rem;
      }
      
      .logo-section {
        flex: 1;
        min-width: 200px;
      }
      
      .navigation {
        order: 3;
        flex: 1 1 100%;
        justify-content: center;
      }
      
      .integration-badge {
        display: none;
      }
      
      .nav-button {
        padding: 0.5rem 1rem;
        font-size: 0.8rem;
      }
    }
  `]
})
export class HeaderComponent {
  @Input() activeTab: string = 'Home';
  @Output() tabChange = new EventEmitter<string>();
  
  tabs = ['Home', 'Add Patient', 'Patients'];
}