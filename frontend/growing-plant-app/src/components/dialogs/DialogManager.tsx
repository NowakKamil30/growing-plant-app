import React from 'react';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';

const DialogManager = (): JSX.Element => {

    return (
        <>
            <LoginDialog/>
            <RegisterDialog/>
        </>
    );
};

export default DialogManager;