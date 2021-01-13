/* eslint-disable @typescript-eslint/no-unused-vars */
import { CircularProgress, createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Trans } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import DeviceList from '../components/deviceList/DeviceList';
import Snackbar from '../components/snackbar/Snackbar';
import UserCard from '../components/UserCard';
import { SnackbarInfo } from '../interfaces/SnackbarInfo';
import { User } from '../interfaces/User';
import { downloadUserDataError } from '../stores/actions/UserActions';
import { getUserData } from '../stores/api/UserOperations';
import { ReduceTypes } from '../stores/reducers';
import { UserTypes } from '../stores/types/UserTypes';
interface FormData {
    passwordChange: string;
    confirmPasswordChange: string;
}

interface MapDispatcherToProps {
    downloadUserData: (
      id: number,
      token: string,
      successAction?: () => void,
      errorAction?: () => void
      ) => void;
      dowlonadUserDataMessage: (message: SnackbarInfo) => UserTypes;
}

interface  MapStateToProps {
    user?: User;
    userIsFetching: boolean;
    userError: SnackbarInfo;
    token: string;
    id: number;
}

const mapDispatcherToProps = (dispatch: ThunkDispatch<{}, {}, any>): MapDispatcherToProps => ({
    downloadUserData: async (
      id: number,
      token: string,
      successAction?: () => void,
      errorAction?: () => void
      ) => (
        await dispatch(getUserData(
          id,
          token,
          successAction,
          errorAction
        ))
      ),
      dowlonadUserDataMessage: (error: SnackbarInfo) => (
        dispatch(downloadUserDataError(error))
      )
});

const mapStateToProps = (state: ReduceTypes): MapStateToProps => ({
    user: state.user.user,
    userIsFetching: state.user.userIsFetching,
    userError: state.user.userError,
    token: state.auth.token,
    id: state.auth.userId
});

const connector = connect(mapStateToProps, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const MyAccount: React.FC<PropsFromRedux> = ({
    user,
    userIsFetching,
    userError,
    token,
    id,
    downloadUserData,
    dowlonadUserDataMessage
}) => {
    const { root, data, title, dataItem } = useStyles();
    useEffect(() => {
        downloadUserData(id, token);
    }, []);
    return (
        <>
            { userIsFetching? <CircularProgress color="secondary" /> : (
                <div className={ root }>
                    <h1 className={ title }><Trans i18nKey='pages.myAccount'/></h1>
                    <div className={ data }>
                        <div className={ dataItem }>
                            <UserCard 
                            user={ user }
                            i18nTitle='pages.myAccount'
                            />
                        </div>
                        <div  className={ dataItem }>
                            {user?.devices.length && user?.devices.length > 0? (
                                <DeviceList
                                devices={ user?.devices }
                                />
                            ) : <p><Trans i18nKey='account.noDevices'/></p>}
                        </div>
                    </div>
                </div>
            )}
            <Snackbar
                open={ userError.isShow }
                autoHideDuration={ 9000 }
                onClose={ () => dowlonadUserDataMessage({ ...userError, isShow: false }) }
                severity={ userError.severity }
                i18nKeyTitle={ userError.i18nKeyTitle }
            />
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
     justifyContent: 'start',
     flexGrow: 1
    },
    title: {
        marginBottom: 70
    },
    data: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'space-around',
        flexDirection: 'row',
        flexGrow: 1
    },
    dataItem: {
        marginRight: 50,
        marginLeft: 50
    }
  }),
);

export default connector(MyAccount);
