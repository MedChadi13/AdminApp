import React from "react";

import "../pages/LandingPage/css/animate.css";
import "../pages/LandingPage/css/bootstrap.min.css";
import "../pages/LandingPage/css/default.css";
import "../pages/LandingPage/css/lineicons.css";
import "../pages/LandingPage/css/style.css";
import "../pages/LandingPage/css/style.css.map";
import logo from "../EMILogo.gif";

import httpClient from "../httpClient";

function Sidebar() {
  const toggleSidebar = () => document.body.classNameList.toggle("open");
  const logoutUser = async () => {
    await httpClient.post("//localhost:5000/logout");
    window.location.href = "/";
  };
  return (
    <div>
      <div className="navbar-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="/">
                  <img src={logo} className="logo" alt="Logo" />
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                </button>

                <div
                  className="collapse navbar-collapse sub-menu-bar"
                  id="navbarSupportedContent"
                >
                  <ul id="nav" className="navbar-nav ml-auto">
                    <li className="nav-item active">
                      <a className="page-scroll" href="/">
                        Home
                      </a>
                    </li>

                    <li className="nav-item">
                      <a className="page-scroll" href="/upload">
                        Importation
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="page-scroll" href="/archive">
                        Archives
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/"
                        className="page-scroll"
                        onClick={() => {
                          logoutUser();
                        }}
                      >
                        Déconnexion
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
