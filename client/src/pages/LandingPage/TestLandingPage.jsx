import React from "react";
import "./css/animate.css";
import "./css/bootstrap.min.css";
import "./css/default.css";
import "./css/lineicons.css";
import "./css/style.css";
import "./css/style.css.map";

function TestLandingPage() {
  return (
    <div>
      <div className="header-shape-1"></div>
      <header className="header-area ">
        <div
          id="home"
          className="header-hero bg_cover d-lg-flex align-items-center"
        >
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
          <div className="shape shape-6"></div>

          <div className="container">
            <div className="row align-items-center justify-content-center justify-content-lg-between">
              <div className="col-lg-6 col-md-10">
                <div className="header-hero-content">
                  <h3
                    className="header-title wow fadeInLeftBig"
                    data-wow-duration="1.3s"
                    data-wow-delay="0.2s"
                  >
                    Bienvenu à la <span>PLATEFORME</span> d'inscription de l'EMI
                  </h3>
                </div>
              </div>
              <div className="col-lg-6 col-md-10">
                <ul className="d-flex">
                  <li>
                    <a
                      href="https://rebrand.ly/appland-ud"
                      rel="nofollow"
                      className="main-btn wow fadeInLeftBig"
                      data-wow-duration="1.3s"
                      data-wow-delay="0.8s"
                    >
                      Inscription
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://rebrand.ly/appland-ud"
                      rel="nofollow"
                      className="sec-btn"
                      data-wow-duration="1.3s"
                      data-wow-delay="0.8s"
                    >
                      Admin
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default TestLandingPage;
