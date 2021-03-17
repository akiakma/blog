import { all, fork } from "redux-saga/effects";
import axios from "axios";

import authSaga from "./authSaga";
import dotenv from "dotenv";
import postSaga from "./postSaga";
import commentSaga from "./commentSaga";
import newsSaga from "./newsSaga";
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

export default function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(postSaga),
        fork(commentSaga),
        fork(newsSaga),
    ]);
}
