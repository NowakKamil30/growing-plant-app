import { Button, CircularProgress } from '@material-ui/core';
import React from 'react';
import { Trans } from 'react-i18next';

interface ApiHandlerButtonProps {
    disabled: boolean;
    isFetching: boolean;
    type: 'submit' | 'button';
    color: 'inherit' | 'primary' | 'secondary' | undefined;
    i18nKey: string;
}

const ApiHandlerButton: React.FC<ApiHandlerButtonProps> = ({
    disabled,
    isFetching,
    type,
    color,
    i18nKey
}): JSX.Element => {

    return (
        <>
        {!isFetching ? (
            <Button
            type={ type }
            disabled={ disabled }
            color={ color }>
              <Trans i18nKey={ i18nKey } />
            </Button>
        ) : (
            <CircularProgress color={ color } />
        )}
        </>
    );
};

export default ApiHandlerButton;