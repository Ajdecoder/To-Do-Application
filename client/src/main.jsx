import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
import { CrudTableContext } from "./components/context/CrudTableContext.jsx";
import { CrudAuthContext } from "./components/context/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CrudAuthContext>
    <CrudTableContext>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      ,
    </CrudTableContext>
  </CrudAuthContext>
);
