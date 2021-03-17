import axios from "axios";
import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import {
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_REQUEST,
    USER_LOADING_SUCCESS,
    USER_LOADING_FAILURE,
    USER_LOADING_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    CLEAR_ERROR_REQUEST,
    CLEAR_ERROR_FAILURE,
    CLEAR_ERROR_SUCCESS,
    PASSWORD_EDIT_UPLOADING_SUCCESS,
    PASSWORD_EDIT_UPLOADING_REQUEST,
    PASSWORD_EDIT_UPLOADING_FAILURE,
} from "../types";
import { push } from "connected-react-router";
// Login

const loginUserAPI = loginData => {
    // console.log(loginData, "loginData");
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    return axios.post("api/auth", loginData, config);
};

function* loginUser(action) {
    try {
        const result = yield call(loginUserAPI, action.payload);
        // console.log(result);
        yield put({
            type: LOGIN_SUCCESS,
            payload: result.data,
        });
        yield put(push("/home"));
    } catch (e) {
        yield put({
            type: LOGIN_FAILURE,
            payload: e.response,
        });
    }
}

function* watchLoginUser() {
    yield takeEvery(LOGIN_REQUEST, loginUser);
}

// Logout

function* logout(action) {
    try {
        yield put({
            type: LOGOUT_SUCCESS,
        });
        yield put(push("/home"));
    } catch (e) {
        yield put({
            type: LOGOUT_FAILURE,
        });
        console.log(e);
    }
}

function* watchlogout() {
    yield takeEvery(LOGOUT_REQUEST, logout);
}

// User Loading

const userLoadingAPI = token => {
    // console.log(token, "token+++++");
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    if (token) {
        config.headers["x-auth-token"] = token;
    }
    return axios.get("api/auth/user", config);
};

function* userLoading(action) {
    try {
        // console.log(action, "userLoading");
        const result = yield call(userLoadingAPI, action.payload);
        // console.log(result);
        yield put({
            type: USER_LOADING_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: USER_LOADING_FAILURE,
            payload: e.response,
        });
    }
}

function* watchuserLoading() {
    yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

// REGISTER

const registerUserAPI = req => {
    console.log(req, "req");
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    return axios.post("api/user", req, config);
};

function* registerUser(action) {
    try {
        const result = yield call(registerUserAPI, action.payload);
        console.log(result, "RegisterUser Data");
        yield put({
            type: REGISTER_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: REGISTER_FAILURE,
            payload: e.response,
        });
    }
}
function* watchregisterUser() {
    yield takeEvery(REGISTER_REQUEST, registerUser);
}

// Clear Error

function* clearError() {
    try {
        yield put({
            type: CLEAR_ERROR_SUCCESS,
        });
    } catch (e) {
        yield put({
            type: CLEAR_ERROR_FAILURE,
        });
    }
}
function* watchclearError() {
    yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}
// Edit Password

const EditPasswordAPI = payload => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const token = payload.token;

    if (token) {
        config.headers["x-auth-token"] = token;
    }
    return axios.post(`/api/user/${payload.userName}/profile`, payload, config);
};

function* EditPassword(action) {
    try {
        console.log(action, "EditPassword");
        const result = yield call(EditPasswordAPI, action.payload);
        yield put({
            type: PASSWORD_EDIT_UPLOADING_SUCCESS,
            payload: result,
        });
        yield delay(3000);
        yield put(push("/"));
    } catch (e) {
        yield put({
            type: PASSWORD_EDIT_UPLOADING_FAILURE,
            payload: e.response,
        });
    }
}

function* watchEditPassword() {
    yield takeEvery(PASSWORD_EDIT_UPLOADING_REQUEST, EditPassword);
}

export default function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchlogout),
        fork(watchregisterUser),
        fork(watchclearError),
        fork(watchuserLoading),
        fork(watchEditPassword),
    ]);
}
