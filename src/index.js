import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
//import { BrowserRouter } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceworker";

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById("root")
);

serviceWorker.unregister();