import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <div class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">FHIR Integration Demo</h1>
          <p class="hero-description">
            Seamlessly connect with Epic's healthcare ecosystem through
            standardized FHIR APIs. This proof-of-concept demonstrates seamless
            integration with Epic's FHIR APIs, showcasing patient data retrieval
          </p>
        </div>
      </div>

      <div class="features-section">
        <h2 class="section-title">Key Integration Features</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <svg
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                />
              </svg>
            </div>
            <h3 class="feature-title">Patient Data Access</h3>
            <p class="feature-description">
              Secure retrieval of patient demographics, medical history, and
              clinical data through Epic's FHIR R4 APIs.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .home-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }

      .hero-section {
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        border-radius: 1rem;
        padding: 2rem 2rem;
        margin: 2rem 0;
        text-align: center;
      }

      .hero-title {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--primary-blue);
        margin-bottom: 1rem;
      }

      .hero-description {
        font-size: 1.125rem;
        color: var(--neutral-600);
        max-width: 600px;
        margin: 0 auto 1rem;
        line-height: 1.6;
      }

      .hero-stats {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin-top: 2rem;
      }

      .stat {
        text-align: center;
      }

      .stat-number {
        font-size: 2rem;
        font-weight: 700;
        color: var(--primary-blue);
      }

      .stat-label {
        font-size: 0.875rem;
        color: var(--neutral-600);
        margin-top: 0.25rem;
      }

      .section-title {
        font-size: 1.875rem;
        font-weight: 600;
        color: var(--neutral-800);
        text-align: center;
        margin-bottom: 2rem;
      }

      .features-section {
        margin: 2rem 0;
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
        width: 50%;
      }

      .feature-card {
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: all 0.2s ease;
      }

      .feature-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
      }

      .feature-icon {
        width: 48px;
        height: 48px;
        background: var(--primary-blue);
        color: white;
        border-radius: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
      }

      .feature-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--neutral-800);
        margin-bottom: 0.75rem;
      }

      .feature-description {
        color: var(--neutral-600);
        line-height: 1.6;
      }

      .technical-section {
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        margin: 2rem 0 4rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .tech-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
      }

      .tech-item {
        text-align: center;
        padding: 1.5rem;
        border: 1px solid var(--neutral-200);
        border-radius: 0.75rem;
      }

      .tech-item h4 {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--primary-blue);
        margin-bottom: 0.5rem;
      }

      .tech-item p {
        color: var(--neutral-600);
        font-size: 0.875rem;
      }

      @media (max-width: 768px) {
        .home-container {
          padding: 0 1rem;
        }

        .hero-section {
          padding: 2rem 1rem;
        }

        .hero-title {
          font-size: 2rem;
        }

        .hero-stats {
          gap: 1.5rem;
        }

        .features-grid {
          grid-template-columns: 1fr;
        }

        .tech-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `,
  ],
})
export class HomeComponent {}
