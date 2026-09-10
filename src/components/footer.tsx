import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="row">
            <div className="col-xl-2 col-lg-4">
              <div className="footer-logo">
                <Link href="/" aria-label="MelonenMC home">
                  MelonenMC
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4">
              <div className="footer-section footer-section-about">
                <div className="footer-section-title">
                  <span>About Us</span>
                </div>
                <div className="footer-section-content">
                  <p>
                    Join the MelonenMC community for forums, announcements, and
                    community events.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4">
              <div className="footer-section footer-section-links">
                <div className="footer-section-title">
                  <span>Links</span>
                </div>
                <div className="footer-section-content">
                  <ul className="footer-links">
                    <li>
                      <Link href="/cookies/" className="footer-link">Cookie Notice</Link>
                    </li>
                    <li>
                      <Link href="/rules" className="footer-link">Terms and Conditions</Link>
                    </li>
                    <li>
                      <Link href="/rules" className="footer-link">Privacy Policy</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-12">
              <div className="footer-section footer-section-store">
                <div className="footer-section-title"><span>Support Us</span></div>
                <div className="footer-section-content">
                  <p>Support the community by participating and sharing feedback.</p>
                  <Link href="/announcements" className="btn btn-primary btn-sm">Announcements</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-extra">
        <div className="container">
          <div className="footer-info">
            <div className="footer-copyright">
              Copyright © MelonenMC {new Date().getFullYear()}.
            </div>
            <div className="footer-credits">Powered by MelonenMC</div>
            <div className="footer-buttons">
              <a className="footer-button footer-button-sq" href="#" aria-label="Toggle dark mode">
                <i className="fas fa-adjust" aria-hidden="true" />
              </a>
              <a className="footer-button footer-button-sq" href="#" aria-label="Language">
                <i className="fas fa-language" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
