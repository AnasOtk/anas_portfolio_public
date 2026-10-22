import { CV_URL, LINKEDIN_URL, OWNER_NAME } from "../../lib/constants";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner container">
        <span className="header__name">{OWNER_NAME}</span>
        <nav className="header__actions" aria-label="Liens">
          {LINKEDIN_URL && (
            <a
              className="header__button"
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5zM.22 8h4.54v14H.22V8zm7.4 0h4.35v1.92h.06c.6-1.15 2.08-2.36 4.29-2.36 4.59 0 5.44 3.02 5.44 6.95V22h-4.54v-6.5c0-1.55-.03-3.55-2.16-3.55-2.16 0-2.49 1.69-2.49 3.44V22H7.62V8z" />
              </svg>
              LinkedIn
            </a>
          )}
          <a
            className="header__button header__button--primary"
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="header__stroke-icon"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <path d="M6 2h8l4 4v16H6V2zM14 2v4h4M9 12h6M9 16h6" />
            </svg>
            Mon CV
          </a>
        </nav>
      </div>
    </header>
  );
}
