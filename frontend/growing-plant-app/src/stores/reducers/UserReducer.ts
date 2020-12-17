/* eslint-disable @typescript-eslint/no-unused-vars */
import { SnackbarInfo } from "../../interfaces/SnackbarInfo";
import { User } from "../../interfaces/User";
import { UserTypes, USER_DOWNOLAD_DATA, USER_DOWNOLAD_DATA_ERROR, USER_DOWNOLAD_DATA_FETCHING } from "../types/UserTypes";

export interface UserState {
    user?: User,
    userIsFetching: boolean;
    userError: SnackbarInfo;
}

const INITIAL_STATE: UserState = {
    user: undefined,
    userIsFetching: false,
    userError: { i18nKeyTitle: '', isShow: false, severity: undefined }
};

export const UserReducer = (state: UserState = INITIAL_STATE, action: UserTypes)
: UserState => {
    switch (action.type) {
        case USER_DOWNOLAD_DATA: {
            return { ...state, user: action.payload };    
        }

        case USER_DOWNOLAD_DATA_FETCHING: {
            return { ...state, userIsFetching: action.payload };
        }

        case USER_DOWNOLAD_DATA_ERROR: {
            return { ...state, userError: action.payload };
        }

        default: {
            return state;
        }
    }
};