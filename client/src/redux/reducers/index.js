import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import commentReducer from "./CommentReducer";
import realtimeReducer from "./realtimeReducer";

const createRootReducer = history =>
    combineReducers({
        router: connectRouter(history),
        auth: authReducer,
        post: postReducer,
        comment: commentReducer,
        data: realtimeReducer,
    });

export default createRootReducer;
