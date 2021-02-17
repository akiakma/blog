import axios from "axios";
import {
    all,
    call,
    fork,
    put,
    takeEvery,
    select,
    flush,
    delay,
    take,
} from "redux-saga/effects";
import { buffers, eventChannel, END } from "redux-saga";
import { push } from "connected-react-router";
import {
    GET_MARKET_SUCCESS,
    GET_REAL_TIME_DATA_FAILURE,
    GET_REAL_TIME_DATA_REQUEST,
    GET_REAL_TIME_DATA_SUCCESS,
    GET_REALTIME_DATA_SUCCESS,
    GET_REALTIME_DATA_ERROR,
    GET_REALTIME_DATA,
    GET_MARKETCAP_SUCCESS,
} from "../types";
const realTimeApi = () => {
    return axios.get("https://api.upbit.com/v1/market/all");
};
const connectSocekt = (ws, marketList) => {
    return eventChannel(emit => {
        ws.onopen = () => {
            ws.send(
                `[{"ticket":"test"},{"type":"ticker","codes": ${JSON.stringify(
                    marketList
                )}}]`
            );
        };

        ws.onmessage = async evt => {
            const { data } = evt;
            const text = await new Response(data).text();
            const information = JSON.parse(text);
            // console.log(information);
            emit(information);
        };

        ws.onerror = evt => {
            emit(evt);
            emit(END);
        };

        const unsubscribe = () => {
            ws.close();
        };

        return unsubscribe;
    }, buffers.expanding(500) || buffers.none());
};

// function* realTime() {
//     try {
//         const result = yield call(realTimeApi);
//         const ws = new WebSocket("wss://api.upbit.com/websocket/v1");
//         const marketList = result.data
//             .filter(list => list.market.includes("KRW-"))
//             .map(list => list.market);
//         const api = yield call(connectSocekt, ws, marketList);
//         yield put({
//             type: GET_MARKET_SUCCESS,
//             data: result.data,
//         });
//         while (true) {
//             const datas = yield flush(api);
//             if (datas.length) {
//                 const sortedObj = {};
//                 datas.forEach(data => {
//                     if (sortedObj[data.code]) {
//                         // 버퍼에 있는 데이터중 시간이 가장 최근인 데이터만 남김
//                         sortedObj[data.code] =
//                             sortedObj[data.code].timestamp > data.timestamp
//                                 ? sortedObj[data.code]
//                                 : data;
//                     } else {
//                         sortedObj[data.code] = data; // 새로운 데이터면 그냥 넣음
//                     }
//                 });

//                 const sortedData = Object.keys(sortedObj).map(
//                     data => sortedObj[data]
//                 );
//                 yield put({
//                     type: GET_REAL_TIME_DATA_SUCCESS,
//                     data: sortedData,
//                 });
//                 // console.log(sortedData);
//             }
//             yield delay(500); // 500ms 동안 대기
//         }
//     } catch (e) {
//         console.log(e);
//     }
// }
export async function getMarket(dispatch) {
    try {
        // 마켓 가져오기 중
        const response = await axios.get("https://api.upbit.com/v1/market/all");
        dispatch({
            type: "GET_MARKET_SUCCESS",
            data: response.data,
        });

        // 마켓 리스트를 추출하여 웹소켓 실행
        const marketList = response.data
            .filter(list => list.market.includes("KRW-"))
            .map(list => list.market);
        const ws = new WebSocket("wss://api.upbit.com/websocket/v1");
        ws.onopen = () => {
            // 웹소켓 연결
            dispatch({
                type: "GET_REALTIME_DATA",
            });
            ws.send(
                `[{"ticket":"test"},{"type":"ticker","codes": ${JSON.stringify(
                    marketList
                )}}]`
            );
        };
        ws.onmessage = async e => {
            // 실시간 데이터 수신
            const { data } = e;
            const text = await new Response(data).text();

            // console.log(JSON.parse(text));
            dispatch({
                type: "GET_REALTIME_DATA_SUCCESS",
                data: JSON.parse(text),
            });
        };
        ws.onerror = e => {
            // 실시간 데이터 수신 에러
            dispatch({
                type: "GET_REALTIME_DATA_ERROR",
                error: e,
            });
        };
    } catch (e) {
        // 마켓 가져오기 실패
        dispatch({
            type: "GET_MARKET_ERROR",
            error: e,
        });
    }
}

export async function coinMarketCap(dispatch) {
    try {
        const response = await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=7d,30d,1y"
            // "https://crix-api-cdn.upbit.com/v1/crix/marketcap?currency=KRW"
        );
        console.log(response);
        dispatch({
            type: GET_MARKETCAP_SUCCESS,
            data: response.data,
        });
    } catch (e) {
        console.log(e);
    }
}

// function* watchRealtimeData() {
//     yield takeEvery(GET_REAL_TIME_DATA_REQUEST, realTime);
// }
// //----------------------------------

// export default function* realtimeSaga() {
//     yield all([fork(watchRealtimeData)]);
// }
