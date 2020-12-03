import React from 'react';
import AddDeviceDialog from './AddDeviceDialog';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import ResetPasswordDialog from './ResetPasswordDialog';
import SuccessRegisterDialog from './SuccessRegisterDialog';
import SuccessResetPassword from './SuccessResetPassword';

const DialogManager = (): JSX.Element => {

    return (
        <>
            <LoginDialog/>
            <RegisterDialog/>
            <AddDeviceDialog/>
            <SuccessRegisterDialog/>
            <ResetPasswordDialog/>
            <SuccessResetPassword/>
        </>
    );
};

export default DialogManager;