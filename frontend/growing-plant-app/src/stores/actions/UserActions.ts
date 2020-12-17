/* eslint-disable @typescript-eslint/no-unused-vars */
import { SnackbarInfo } from "../../interfaces/SnackbarInfo";
import { User } from "../../interfaces/User";
import { UserTypes, USER_DOWNOLAD_DATA, USER_DOWNOLAD_DATA_ERROR, USER_DOWNOLAD_DATA_FETCHING } from "../types/UserTypes"

export const downloadUserData = (user: User): UserTypes => ({
    type: USER_DOWNOLAD_DATA,
    payload: user
});

export const downloadUserDataFetching = (isFetching: boolean): UserTypes =>({
    type: USER_DOWNOLAD_DATA_FETCHING,
    payload: isFetching
});

export const downloadUserDataError = (error: SnackbarInfo): UserTypes =>({
    type: USER_DOWNOLAD_DATA_ERROR,
    payload: error
});
