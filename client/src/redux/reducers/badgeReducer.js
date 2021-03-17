import {
    BADGE_UPLOADING_FAILURE,
    BADGE_UPLOADING_REQUEST,
    BADGE_UPLOADING_SUCCESS,
} from "../types";

const initialState = {
    count: 0,
};

const badgeReducer = (state = initialState, action) => {
    switch (action.type) {
        case BADGE_UPLOADING_REQUEST:
            return {
                count: 0,
            };
        case BADGE_UPLOADING_SUCCESS:
            return {
                count: action.payload,
            };
        case BADGE_UPLOADING_FAILURE:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default badgeReducer;
