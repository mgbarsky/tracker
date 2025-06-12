import React from "react";
import ReactDOM from "react-dom/client";
import App from "./logic/App";


import "./index.css";
import { BrowserRouter, HashRouter } from "react-router-dom";

const PRODUCTION_SUB_DIRECTORY = "/tracker";
const basename = import.meta.env.PROD ? PRODUCTION_SUB_DIRECTORY : "/";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter basename={basename}>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
