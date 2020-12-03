/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, createStyles, makeStyles, Paper, Theme } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { Trans } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import * as Yup from 'yup';
import ApiHandlerButton from '../components/buttons/ApiHandlerButton';
import PasswordInput from '../components/inputs/PasswordInput';
import Snackbar from '../components/snackbar/Snackbar';
import { SnackbarInfo } from '../interfaces/SnackbarInfo';
import { changePasswordError } from '../stores/actions/AuthActions';
import { showLoginDialog } from '../stores/actions/DialogControlActions';
import { changePassword } from '../stores/api/AuthOperations';
import { ReduceTypes } from '../stores/reducers';
import { AuthTypes } from '../stores/types/AuthTypes';
import { DialogControlTypes } from '../stores/types/DialogControlTypes';

interface FormData {
    passwordChange: string;
    confirmPasswordChange: string;
}

interface MapDispatcherToProps {
    changePassword: (
      passoword: string,
      token: string,
      successAction?: () => void,
      errorAction?: () => void
      ) => void;
      changeChangePasswordMessage: (message: SnackbarInfo) => AuthTypes;
      openLoginForm: (isVisible: boolean) => DialogControlTypes;
}

interface  MapStateToProps {
    isChangePasswordFetching: boolean;
    changePasswordMessage: SnackbarInfo;
    changePasswordSuccess: boolean;
}

const mapDispatcherToProps = (dispatch: ThunkDispatch<{}, {}, any>): MapDispatcherToProps => ({
    changePassword: async (
      passoword: string,
      token: string,
      successAction?: () => void,
      errorAction?: () => void
      ) => (
        await dispatch(changePassword(
          passoword,
          token,
          successAction,
          errorAction
        ))
      ),
      changeChangePasswordMessage: (error: SnackbarInfo) => (
        dispatch(changePasswordError(error))
      ),
      openLoginForm: (isVisible: boolean) => (
          dispatch(showLoginDialog(isVisible))
      )
});

const mapStateToProps = (state: ReduceTypes): MapStateToProps => ({
    isChangePasswordFetching: state.auth.isChangePasswordFetching,
    changePasswordMessage: state.auth.changePasswordMessage,
    changePasswordSuccess: state.auth.changePasswordSuccess
});

const connector = connect(mapStateToProps, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ChangePassword: React.FC<PropsFromRedux> = ({
    isChangePasswordFetching,
    changePasswordMessage,
    changePasswordSuccess,
    changeChangePasswordMessage,
    changePassword,
    openLoginForm
}): JSX.Element => {
    const { form, input, paper } = useStyles();
    const location = useLocation();
    const history = useHistory();

    const initialValues: FormData  = {
        passwordChange: '',
        confirmPasswordChange: ''
      };
      const {
        values,
        errors,
        isValid,
        touched,
        dirty,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      } = useFormik({
        initialValues,
        validationSchema: Yup.object().shape({
            passwordChange: Yup
                    .string()
                    .strict(true)
                    .required('forms.errors.isRequired')
                    .min(8, 'forms.errors.wrongLenghtPassword')
                    .max(20, 'forms.errors.wrongLenghtPassword')
                    .trim('forms.errors.noStartOrEndWithSpace'),
            confirmPasswordChange: Yup
                          .string()
                          .strict(true)
                          .required('forms.errors.isRequired')
                          .min(8, 'forms.errors.wrongLenghtPassword')
                          .max(20, 'forms.errors.wrongLenghtPassword')
                          .trim('forms.errors.noStartOrEndWithSpace')
                          .oneOf([Yup.ref('passwordChange'), ''], 'forms.errors.matchPassword'),

        }),
        onSubmit: (values: FormData) => {
            const queryParams = new URLSearchParams(location.search);
            const token = queryParams.get('token') || '';
            changePassword(
                values.passwordChange,
                token
            );
        }
      });

    return (
        <Box component='div'>
            {changePasswordSuccess ?
            <Paper>
                <h1>
                    <Trans i18nKey='successes.changePassword'/>
                </h1>
                <Button
                onClick={ () => {
                    history.push('/');
                    openLoginForm(true);
                 }}
                color='secondary'>
                <Trans i18nKey='action.login'/>
                </Button>
            </Paper> :
            <Paper className={paper}>
                <h2>
                    <Trans i18nKey='forms.changePassword.title'/>
                </h2>
                <form
                noValidate
                onSubmit={ handleSubmit }
                className={ form }
                >
                <PasswordInput
                id='passwordChange'
                name='passwordChange'
                isError={ !!errors.passwordChange }
                onChange={ handleChange }
                onBlur={ handleBlur }
                password={ values.passwordChange }
                i18nKeyTitle='forms.login.password'
                i18nKeyErrorText = { errors.passwordChange }
                color='secondary'
                className={ input }
                />
                <PasswordInput
                id='confirmPasswordChange'
                name='confirmPasswordChange'
                isError={ !!errors.confirmPasswordChange }
                onChange={ handleChange }
                onBlur={ handleBlur }
                password={ values.confirmPasswordChange }
                i18nKeyTitle='forms.register.confirmPassword'
                i18nKeyErrorText = { errors.confirmPasswordChange }
                color='secondary'
                className={ input }
                />
                <ApiHandlerButton
                    type='submit'
                    disabled = { !isValid || touched === {} || !dirty }
                    color='secondary'
                    i18nKey='action.send'
                    isFetching={ isChangePasswordFetching }
                />
                <Button
                onClick={ () => history.push('/') }
                color='secondary'
                disabled={ isChangePasswordFetching }>
                <Trans i18nKey='action.cancel'/>
                </Button>
                </form>
            </Paper>}
            <Snackbar
            open={ changePasswordMessage.isShow }
            autoHideDuration={ 9000 }
            onClose={ () => changeChangePasswordMessage({ ...changePasswordMessage, isShow: false }) }
            severity={ changePasswordMessage.severity }
            i18nKeyTitle={ changePasswordMessage.i18nKeyTitle }
            />
        </Box>
    );
};

const useStyles = makeStyles((theme: Theme) =>(
    createStyles({
      input: {
        height: 70
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
      },
      paper: {
          padding: 20,
          margin: 5
      }
    })
  ));

export default connector(ChangePassword);