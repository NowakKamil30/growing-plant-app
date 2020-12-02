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
  Theme
} from '@material-ui/core';
import Transition from './Transition';
import { ReduceTypes } from '../../stores/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { showRegisterDialog, showSuccessRegisterDialog } from '../../stores/actions/DialogControlActions';
import { DialogControlTypes } from '../../stores/types/DialogControlTypes';
import { Trans } from 'react-i18next';
import { useFormik } from 'formik';
import { RegisterUser } from '../../interfaces/RegisterUser';
import * as Yup from 'yup';
import PasswordInput from '../inputs/PasswordInput';
import Checkbox from '../inputs/Checkbox';
import ApiHandlerButton from '../buttons/ApiHandlerButton';
import { register } from '../../stores/api/AuthOperations';
import { ThunkDispatch } from 'redux-thunk';
import { SnackbarInfo } from '../../interfaces/SnackbarInfo';
import { AuthTypes } from '../../stores/types/AuthTypes';
import { registerMessage } from '../../stores/actions/AuthActions';
import Snackbar from '../snackbar/Snackbar';

interface MapDispatcherToProps {
    showRegisterDialog: (isVisible: boolean) => DialogControlTypes;
    register: (
      registerUser: RegisterUser,
      successAction?: () => void,
      errorAction?: () => void
      ) => void;
      changeRegisterMessage: (message: SnackbarInfo) => AuthTypes;
      showSuccessRegisterDialog: (isVisible: boolean) => DialogControlTypes;
}

interface  MapStateToProps {
    isShowRegisterDialog: boolean;
    isRegisterFetching: boolean;
    registerMessage: SnackbarInfo;
}

const mapDispatcherToProps = (dispatch: ThunkDispatch<{}, {}, any>): MapDispatcherToProps => ({
    showRegisterDialog: (isDialogVisible: boolean) => (
        dispatch(showRegisterDialog(isDialogVisible))
    ),
    register: async (
      registerUser: RegisterUser,
      successAction?: () => void,
      errorAction?: () => void
      ) => (
        await dispatch(register(
          registerUser,
          successAction,
          errorAction
        ))
      ),
      changeRegisterMessage: (error: SnackbarInfo) => (
        dispatch(registerMessage(error))
      ),
      showSuccessRegisterDialog: (isSuccessRegisterVisible: boolean) => (
        dispatch(showSuccessRegisterDialog(isSuccessRegisterVisible))
      )
});

const mapStateToProps = (state: ReduceTypes): MapStateToProps => ({
    isShowRegisterDialog: state.dialogControl.isRegisterDialogVisible,
    isRegisterFetching: state.auth.isRegisterFetching,
    registerMessage: state.auth.registerMessage
});

const connector = connect(mapStateToProps, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const RegisterDialog: React.FC<PropsFromRedux> = ({
    isShowRegisterDialog,
    showSuccessRegisterDialog,
    isRegisterFetching,
    registerMessage,
    showRegisterDialog,
    register,
    changeRegisterMessage
}): JSX.Element => {
  const { form, input } = useStyles();
  const initialValues: RegisterUser = {
    usernameRegister: '',
    emailRegister: '',
    passwordRegister: '',
    confirmPasswordRegister: '',
    firstNameRegister: '',
    lastNameRegister: '',
    isAcceptedDocumentRegister: false,
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
      usernameRegister: Yup
                .string()
                .strict(true)
                .required('forms.errors.isRequired')
                .min(8, 'forms.errors.wrongLenghtUsername')
                .max(20, 'forms.errors.wrongLenghtUsername')
                .trim('forms.errors.noStartOrEndWithSpace'),
      emailRegister: Yup
            .string()
            .strict(true)
            .required('forms.errors.isRequired')
            .min(5, 'forms.errors.wrongLenghtEmail')
            .max(50, 'forms.errors.wrongLenghtEmail')
            .email()
            .trim('forms.errors.noStartOrEndWithSpace'),
      passwordRegister: Yup
                .string()
                .strict(true)
                .required('forms.errors.isRequired')
                .min(8, 'forms.errors.wrongLenghtPassword')
                .max(20, 'forms.errors.wrongLenghtPassword')
                .trim('forms.errors.noStartOrEndWithSpace'),
      confirmPasswordRegister: Yup
                      .string()
                      .strict(true)
                      .required('forms.errors.isRequired')
                      .min(8, 'forms.errors.wrongLenghtPassword')
                      .max(20, 'forms.errors.wrongLenghtPassword')
                      .trim('forms.errors.noStartOrEndWithSpace')
                      .oneOf([Yup.ref('passwordRegister'), ''], 'forms.errors.matchPassword'),
      firstNameRegister: Yup
                .string()
                .strict(true)
                .required('forms.errors.isRequired')
                .min(2, 'forms.errors.wrongLenghtFirstName')
                .max(30, 'forms.errors.wrongLenghtFirstName')
                .trim('forms.errors.noStartOrEndWithSpace'),
      lastNameRegister: Yup
                .string()
                .strict(true)
                .required('forms.errors.isRequired')
                .min(2, 'forms.errors.wrongLenghtLastName')
                .max(30, 'forms.errors.wrongLenghtLastName')
                .trim('forms.errors.noStartOrEndWithSpace'),
      isAcceptedDocumentRegister: Yup
                          .bool()
                          .default(false)
    }),
    onSubmit: (values: RegisterUser) => {
      console.log(values);
      register(values, () => {
        resetForm();
        showSuccessRegisterDialog(true);
        showRegisterDialog(false);
      });
    }
  });

      return (
          <Dialog
          open={ isShowRegisterDialog }
          TransitionComponent={ Transition }
          keepMounted
          onClose={ () => !isRegisterFetching ? showRegisterDialog(false) : null }
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
          fullWidth={ true }
        >
          <DialogTitle id='alert-dialog-slide-title'>
            <Trans i18nKey='forms.register.title'/>
          </DialogTitle>
          <DialogContent>
            <form
            noValidate
            onSubmit={ handleSubmit }
            className={ form }
            >
            <TextField
            id='usernameRegister'
            name='usernameRegister'
            error={ !!errors.usernameRegister }
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={ values.usernameRegister }
            label={ <Trans i18nKey='forms.login.username'/> }
            color='secondary'
            className={ input }
            helperText={ <Trans i18nKey={ errors.usernameRegister }/> }
            />
            <TextField
            id='firstNameRegister'
            name='firstNameRegister'
            error={ !!errors.firstNameRegister }
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={ values.firstNameRegister }
            label={ <Trans i18nKey='forms.register.firstName'/> }
            color='secondary'
            className={ input }
            helperText={ <Trans i18nKey={ errors.firstNameRegister }/> }
            />
            <TextField
            id='lastNameRegister'
            name='lastNameRegister'
            error={ !!errors.lastNameRegister }
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={ values.lastNameRegister }
            label={ <Trans i18nKey='forms.register.lastName'/> }
            color='secondary'
            className={ input }
            helperText={ <Trans i18nKey={ errors.lastNameRegister }/> }
            />
            <TextField
            id='emailRegister'
            name='emailRegister'
            error={ !!errors.emailRegister }
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={ values.emailRegister }
            label={ <Trans i18nKey='forms.register.email'/> }
            color='secondary'
            className={ input }
            helperText={ <Trans i18nKey={ errors.emailRegister }/> }
            />
            <PasswordInput
            id='passwordRegister'
            name='passwordRegister'
            isError={ !!errors.passwordRegister }
            onChange={ handleChange }
            onBlur={ handleBlur }
            password={ values.passwordRegister }
            i18nKeyTitle='forms.login.password'
            i18nKeyErrorText = { errors.passwordRegister }
            color='secondary'
            className={ input }
            />
            <PasswordInput
            id='confirmPasswordRegister'
            name='confirmPasswordRegister'
            isError={ !!errors.confirmPasswordRegister }
            onChange={ handleChange }
            onBlur={ handleBlur }
            password={ values.confirmPasswordRegister }
            i18nKeyTitle='forms.register.confirmPassword'
            i18nKeyErrorText = { errors.confirmPasswordRegister }
            color='secondary'
            className={ input }
            />
            <Checkbox
            id='isAcceptedDocumentRegister'
            name='isAcceptedDocumentRegister'
            value={ values.isAcceptedDocumentRegister }
            // tslint:disable-next-line: no-unsafe-any
            onChange={ (e) => setValues({ ...values, isAcceptedDocumentRegister: !values.isAcceptedDocumentRegister})}
            labelI18Key='forms.register.isAcceptedDocument'
            color='secondary'
            />
            <DialogActions>
            <ApiHandlerButton
                type='submit'
                disabled = { !isValid || touched === {} || !dirty || !values.isAcceptedDocumentRegister }
                color='secondary'
                i18nKey='action.register'
                isFetching={ isRegisterFetching }
            />
            <Button 
            onClick={ () => showRegisterDialog(false) } 
            color='secondary'
            disabled={ isRegisterFetching }>
              <Trans i18nKey='action.cancel'/>
            </Button>
          </DialogActions>
            </form>
          </DialogContent>
          <Snackbar
          open={ registerMessage.isShow }
          autoHideDuration={ 9000 }
          onClose={ () => changeRegisterMessage({ ...registerMessage, isShow: false }) }
          severity={ registerMessage.severity }
          i18nKeyTitle={ registerMessage.i18nKeyTitle }
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

export default connector(RegisterDialog);