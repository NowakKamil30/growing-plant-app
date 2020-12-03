/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  makeStyles,
  TextField,
  Theme } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import Checkbox from '../inputs/Checkbox';
import { ReduceTypes } from '../../stores/reducers';
import Transition from './Transition';
import { showLoginDialog, showResetPasswordDialog } from '../../stores/actions/DialogControlActions';
import { Trans } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { DialogControlTypes } from '../../stores/types/DialogControlTypes';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LoginUser } from '../../interfaces/LoginUser';
import PasswordInput from '../inputs/PasswordInput';
import { signIn } from '../../stores/api/AuthOperations';
import { ThunkDispatch } from 'redux-thunk';
import ApiHandlerButton from '../buttons/ApiHandlerButton';
import { SnackbarInfo } from '../../interfaces/SnackbarInfo';
import { AuthTypes } from '../../stores/types/AuthTypes';
import { signInMessage } from '../../stores/actions/AuthActions';
import Snackbar from '../snackbar/Snackbar';

interface MapDispatcherToProps {
  showLoginDialog: (isVisible: boolean) => DialogControlTypes;
  login: (
    loginUser: LoginUser,
    successAction?: () => void,
    errorAction?: () => void
    ) => void;
  changeSignInError: (error: SnackbarInfo) => AuthTypes;
  showResetPasswordDialog: (isVisible: boolean) => DialogControlTypes;
}

interface  MapStateToProps {
  isShowLoginDialog: boolean;
  isSignInFetching: boolean;
  signInMessage: SnackbarInfo;
}

const mapDispatcherToProps = (dispatch: ThunkDispatch<{}, {}, any>): MapDispatcherToProps => ({
    showLoginDialog: (isDialogVisible: boolean) => (
      dispatch(showLoginDialog(isDialogVisible))
    ),
    login: async (
      loginUser: LoginUser,
      successAction?: () => void,
      errorAction?: () => void
      ) => (
      await dispatch(signIn(
        loginUser,
        successAction,
        errorAction
        ))
    ),
    changeSignInError: (error: SnackbarInfo) => (
      dispatch(signInMessage(error))
    ),
    showResetPasswordDialog: (isDialogVisible: boolean) => (
      dispatch(showResetPasswordDialog(isDialogVisible))
  ),
});

const mapStateToProps = (state: ReduceTypes): MapStateToProps => ({
  isShowLoginDialog: state.dialogControl.isLoginDialogVisible,
  isSignInFetching: state.auth.isSignInFetching,
  signInMessage: state.auth.signInMessage,
});


const connector = connect(mapStateToProps, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const LoginDialog: React.FC<PropsFromRedux> = ({
  isShowLoginDialog,
  isSignInFetching,
  signInMessage,
  login,
  showLoginDialog,
  changeSignInError,
  showResetPasswordDialog
}): JSX.Element => {
  const { form, input } = useStyles();
  const history = useHistory();

  const initialValues: LoginUser = {
    username: '',
    password: '',
    isSave: false,
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
    setValues,
  } = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      username: Yup
                .string()
                .strict(true)
                .required('forms.errors.isRequired')
                .min(8, 'forms.errors.wrongLenghtUsername')
                .max(20, 'forms.errors.wrongLenghtUsername')
                .trim('forms.errors.noStartOrEndWithSpace'),
      password: Yup
                .string()
                .strict(true)
                .required('forms.errors.isRequired')
                .min(8, 'forms.errors.wrongLenghtPassword')
                .max(20, 'forms.errors.wrongLenghtPassword')
                .trim('forms.errors.noStartOrEndWithSpace'),
      isSave: Yup
              .bool()
              .default(false),
    }),
    onSubmit: (values: LoginUser) => {
      login(values, () => {
        resetForm();
        history.push('/my-account');
        showLoginDialog(false);
      });
     }
  });

  useEffect(
    () => {
      if (isShowLoginDialog) {
        const usernameFromLocalStorage = localStorage.getItem('username');
        if (usernameFromLocalStorage && usernameFromLocalStorage.length > 0) {
          setValues({ ...values, username: usernameFromLocalStorage });
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShowLoginDialog]
  );

  const closeDialog = (): void => {
    if (!isSignInFetching) {
      showLoginDialog(false);
      resetForm();
    }
  };

    return (
    <Dialog
        open={isShowLoginDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={ closeDialog }
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
        fullWidth={ true }
      >
      <DialogTitle id='alert-dialog-slide-title' >
        <Trans i18nKey='forms.login.title'/>
      </DialogTitle>
      <DialogContent>
        <form
          noValidate
          onSubmit={ handleSubmit }
          className={ form }
          >
            <TextField
            id='username'
            name='username'
            error={ !!errors.username }
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={ values.username }
            label={ <Trans i18nKey='forms.login.username'/> }
            color='secondary'
            className={ input }
            helperText={ <Trans i18nKey={ errors.username }/> }
            />
            <PasswordInput
              id='password'
              name='password'
              isError={ !!errors.password }
              onChange={ handleChange }
              onBlur={ handleBlur }
              password={ values.password }
              i18nKeyTitle='forms.login.password'
              i18nKeyErrorText = { errors.password }
              color='secondary'
              className={ input }
            />
            <Checkbox
            id='isSave'
            name='isSave'
            value={ values.isSave }
            // tslint:disable-next-line: no-unsafe-any
            onChange={ (e) => setValues({ ...values, isSave: !values.isSave})}
            labelI18Key='forms.login.save'
            color='secondary'
            />
            <DialogActions>
            <Link
            component='button'
            variant='subtitle2'
            color='secondary'
            disabled={ isSignInFetching }
            onClick={() => {
              showLoginDialog(false);
              showResetPasswordDialog(true);
            }}>
              <Trans i18nKey='forms.login.forgottenPassword' />
            </Link>
            </DialogActions>
          <DialogActions>
          <ApiHandlerButton
                type='submit'
                disabled = { !isValid || touched === {} || !dirty }
                color='secondary'
                i18nKey='action.login'
                isFetching={ isSignInFetching }
            />
            <Button
            onClick={ closeDialog }
            color='secondary'
            disabled={ isSignInFetching }>
              <Trans i18nKey='action.cancel' />
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
      <Snackbar
      open={ signInMessage.isShow }
      autoHideDuration={ 9000 }
      onClose={ () => changeSignInError({ ...signInMessage, isShow: false }) }
      severity={ signInMessage.severity }
      i18nKeyTitle={ signInMessage.i18nKeyTitle }
      />
    </Dialog>
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
      minHeight: '30vh'
    }
  })
));


export default connector(LoginDialog);