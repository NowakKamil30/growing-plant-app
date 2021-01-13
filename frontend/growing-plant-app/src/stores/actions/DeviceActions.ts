/* eslint-disable @typescript-eslint/no-unused-vars */
import { SnackbarInfo } from '../../interfaces/SnackbarInfo';
import { Weather } from '../../interfaces/Weather';
import { DeviceTypes, DEVICE_DOWNLOAD_WEATHER_DATA, DEVICE_DOWNLOAD_WEATHER_DATA_ERROR, DEVICE_DOWNLOAD_WEATHER_DATA_FETCHING } from '../types/DeviceTypes';


export const downloadWeatherData = (weathers: Weather[]): DeviceTypes => ({
    type: DEVICE_DOWNLOAD_WEATHER_DATA,
    payload: weathers
});

export const downloadWeatherDataFetching = (isFetching: boolean): DeviceTypes =>({
    type: DEVICE_DOWNLOAD_WEATHER_DATA_FETCHING,
    payload: isFetching
});

export const downloadWeatherDataError = (info: SnackbarInfo) => ({
    type: DEVICE_DOWNLOAD_WEATHER_DATA_ERROR,
    payload: info
})