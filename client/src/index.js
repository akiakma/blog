import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import loadUser from "./components/auth/loadUser";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/custom.scss";
import "antd/dist/antd.css";
import { coinApi } from "./Api/api";

// const upbit = coinApi.getOneCoinTradeLists("KRW-BTC");

// console.log(upbit);

loadUser();

ReactDOM.render(<App />, document.getElementById("root"));
