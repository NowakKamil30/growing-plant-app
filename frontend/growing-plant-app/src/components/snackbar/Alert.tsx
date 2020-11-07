/* eslint-disable @typescript-eslint/no-unused-vars */
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React from 'react';

const Alert: React.FC<AlertProps> = (props): JSX.Element => {

    return (
        <MuiAlert elevation={6} variant='filled' {...props}/>
    );
};

export default Alert;