import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import "./LandingPage/css/animate.css";
import "./LandingPage/css/bootstrap.min.css";
import "./LandingPage/css/default.css";
import "./LandingPage/css/lineicons.css";
import "./LandingPage/css/style.css";
import "./LandingPage/css/style.css.map";
import "./Upload.css";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";

const columns = [
  { field: "matricule", headerName: "Matricule", width: 150 },
  { field: "CIN", headerName: "CIN", width: 150 },
  { field: "nom", headerName: "nom", width: 150 },
  {
    field: "prenom",
    headerName: "prenom",
    width: 150,
  },
  { field: "email", headerName: "email", width: 150 },
  { field: "password", headerName: "password", width: 150 },
  { field: "annee", headerName: "Year", width: 150 },
];

function Archive() {
  const [row, setRow] = useState([]);
  useEffect(() => {
    async function getUser() {
      const res = await fetch(`http://localhost:5000/get_archive`);

      const data = await res.json();
      setRow(data);
      console.log(row);
    }

    getUser();
  }, [row]);
  return (
    <div>
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
            <div className="container center">
              <div style={{ height: 400, width: "100%" }} className="datagrid">
                <DataGrid
                  rows={row}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  getRowId={(row) => row.matricule}
                />
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Archive;
