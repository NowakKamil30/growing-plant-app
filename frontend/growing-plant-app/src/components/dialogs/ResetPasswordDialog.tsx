/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Button,
    createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import Transition from './Transition';
import { ReduceTypes } from '../../stores/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { showResetPasswordDialog, showSuccessResetPasswordDialog } from '../../stores/actions/DialogControlActions';
import { DialogControlTypes } from '../../stores/types/DialogControlTypes';
import { Trans } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ApiHandlerButton from '../buttons/ApiHandlerButton';
import { resetPassword } from '../../stores/api/AuthOperations';
import { ThunkDispatch } from 'redux-thunk';
import { SnackbarInfo } from '../../interfaces/SnackbarInfo';
import { AuthTypes } from '../../stores/types/AuthTypes';
import { resetPasswordError } from '../../stores/actions/AuthActions';
import Snackbar from '../snackbar/Snackbar';
import { ResetPasswordToServer } from '../../interfaces/ResetPasswordToServer';

interface MapDispatcherToProps {
    showResetPasswordDialog: (isVisible: boolean) => DialogControlTypes;
    resetPassword: (
      email: string,
      successAction?: () => void,
      errorAction?: () => void
      ) => void;
      changeResetPasswordMessage: (message: SnackbarInfo) => AuthTypes;
      showSucceessResetPasswordDialog: (isVisible: boolean) => DialogControlTypes;
}

interface  MapStateToProps {
    isShowResetPasswordDialog: boolean;
    isResetPasswordFetching: boolean;
    resetPasswordMessage: SnackbarInfo;
}

const mapDispatcherToProps = (dispatch: ThunkDispatch<{}, {}, any>): MapDispatcherToProps => ({
    showResetPasswordDialog: (isDialogVisible: boolean) => (
        dispatch(showResetPasswordDialog(isDialogVisible))
    ),
    resetPassword: async (
      email: string,
      successAction?: () => void,
      errorAction?: () => void
      ) => (
        await dispatch(resetPassword(
          email,
          successAction,
          errorAction
        ))
      ),
      changeResetPasswordMessage: (error: SnackbarInfo) => (
        dispatch(resetPasswordError(error))
      ),
      showSucceessResetPasswordDialog: (isVisible: boolean) => (
        dispatch(showSuccessResetPasswordDialog(isVisible))
      )
});

const mapStateToProps = (state: ReduceTypes): MapStateToProps => ({
    isShowResetPasswordDialog: state.dialogControl.isResetPasswordVisible,
    isResetPasswordFetching: state.auth.isResetPasswordFetching,
    resetPasswordMessage: state.auth.resetPasswordMessage
});

const connector = connect(mapStateToProps, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ResetPasswordDialog: React.FC<PropsFromRedux> = ({
    isShowResetPasswordDialog,
    isResetPasswordFetching,
    resetPasswordMessage,
    showResetPasswordDialog,
    changeResetPasswordMessage,
    resetPassword,
    showSucceessResetPasswordDialog: showSuccessResetPasswordDialog
}): JSX.Element => {
  const { form, input } = useStyles();
  const initialValues: ResetPasswordToServer  = {
    email: ''
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
  } = useFormik<ResetPasswordToServer>({
    initialValues,
    validationSchema: Yup.object().shape({
      email: Yup
            .string()
            .strict(true)
            .required('forms.errors.isRequired')
            .min(5, 'forms.errors.wrongLenghtEmail')
            .max(50, 'forms.errors.wrongLenghtEmail')
            .email('forms.errors.notEmail')
            .trim('forms.errors.noStartOrEndWithSpace'),
    }),
    onSubmit: (values: ResetPasswordToServer) => {
      resetPassword(values.email, () => {
        resetForm();
        showResetPasswordDialog(false);
        showSuccessResetPasswordDialog(true);
      });
    }
  });

      return (
          <Dialog
          open={ isShowResetPasswordDialog }
          TransitionComponent={ Transition }
          keepMounted
          onClose={ () => !isResetPasswordFetching ? showResetPasswordDialog(false) : null }
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
          fullWidth={ true }
        >
          <DialogTitle id='alert-dialog-slide-title'>
            <Trans i18nKey='forms.resetPassword.title'/>
          </DialogTitle>
          <DialogContent>
            <form
            noValidate
            onSubmit={ handleSubmit }
            className={ form }
            >
            <TextField
            id='email'
            name='email'
            error={ !!errors.email }
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={ values.email }
            label={ <Trans i18nKey='forms.register.email'/> }
            color='secondary'
            className={ input }
            helperText={ <Trans i18nKey={ errors.email }/> }
            />
            <DialogActions>
            <ApiHandlerButton
                type='submit'
                disabled = { !isValid || touched === {} || !dirty }
                color='secondary'
                i18nKey='action.send'
                isFetching={ isResetPasswordFetching }
            />
            <Button
            onClick={ () => showResetPasswordDialog(false) }
            color='secondary'
            disabled={ isResetPasswordFetching }>
              <Trans i18nKey='action.cancel'/>
            </Button>
          </DialogActions>
            </form>
          </DialogContent>
          <Snackbar
          open={ resetPasswordMessage.isShow }
          autoHideDuration={ 9000 }
          onClose={ () => changeResetPasswordMessage({ ...resetPasswordMessage, isShow: false }) }
          severity={ resetPasswordMessage.severity }
          i18nKeyTitle={ resetPasswordMessage.i18nKeyTitle }
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
      }
    })
  ));

export default connector(ResetPasswordDialog);