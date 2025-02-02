import React from "react";
import ReactDOM from "react-dom/client";
import App from "./logic/App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </React.StrictMode>
);
