/* eslint-disable @typescript-eslint/no-unused-vars */
import { SnackbarInfo } from '../../interfaces/SnackbarInfo';
import { Weather } from '../../interfaces/Weather';

export const DEVICE_DOWNLOAD_WEATHER_DATA = 'DEVICE_DEVICE_DOWNLOAD_WEATHER_DATA';
export const DEVICE_DOWNLOAD_WEATHER_DATA_FETCHING = 'DEVICE_DEVICE_DOWNLOAD_WEATHER_DATA_FETCHING';
export const DEVICE_DOWNLOAD_WEATHER_DATA_ERROR = 'DEVICE_DEVICE_DOWNLOAD_WEATHER_DATA_ERROR';

interface DownloadWeatherDataAction {
    type: typeof DEVICE_DOWNLOAD_WEATHER_DATA;
    payload: Weather[];
}

interface DownloadWeatherDataFetchingAction {
    type: typeof DEVICE_DOWNLOAD_WEATHER_DATA_FETCHING;
    payload: boolean;
}

interface DownloadWeatherDataErrorAction {
    type: typeof DEVICE_DOWNLOAD_WEATHER_DATA_ERROR;
    payload: SnackbarInfo;
}

export type DeviceTypes = DownloadWeatherDataAction |
                        DownloadWeatherDataFetchingAction |
                        DownloadWeatherDataErrorAction;
                        