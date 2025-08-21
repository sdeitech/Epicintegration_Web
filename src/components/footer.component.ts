import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-section">
            <h4>smartData Healthcare Integration</h4>
            <p class="footer-description">
              Professional healthcare data integration powered by SMART on FHIR
              standards
            </p>
          </div>

          <div class="footer-section">
            <h5>Integration Partners</h5>
            <div class="partner-links">
              <a
                href="https://www.hl7.org/fhir/"
                target="_blank"
                class="partner-link"
              >
                <span>FHIR R4</span>
                <svg
                  width="12"
                  height="12"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
                  />
                </svg>
              </a>

              <a
                href="https://fhir.epic.com/"
                target="_blank"
                class="partner-link"
              >
                <span>Epic Sandbox</span>
                <svg
                  width="12"
                  height="12"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-meta">
            <p>&copy; 2025 smartData Enterprises. All rights reserved.</p>
            <p class="demo-notice">
              This is a proof-of-concept demonstration using Epic's FHIR Sandbox
              environment
            </p>
          </div>

          <div class="tech-stack">
            <span>Built with:</span>
            <div class="tech-items">
              <span class="tech-item">Angular</span>
              <span class="tech-item">TypeScript</span>
              <span class="tech-item">FHIR R4</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        background: linear-gradient(
          135deg,
          var(--neutral-900) 0%,
          var(--neutral-800) 100%
        );
        color: white;
        margin-top: 4rem;
      }

      .footer-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 3rem 2rem 2rem;
      }

      .footer-content {
        display: grid;
        grid-template-columns: 1fr 200px 200px;
        gap: 3rem;
        margin-bottom: 2rem;
      }

      .footer-section h4 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: white;
      }

      .footer-section h5 {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: var(--secondary-blue);
      }

      .footer-description {
        color: var(--neutral-300);
        line-height: 1.6;
        margin-bottom: 1.5rem;
      }

      .partner-links {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .partner-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--neutral-300);
        text-decoration: none;
        font-size: 0.875rem;
        transition: color 0.2s ease;
      }

      .partner-link:hover {
        color: var(--secondary-blue);
      }

      .compliance-badges {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .compliance-badge {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--neutral-300);
        font-size: 0.875rem;
      }

      .footer-bottom {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding-top: 2rem;
        border-top: 1px solid var(--neutral-700);
      }

      .footer-meta p {
        color: var(--neutral-400);
        font-size: 0.875rem;
        margin-bottom: 0.25rem;
      }

      .demo-notice {
        font-size: 0.75rem !important;
        opacity: 0.8;
      }

      .tech-stack {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: var(--neutral-400);
        font-size: 0.875rem;
      }

      .tech-items {
        display: flex;
        gap: 0.75rem;
      }

      .tech-item {
        padding: 0.25rem 0.5rem;
        background: var(--neutral-700);
        border-radius: 0.25rem;
        font-size: 0.75rem;
        color: var(--neutral-200);
      }

      @media (max-width: 768px) {
        .footer-container {
          padding: 2rem 1rem;
        }

        .footer-content {
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .footer-bottom {
          flex-direction: column;
          gap: 1rem;
          align-items: center;
          text-align: center;
        }

        .tech-stack {
          flex-direction: column;
          gap: 0.5rem;
        }
      }
    `,
  ],
})
export class FooterComponent {}
