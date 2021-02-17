import { w3cwebsocket as W3CWebSocket } from "websocket";
import { call, put, select, flush, delay } from "redux-saga/effects";
import { buffers, eventChannel, END } from "redux-saga";
import e from "cors";
// 소켓 만들기
const createSocket = () => {
    const client = new W3CWebSocket("wss://api.upbit.com/websocket/v1");
    client.binaryType = "arraybuffer";

    return client;
};

// 소켓 연결용
const connectSocekt = (socket, connectType, action, buffer) => {
    return eventChannel(emit => {
        socket.onopen = () => {
            socket.send(
                JSON.stringify([
                    { ticket: "upbit" },
                    { type: connectType, codes: action.payload },
                ])
            );
        };

        socket.onmessage = evt => {
            const enc = new encoding.TextDecoder("utf-8");
            // const arr = new Uint8Array(evt.data);
            const data = JSON.parse(enc.decode(evt.data));

            emit(data);
        };

        socket.onerror = evt => {
            emit(evt);
            emit(END);
        };

        const unsubscribe = () => {
            socket.close();
        };

        return unsubscribe;
    }, buffer || buffers.none());
};

// 웹소켓 연결용 사가
const createConnectSocketSaga = (type, connectType, dataMaker) => {
    const SUCCESS = `${type}_SUCCESS`;
    const ERROR = `${type}_ERROR`;

    return function* (action = {}) {
        const client = yield call(createSocket);
        const clientChannel = yield call(
            connectSocekt,
            client,
            connectType,
            action,
            buffers.expanding(500)
        );

        try {
            while (true) {
                const datas = yield flush(clientChannel); // 버퍼 데이터 가져오기
                const state = yield select();

                if (datas.length) {
                    const sortedObj = {};
                    datas.forEach(data => {
                        if (sortedObj[data.code]) {
                            // 버퍼에 있는 데이터중 시간이 가장 최근인 데이터만 남김
                            sortedObj[data.code] =
                                sortedObj[data.code].timestamp > data.timestamp
                                    ? sortedObj[data.code]
                                    : data;
                        } else {
                            sortedObj[data.code] = data; // 새로운 데이터면 그냥 넣음
                        }
                    });

                    const sortedData = Object.keys(sortedObj).map(
                        data => sortedObj[data]
                    );

                    yield put({
                        type: SUCCESS,
                        payload: dataMaker(sortedData, state),
                    });
                }
                yield delay(500); // 500ms 동안 대기
            }
        } catch (e) {
            yield put({ type: ERROR, payload: e });
        } finally {
            clientChannel.close(); // emit(END) 접근시 소켓 닫기
        }
    };
};

const connectSocekt = (ws, marketList, buffer) => {
    return eventChannel(emit => {
        ws.onopen = () => {
            ws.send(
                JSON.stringify(
                    `[{"ticket":"test"},{"type":"ticker","codes": ${JSON.stringify(
                        marketList
                    )}}]`
                )
            );
        };

        ws.onmessage = evt => {
            // console.log(evt);
            const enc = new encoding.TextDecoder("utf-8");
            const data = JSON.parse(enc.decode(evt.data));
            console.log(data);
            // emit(data);
        };

        ws.onerror = evt => {
            emit(evt);
            emit(END);
        };

        const unsubscribe = () => {
            ws.close();
        };

        return unsubscribe;
    }, buffer || buffers.none());
};
