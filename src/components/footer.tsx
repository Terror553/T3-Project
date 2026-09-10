import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-4">
              <div className="footer-section footer-section-about">
                <div className="footer-section-title">
                  <span>Über Uns</span>
                </div>
                <div className="footer-section-content">
                  <p>MelonenMC.de ist einfach krass digga</p>
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
                      <Link href="/" target="" className="footer-link">
                        {" "}
                        Homepage{" "}
                      </Link>
                    </li>
                  </ul>
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
              Copyright © MelonenMC.de 2017
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
