/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { Trans } from 'react-i18next';
import { Backdrop, CircularProgress, createStyles, makeStyles, Theme, useTheme } from '@material-ui/core';
import { weatherDownload } from '../stores/api/DeviceOperations';
import { connect, ConnectedProps } from 'react-redux';
import { ReduceTypes } from '../stores/reducers';
import { SnackbarInfo } from '../interfaces/SnackbarInfo';
import { ThunkDispatch } from 'redux-thunk';
import { ChartInfo } from '../interfaces/ChartInfo';

import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import { useParams } from 'react-router-dom';
import Snackbar from '../components/snackbar/Snackbar';
import { DeviceTypes } from '../stores/types/DeviceTypes';
import { downloadWeatherDataError } from '../stores/actions/DeviceActions';
interface MapDispatcherToProps {
    weatherDataDownload: (
      deviceId: number,
      start: string,
      stop: string,
      token: string,
      successAction?: () => void,
      errorAction?: () => void
      ) => void;
      downloadWeatherDataMessage: (
          info: SnackbarInfo
      ) => void
}

interface  MapStateToProps {
    isWeatherFetching: boolean;
    temperature: ChartInfo[];
    insolation: ChartInfo[];
    rain: ChartInfo[];
    weatherError: SnackbarInfo;
    token: string;
}

const mapDispatcherToProps = (dispatch: ThunkDispatch<{}, {}, any>): MapDispatcherToProps => ({
    weatherDataDownload: async (
        deviceId: number,
        start: string,
        stop: string,
        token: string,
        successAction?: () => void,
        errorAction?: () => void
      ) => (
        await dispatch(weatherDownload(
          deviceId,
          start,
          stop,
          token,
          successAction,
          errorAction
        ))
      ),
      downloadWeatherDataMessage: (info: SnackbarInfo) => (
        downloadWeatherDataError(info)
      )
});

const mapStateToProps = (state: ReduceTypes): MapStateToProps => ({
    isWeatherFetching: state.device.isWeatherFeatching,
    temperature: state.device.temperature,
    insolation: state.device.insolation,
    rain: state.device.rain,
    weatherError: state.device.weatherDownloadFailMessage,
    token: state.auth.token,
});

const connector = connect(mapStateToProps, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const MyDevice: React.FC<PropsFromRedux> = ({
    weatherDataDownload,
    downloadWeatherDataMessage,
    isWeatherFetching,
    temperature,
    insolation,
    rain,
    weatherError,
    token,
}): JSX.Element => {
const params: {id: number | undefined} = useParams() as {id: number | undefined};
const theme = useTheme();
const { root, chartsBox, chartBox, backdrop } = useStyles();
charts(FusionCharts);
const chart = {
    caption: "temperature",
    numbersuffix: "°C",
    rotatelabels: "1",
    baseFontColor: theme.palette.primary.contrastText,
    baseFont: 'Helvetica Neue,Arial',
    captionFontSize: '20',
    subcaptionFontSize: '14',
    subcaptionFontBold: '0',
    showBorder: '0',
    showShadow: '0',
    canvasBorderAlpha: '0',
    useplotgradientcolor: '0',
    useRoundEdges: '0',
    showPlotBorder: '0',
    showAlternateHGridColor: '0',
    showAlternateVGridColor: '0',
    toolTipBorderThickness: '0',
    toolTipBorderRadius: '2',
    toolTipPadding: '5',
    showValue: '14',
    legendItemFontSize: '14',
    divlineThickness: '1',
    divLineIsDashed: '1',
    divLineDashLen: '1',
    divLineGapLen: '1',
    showHoverEffect: '1',
    valueFontSize: '0',
    showXAxisLine: '1',
    xAxisLineThickness: '1',
    xAxisLineColor: theme.palette.secondary.main,
    bgColor: theme.palette.background.paper,
    canvasBgColor:  theme.palette.background.paper,
    divlineColor: theme.palette.secondary.main,
    toolTipBgColor: theme.palette.secondary.main,
    toolTipBgAlpha: '90',
    legendBgAlpha: '100',
    theme: 'candy',
    bgAlpha: "100"
};
    useEffect(() => {
        if (params.id) {
            weatherDataDownload(params.id, '2021-01-09T00:00', '2021-01-10T00:00', token);
        }
    }, []);

    return (
        <div className={ root }>
            <h1><Trans i18nKey='pages.myDevices'/></h1> 
            <div className = { chartsBox }>
                <div className = { chartBox }>
                    <ReactFusioncharts
                        type="line"
                        width="90%"
                        height="50%"
                        dataFormat="JSON"
                        dataSource={{ chart: { ...chart, caption: 'temperature', numbersuffix: '°C'}, data: temperature }}
                    />
                </div>
                <div className = { chartBox }>
                    <ReactFusioncharts
                        type="line"
                        width="90%"
                        height="50%"
                        dataFormat="JSON"
                        dataSource={{ chart: { ...chart, caption: 'rain', numbersuffix: '%'}, data: rain }}
                    />
                </div>
                <div className = { chartBox }>
                    <ReactFusioncharts
                        type="line"
                        width="90%"
                        height="50%"
                        dataFormat="JSON"
                        dataSource={{ chart: { ...chart, caption: 'insolation', numbersuffix: '%'}, data: insolation }}
                    />
                </div>
            </div>
            <Backdrop open={ isWeatherFetching } className={ backdrop }>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={ weatherError.isShow }
                autoHideDuration={ 9000 }
                onClose={ () => downloadWeatherDataMessage({ ...weatherError, isShow: false }) }
                severity={ weatherError.severity }
                i18nKeyTitle={ weatherError.i18nKeyTitle }
            />
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    root: {
      flexDirection: 'column',
      flexGrow: 1,
      display: 'flex',
      marginLeft: 10,
      marginRight: 10
    },
    chartsBox: {
        flexGrow: 1,
        flexDirection: 'column',
        marginTop: 50,
        marginBottom: 30,
        justifyContent: 'centre',
        alignItems: 'centre'
    },
    chartBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.secondary.main,
      },
  }));
  
export default connector(MyDevice);