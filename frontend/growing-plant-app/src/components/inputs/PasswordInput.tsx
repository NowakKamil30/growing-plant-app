/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Trans } from 'react-i18next';

interface PasswordInputProps {
    id?: string;
    name?: string;
    i18nKeyTitle: string;
    password: string;
    className: string;
    isError?: boolean;
    i18nKeyErrorText?: string;
    color?: 'primary' | 'secondary' | undefined;
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    id,
    name,
    i18nKeyTitle,
    password,
    className,
    isError,
    i18nKeyErrorText,
    color,
    onChange,
    onBlur
}): JSX.Element => {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

    return (
        <FormControl
        className={ className }
        color={ color }
        error={ isError }>
          <InputLabel htmlFor='standard-adornment-password'>
              <Trans i18nKey={ i18nKeyTitle }/>
          </InputLabel>
          <Input
            id={ id }
            name={ name }
            type={isShowPassword? 'text' : 'password'}
            value={password}
            onChange={ onChange }
            onBlur={ onBlur }
            error={ isError }
            color={ color }
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={ () => setIsShowPassword(!isShowPassword) }
                >
                  {isShowPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText error={ isError }> <Trans i18nKey={ i18nKeyErrorText }/> </FormHelperText>
        </FormControl>
    );
};

export default PasswordInput;