/// 실시간 정보

import {
    GET_MARKET_SUCCESS,
    GET_REAL_TIME_DATA_FAILURE,
    GET_REAL_TIME_DATA_REQUEST,
    GET_REAL_TIME_DATA_SUCCESS,
    GET_REALTIME_DATA,
    GET_REALTIME_DATA_SUCCESS,
    GET_REALTIME_DATA_ERROR,
    GET_MARKET_REQUEST,
    GET_MARKET_FAILURE,
    GET_MARKETCAP_REQUEST,
    GET_MARKETCAP_SUCCESS,
    GET_MARKETCAP_FAILURE,
} from "../types";

const initialState = {
    market: {
        isLoad: false,
        data: null,
        error: null,
    },
    realtimeData: {
        isLoad: false,
        data: null,
        error: null,
    },
    marketCap: {
        isLoad: false,
        data: null,
        error: null,
    },
};

// 로딩중 상태
const loadingState = {
    isLoad: true,
    data: null,
    error: null,
};

// 성공시 상태
const success = data => ({
    isLoad: false,
    data,
    error: null,
});

// 실패시 상태
const error = error => ({
    isLoad: false,
    data: null,
    error: error,
});
// 실시간 정보 저장
const saveRealtimeData = (realtimeData, data) => ({
    isLoad: false,
    data: (function () {
        if (realtimeData.data) {
            if (!realtimeData.data.map(list => list.code).includes(data.code)) {
                return realtimeData.data.concat(data);
            } else {
                return realtimeData.data
                    .filter(list => list.code !== data.code)
                    .concat(data);
            }
        } else {
            const tempArr = [];
            realtimeData.data = tempArr.concat(data);
            return realtimeData.data;
        }
    })(),
    error: null,
});

const realtimeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MARKET_SUCCESS:
            return {
                ...state,
                market: action.data,
            };
        case GET_REALTIME_DATA:
            return {
                ...state,
                realtimeData: loadingState,
            };
        case GET_REALTIME_DATA_SUCCESS:
            return {
                ...state,
                realtimeData: saveRealtimeData(state.realtimeData, action.data),
            };
        case GET_REALTIME_DATA_ERROR:
            return {
                ...state,
                realtimeData: error(action.error),
            };
        case GET_MARKETCAP_REQUEST:
            return {
                ...state,
                marketCap: loadingState,
            };
        case GET_MARKETCAP_SUCCESS:
            return {
                ...state,
                marketCap: {
                    isLoad: false,
                    data: action.data,
                    error: null,
                },
            };
        case GET_MARKETCAP_FAILURE:
            return {
                ...state,
                marketCap: error,
            };
        default:
            return state;
    }
};

export default realtimeReducer;
