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
import Button from "@mui/material/Button";

const columns = [
  { field: "matricule", headerName: "Matricule", width: 200 },
  { field: "CIN", headerName: "CIN", width: 200 },
  { field: "nom", headerName: "nom", width: 200 },
  {
    field: "prenom",
    headerName: "prenom",
    width: 200,
  },
  { field: "email", headerName: "email", width: 200 },
  { field: "password", headerName: "password", width: 200 },
];

const Upload = () => {
  const handleArchive = () => {
    fetch("http://localhost:5000/archive", {
      method: "POST",
    })
      .then((res) => console.log(res))
      .catch((err) => console.warn(err));
  };

  const [file, setFile] = useState("");
  const [array, setArray] = useState([]);
  const [row, setRow] = useState([]);
  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    async function getUser() {
      const res = await fetch(`http://localhost:5000/get_csv`);

      const data = await res.json();
      setRow(data);
      console.log(data);
    }

    getUser();
  }, [row]);

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };
      fileReader.readAsText(file);
    }

    const formData = new FormData();
    formData.append("file", file);
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    console.log(formData);

    fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => console.log(res))
      .catch((err) => console.warn(err));
  };

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
              <Box
                component="span"
                sx={{ p: 2, border: "1px dashed grey" }}
                className="center"
              >
                <form>
                  <input
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                  />
                  <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="add"
                    onClick={(e) => {
                      handleOnSubmit(e);
                    }}
                  >
                    <a href="/upload" style={{ color: "white" }}>
                      Import CSV
                    </a>
                  </Fab>
                </form>
              </Box>
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
              <Button
                variant="contained"
                onClick={() => {
                  handleArchive();
                }}
              >
                <a href="/archive" style={{ color: "white" }}>
                  ARCHIVER
                </a>
              </Button>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Upload;
