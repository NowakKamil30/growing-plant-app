import React from 'react';
import AddDeviceDialog from './AddDeviceDialog';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';

const DialogManager = (): JSX.Element => {

    return (
        <>
            <LoginDialog/>
            <RegisterDialog/>
            <AddDeviceDialog/>
        </>
    );
};

export default DialogManager;