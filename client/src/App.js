import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";
import MyRouter from "./routes/Router";

const App = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <MyRouter />
            </ConnectedRouter>
        </Provider>
    );
};

export default App;
