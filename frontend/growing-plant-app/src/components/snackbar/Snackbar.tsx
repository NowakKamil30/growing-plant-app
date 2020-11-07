import React from 'react';
import { Trans } from 'react-i18next';
import Alert from './Alert';
import { Snackbar as Snack } from '@material-ui/core';

interface SnackbarProps {
    severity: 'success' | 'info' | 'warning' | 'error' | undefined;
    open: boolean;
    autoHideDuration?: number;
    onClose: () => void;
    i18nKeyTitle: string;
}

const Snackbar: React.FC<SnackbarProps> = ({
severity,
open,
autoHideDuration,
onClose,
i18nKeyTitle
}): JSX.Element => {

    return (
        <Snack
        open={ open }
        autoHideDuration={ autoHideDuration || 10_000 }
        onClose={ onClose }
        >
          <Alert
          severity={ severity }
          onClose={ onClose }
          >
            <Trans i18nKey={ i18nKeyTitle } />
          </Alert>
        </Snack>
    );
};


export default Snackbar;

