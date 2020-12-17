/* eslint-disable @typescript-eslint/no-unused-vars */
import { SnackbarInfo } from "../../interfaces/SnackbarInfo";
import { User } from "../../interfaces/User";

export const USER_DOWNOLAD_DATA = 'USER_USER_DOWNLOAD_DATA';
export const USER_DOWNOLAD_DATA_FETCHING = 'USER_USER_DOWNLOAD_DATA_FETCHING';
export const USER_DOWNOLAD_DATA_ERROR = 'USER_USER_DOWNLOAD_DATA_ERROR';

interface DownloadUserDataAction {
    type: typeof USER_DOWNOLAD_DATA;
    payload: User;
}

interface DownloadUserDataFetchingAction {
    type: typeof USER_DOWNOLAD_DATA_FETCHING;
    payload: boolean;
}

interface DownloadUserDataErrorAction {
    type: typeof USER_DOWNOLAD_DATA_ERROR;
    payload: SnackbarInfo;
}

export type UserTypes = DownloadUserDataAction |
                        DownloadUserDataFetchingAction |
                        DownloadUserDataErrorAction;
                        