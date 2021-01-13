/* eslint-disable @typescript-eslint/no-unused-vars */
import Axios from "axios";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { User } from "../../interfaces/User";
import { settings } from '../../settings/settings.json';
import { downloadUserData, downloadUserDataError, downloadUserDataFetching } from "../actions/UserActions";

const getUserDataSend = async (id: number, token: string): Promise<User> => {
    const { basicUrl, getUserData } = settings.url;
    let config = {
        headers: {
            Authorization: `Bearer ${token ? token : localStorage.getItem('token')}`,
        }
      }
    const response = await Axios.get(basicUrl + getUserData +`/${id && id !== -1 ? id : localStorage.getItem('userId')}`, config);
    return response.data as User;
}

export const getUserData = (
    id: number,
    token: string,
    successAction?: () => void,
    errorAction?: () => void): ThunkAction<void, {}, {}, AnyAction> => (
        async dispatch => {
            dispatch(downloadUserDataFetching(true));
            try {
                const user: User = await getUserDataSend(id, token);
                if (user) {
                    dispatch(downloadUserData(user));
                    successAction && successAction();
                } else {
                    errorAction && errorAction();
                }
            } catch(e) {
                console.log((e as Error).message);
                dispatch(downloadUserDataError({
                    i18nKeyTitle: 'errors.activeAccount',
                    isShow: true,
                    severity: 'error'
                }));
                errorAction && errorAction();
            } finally {
                dispatch(downloadUserDataFetching(false));
            }
        }
    );