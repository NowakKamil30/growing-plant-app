/* eslint-disable @typescript-eslint/no-unused-vars */
import { Chart } from "@devexpress/dx-react-chart";
import { ChartInfo } from "../../interfaces/ChartInfo";
import { SnackbarInfo } from "../../interfaces/SnackbarInfo";
import { Weather } from "../../interfaces/Weather";
import { DeviceTypes, DEVICE_DOWNLOAD_WEATHER_DATA, DEVICE_DOWNLOAD_WEATHER_DATA_ERROR, DEVICE_DOWNLOAD_WEATHER_DATA_FETCHING } from "../types/DeviceTypes";

export interface DeviceReducerState {
    temperature: ChartInfo[];
    rain: ChartInfo[];
    insolation: ChartInfo[];
    weatherDownloadFailMessage: SnackbarInfo;
    isWeatherFeatching: boolean;
}

const INITIAL_STATE: DeviceReducerState = {
    temperature: [],
    rain: [],
    insolation: [],
    weatherDownloadFailMessage: { i18nKeyTitle: '', isShow: false, severity: undefined },
    isWeatherFeatching: false
};

export const DeviceReducer = (state: DeviceReducerState = INITIAL_STATE, action: DeviceTypes)
: DeviceReducerState => {
    switch (action.type) {

        case DEVICE_DOWNLOAD_WEATHER_DATA_FETCHING: {
            return { ...state, isWeatherFeatching: action.payload };
        }

        case DEVICE_DOWNLOAD_WEATHER_DATA_ERROR: {
            return { ...state, weatherDownloadFailMessage: action.payload };
        }

        case DEVICE_DOWNLOAD_WEATHER_DATA: {
            const temperature: ChartInfo[] = [];
            const insolation: ChartInfo[] = [];
            const rain: ChartInfo[] = [];
            action.payload.forEach((weather: Weather) => {
                temperature.push({ label: weather.localDateTime.slice(11), value: weather.temperature });
                insolation.push({ label: weather.localDateTime.slice(11), value: weather.insolation });
                rain.push({ label: weather.localDateTime.slice(11), value: weather.rain });
            });
            return { ...state, temperature, insolation, rain };
        }

        default: {
            return state;
        }
    }
};