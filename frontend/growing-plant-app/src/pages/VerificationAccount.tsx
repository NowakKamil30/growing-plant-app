/* eslint-disable @typescript-eslint/no-unused-vars */
import { Backdrop, Box, CircularProgress, createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Trans } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import Snackbar from '../components/snackbar/Snackbar';
import { SnackbarInfo } from '../interfaces/SnackbarInfo';
import { activeAccountMessage } from '../stores/actions/AuthActions';
import { activeAccount } from '../stores/api/AuthOperations';
import { ReduceTypes } from '../stores/reducers';
import { AuthTypes } from '../stores/types/AuthTypes';

interface MapDispatcherToProps {
    activeAccount: (
      token: string,
      successAction?: () => void,
      errorAction?: () => void
      ) => void;
      changeActiveAccountMessage: (message: SnackbarInfo) => AuthTypes;
}

interface  MapStateToProps {
    isActiveAccountFetching: boolean;
    activeAccountMessage: SnackbarInfo;
    activeAccountSuccess: boolean;
}

const mapDispatcherToProps = (dispatch: ThunkDispatch<{}, {}, any>): MapDispatcherToProps => ({
    activeAccount: async (
      token: string,
      successAction?: () => void,
      errorAction?: () => void
      ) => (
        await dispatch(activeAccount(
            token,
          successAction,
          errorAction
        ))
      ),
      changeActiveAccountMessage: (error: SnackbarInfo) => (
        dispatch(activeAccountMessage(error))
      ),
});

const mapStateToProps = (state: ReduceTypes): MapStateToProps => ({
    isActiveAccountFetching: state.auth.isActiveAccountFetching,
    activeAccountMessage: state.auth.activeAccountMessage,
    activeAccountSuccess: state.auth.activeAccountSuccess
});

const connector = connect(mapStateToProps, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const VerificationAccount: React.FC<PropsFromRedux> = ({
    isActiveAccountFetching,
    activeAccountMessage,
    activeAccountSuccess,
    changeActiveAccountMessage,
    activeAccount
}): JSX.Element => {
    const { backdrop } = useStyles();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token: string = queryParams.get('token') || '';
        activeAccount(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Box component='h1'>
                <Trans i18nKey={isActiveAccountFetching ? '' : activeAccountSuccess ? 'successes.activeAccount' : 'errors.activeAccount' }></Trans>
            </Box>
            <Backdrop className={ backdrop } open={ isActiveAccountFetching }>
                <CircularProgress color='secondary' />
            </Backdrop>
            <Snackbar
            open={ activeAccountMessage.isShow }
            autoHideDuration={ 9000 }
            onClose={ () => changeActiveAccountMessage({ ...activeAccountMessage, isShow: false }) }
            severity={ activeAccountMessage.severity }
            i18nKeyTitle={ activeAccountMessage.i18nKeyTitle }
            />
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
    },
  }),
);

export default connector(VerificationAccount);