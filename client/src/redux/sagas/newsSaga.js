import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
    NEWS_DELETE_FAILURE,
    NEWS_DELETE_REQUEST,
    NEWS_DELETE_SUCCESS,
    NEWS_DETAIL_LOADING_FAILURE,
    NEWS_DETAIL_LOADING_REQUEST,
    NEWS_DETAIL_LOADING_SUCCESS,
    NEWS_EDIT_LOADING_FAILURE,
    NEWS_EDIT_LOADING_REQUEST,
    NEWS_EDIT_LOADING_SUCCESS,
    NEWS_EDIT_UPLOADING_FAILURE,
    NEWS_EDIT_UPLOADING_REQUEST,
    NEWS_EDIT_UPLOADING_SUCCESS,
    NEWS_LOADING_FAILURE,
    NEWS_LOADING_REQUEST,
    NEWS_LOADING_SUCCESS,
    NEWS_UPLOADING_FAILURE,
    NEWS_UPLOADING_REQUEST,
    NEWS_UPLOADING_SUCCESS,
    NEWS_WRITE_FAILURE,
    NEWS_WRITE_REQUEST,
    NEWS_WRITE_SUCCESS,
} from "../types";
import axios from "axios";

// All News load
const loadNewsAPI = () => {
    return axios.get("/api/news");
};

function* loadNews() {
    try {
        const result = yield call(loadNewsAPI);
        yield put({
            type: NEWS_LOADING_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: NEWS_LOADING_FAILURE,
            payload: e,
        });
        yield push("/news");
    }
}

function* watchLoadNews() {
    yield takeEvery(NEWS_LOADING_REQUEST, loadNews);
}

// News Upload

const uploadNewsAPI = payload => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const token = payload.token;
    if (token) {
        config.headers["x-auth-token"] = token;
    }
    return axios.post("/api/news", payload, config);
};

function* uploadNews(action) {
    try {
        const result = yield call(uploadNewsAPI, action.payload);
        yield put({
            type: NEWS_UPLOADING_SUCCESS,
            payload: result.data,
        });
        yield put(push("/"));
        yield put(push("/news"));
    } catch (e) {
        yield put({
            type: NEWS_UPLOADING_FAILURE,
            payload: e,
        });
        yield put(push("/news"));
    }
}

function* watchuploadNews() {
    yield takeEvery(NEWS_UPLOADING_REQUEST, uploadNews);
}

// News Detail

const loadNewsDetailAPI = payload => {
    return axios.get(`/api/news/${payload}`);
};
function* loadNewsDetail(action) {
    try {
        const result = yield call(loadNewsDetailAPI, action.payload);
        yield put({
            type: NEWS_DETAIL_LOADING_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: NEWS_DETAIL_LOADING_FAILURE,
            payload: e,
        });
        yield put(push("/"));
    }
}
function* watchloadNewsDetail() {
    yield takeEvery(NEWS_DETAIL_LOADING_REQUEST, loadNewsDetail);
}

// News Delete
const DeleteNewsAPI = payload => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const token = payload.token;
    if (token) {
        config.headers["x-auth-token"] = token;
    }
    return axios.delete(`/api/news/${payload.id}`, config);
};

function* DeleteNews(action) {
    try {
        const result = yield call(DeleteNewsAPI, action.payload);
        yield put({
            type: NEWS_DELETE_SUCCESS,
            payload: result.data,
        });
        yield put(push("/"));
        yield put(push("/news"));
    } catch (e) {
        yield put({
            type: NEWS_DELETE_FAILURE,
            payload: e,
        });
    }
}

function* watchDeleteNews() {
    yield takeEvery(NEWS_DELETE_REQUEST, DeleteNews);
}
// News Edit Load
const NewsEditLoadAPI = payload => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const token = payload.token;

    if (token) {
        config.headers["x-auth-token"] = token;
    }

    return axios.get(`/api/news/${payload.id}/edit`, config);
};

function* NewsEditLoad(action) {
    try {
        const result = yield call(NewsEditLoadAPI, action.payload);
        yield put({
            type: NEWS_EDIT_LOADING_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: NEWS_EDIT_LOADING_FAILURE,
            payload: e,
        });
        yield put(push("/news"));
    }
}

function* watchNewsEditLoad() {
    yield takeEvery(NEWS_EDIT_LOADING_REQUEST, NewsEditLoad);
}

// News Edit UpLoad
const NewsEditUploadAPI = payload => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const token = payload.token;

    if (token) {
        config.headers["x-auth-token"] = token;
    }

    return axios.post(`/api/news/${payload.id}/edit`, payload, config);
};

function* NewsEditUpload(action) {
    try {
        const result = yield call(NewsEditUploadAPI, action.payload);
        yield put({
            type: NEWS_EDIT_UPLOADING_SUCCESS,
            payload: result.data,
        });
        yield put(push("/news"));
        // yield put(push(`/post/${result.data._id}`));
    } catch (e) {
        yield put({
            type: NEWS_EDIT_UPLOADING_FAILURE,
            payload: e,
        });
    }
}

function* watchNewsEditUpload() {
    yield takeEvery(NEWS_EDIT_UPLOADING_REQUEST, NewsEditUpload);
}

export default function* newsSaga() {
    yield all([
        fork(watchLoadNews),
        fork(watchuploadNews),
        fork(watchloadNewsDetail),
        fork(watchDeleteNews),
        fork(watchNewsEditLoad),
        fork(watchNewsEditUpload),
    ]);
}
