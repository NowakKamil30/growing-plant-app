import React from 'react';
import AddDeviceDialog from './AddDeviceDialog';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import SuccessRegisterDialog from './SuccessRegisterDialog';

const DialogManager = (): JSX.Element => {

    return (
        <>
            <LoginDialog/>
            <RegisterDialog/>
            <AddDeviceDialog/>
            <SuccessRegisterDialog/>
        </>
    );
};

export default DialogManager;