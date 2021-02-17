import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import createRootReducer from "./redux/reducers/index";
import rootSaga from "./redux/sagas";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const initialState = {};

const middlewares = [sagaMiddleware, routerMiddleware(history)];
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancer =
    process.env.NODE_ENV === "production" ? compose : devtools || compose;

const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancer(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);

export default store;

{
    /*
ConnectedReactRouter: 리덕스에서 주소를 변경 및 확인하기 위해 history 객체를 관리하며 필요에 의해 꺼낼 쓸 수 있는 라이브러리.
단방향 흐름을 통해 리덕스에서 rotuer상태를 동기화 할 수 있다 (history객체 -> store -> router -> component)
redux-saga를 통해 히스토리 객체를 디스패치 할 수 있다.



*/
}
