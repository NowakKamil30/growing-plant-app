/* eslint-disable @typescript-eslint/no-unused-vars */
import { Weather } from '../../interfaces/Weather';
import { settings } from '../../settings/settings.json';
import Axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { downloadWeatherData, downloadWeatherDataError, downloadWeatherDataFetching } from '../actions/DeviceActions';

const weatherDownloadSend = async (deviceId: number, startData: string, endData: string, token: string): Promise<Weather[]> => {
    const { basicUrl, getWeatherData } = settings.url;
    let config = {
        headers: {
            Authorization: `Bearer ${token ? token : localStorage.getItem('token')}`,
        }
      }
    const response = await Axios.get(`${basicUrl}${getWeatherData}/${deviceId}?start=${startData}&stop=${endData}`, config);
    return response.data as Weather[];
};

export const  weatherDownload = (
    deviceId: number,
    startDate: string,
    endDate: string,
    token: string,
    successAction?: () => void,
    errorAction?: () => void
    ): ThunkAction<void, {}, {}, AnyAction> => (
    async dispatch => {
        dispatch(downloadWeatherDataFetching(true));
        try {
            const weathers = await weatherDownloadSend(deviceId, startDate, endDate, token);
            dispatch(downloadWeatherData(weathers));
            successAction && successAction();
        } catch (e) {
            console.log((e as Error).message);
            dispatch(downloadWeatherDataError({
                i18nKeyTitle: 'errors.loginDefault',
                isShow: true,
                severity: 'error'
            }));
            errorAction && errorAction();
        } finally {
            dispatch(downloadWeatherDataFetching(false));
        }
    }
);