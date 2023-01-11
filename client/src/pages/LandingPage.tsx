import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import { User } from "../types";

import "./LandingPage/css/animate.css";
import "./LandingPage/css/bootstrap.min.css";
import "./LandingPage/css/default.css";
import "./LandingPage/css/lineicons.css";
import "./LandingPage/css/style.css";
import "./LandingPage/css/style.css.map";

const LandingPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const logoutUser = async () => {
    await httpClient.post("//localhost:5000/logout");
    window.location.href = "/";
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");
        setUser(resp.data);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  return (
    <div>
      
      {user != null ? (<div>
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
                        href="/upload"
                        rel="nofollow"
                        className="upload-btn wow fadeInLeftBig"
                        data-wow-duration="1.3s"
                        data-wow-delay="0.8s"
                      >
                        Importer les admis
                      </a>
                    </li>
                    </ul>
                    </div>
              </div>
            </div>
          </div>
        </header>
      </div>
      
      ) : (<div>
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
                        href="/"
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
                        href="/login"
                        rel="nofollow"
                        className="sec-btn wow fadeInLeftBig"
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
      )}
    </div>
  );
};

export default LandingPage;
