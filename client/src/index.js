import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import loadUser from "./components/auth/loadUser";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/custom.scss";
import "antd/dist/antd.css";

loadUser();

ReactDOM.render(<App />, document.getElementById("root"));
