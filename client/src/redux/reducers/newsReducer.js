import {
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
    NEWS_WRITE_FAILURE,
    NEWS_WRITE_REQUEST,
    NEWS_WRITE_SUCCESS,
} from "../types";

const initialState = {
    isAuthenticated: null,
    news: [],
    newsDetail: "",
    newsCount: "",
    loading: false,
    error: "",
    creatorId: "",
    title: "",
};

export default function news(state = initialState, action) {
    switch (action.type) {
        case NEWS_LOADING_REQUEST:
            return {
                ...state,
                news: [],
                loading: true,
            };
        case NEWS_LOADING_SUCCESS:
            return {
                ...state,
                news: [...state.news, ...action.payload.newsFindeResult],
                newsCount: action.payload.newsCount,
                loading: false,
            };
        case NEWS_LOADING_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case NEWS_WRITE_REQUEST:
            return {
                ...state,
                news: [],
                loading: true,
            };
        case NEWS_WRITE_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case NEWS_WRITE_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case NEWS_DETAIL_LOADING_REQUEST:
            return {
                ...state,
                news: [],
                loading: true,
            };
        case NEWS_DETAIL_LOADING_SUCCESS:
            return {
                ...state,
                newsDetail: action.payload,
                creatorId: action.payload.creator._id,
                title: action.payload.title,
                loading: false,
            };
        case NEWS_DETAIL_LOADING_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case NEWS_EDIT_LOADING_REQUEST:
            return {
                ...state,
                news: [],
                loading: true,
            };
        case NEWS_EDIT_LOADING_SUCCESS:
            return {
                ...state,
                newsDetail: action.payload,

                loading: false,
            };
        case NEWS_EDIT_LOADING_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case NEWS_EDIT_UPLOADING_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEWS_EDIT_UPLOADING_SUCCESS:
            return {
                ...state,
                news: action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case NEWS_EDIT_UPLOADING_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}
