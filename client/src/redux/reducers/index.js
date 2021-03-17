import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import commentReducer from "./CommentReducer";
import newsReducer from "./newsReducer";
import badgeReducer from "./badgeReducer";

const createRootReducer = history =>
    combineReducers({
        router: connectRouter(history),
        auth: authReducer,
        post: postReducer,
        comment: commentReducer,
        news: newsReducer,
        badge: badgeReducer,
    });

export default createRootReducer;
