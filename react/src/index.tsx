import React from "react";
import ReactDOM from "react-dom";

import localforage from "localforage";

import { App } from "./components/App";

localforage.setDriver(localforage.LOCALSTORAGE);

ReactDOM.render(
    <App />,
    document.getElementById("ntp")
);