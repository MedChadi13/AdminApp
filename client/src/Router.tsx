import { BrowserRouter, Switch, Route , Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";
import Sidebar from "./sidebar-5/Sidebar.jsx";
import httpClient from "./httpClient";
import { useState, useEffect } from "react";
import Upload from "./pages/Upload";
import Archive from "./pages/Archive";
import "./App.css"

import TestLandingPage from "./pages/LandingPage/TestLandingPage";

const Router = () => {

  const [resp, setResp] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");
        setResp(resp.data);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []); 

  return (
    <BrowserRouter>
    
      
      {resp && <Sidebar />}
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/upload" exact component={Upload} />
        <Route path="/archive" exact component={Archive} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
