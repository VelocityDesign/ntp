import React from "react";
import ReactDOM from "react-dom";

import { App } from "./components/App";
import { Settings } from "./store";

new Settings();

ReactDOM.hydrate(
    <App />,
    document.getElementById("dot-ntp")
);