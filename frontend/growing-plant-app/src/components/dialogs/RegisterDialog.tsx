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
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { showRegisterDialog } from '../../stores/actions/DialogControlActions';
import { DialogControlTypes } from '../../stores/types/DialogControlTypes';
import { Trans } from 'react-i18next';
import { useFormik } from 'formik';
import { RegisterUser } from '../../interfaces/RegisterUser';
import * as Yup from 'yup';
import PasswordInput from '../inputs/PasswordInput';
import Checkbox from '../inputs/Checkbox';

interface MapDispatcherToProps {
    showRegisterDialog: (isVisible: boolean) => DialogControlTypes;
}

interface  MapStateToProps {
    isShowRegisterDialog: boolean;
}

const mapDispatcherToProps = (dispatch: Dispatch): MapDispatcherToProps => ({
    showRegisterDialog: (isDialogVisible: boolean) => (
        dispatch(showRegisterDialog(isDialogVisible))
    )
});

const mapStateToProps = (state: ReduceTypes): MapStateToProps => ({
    isShowRegisterDialog: state.dialogControl.isRegisterDialogVisible
});

const connector = connect(mapStateToProps, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const RegisterDialog: React.FC<PropsFromRedux> = ({
    isShowRegisterDialog,
    showRegisterDialog
}): JSX.Element => {
  const { form, input } = useStyles();
  const initialValues: RegisterUser = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    isAcceptedDocument: false,
  };

  const {
    values,
    errors,
    isValid,
    touched,
    isSubmitting,
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
      email: Yup
            .string()
            .strict(true)
            .required('forms.errors.isRequired')
            .min(8, 'forms.errors.wrongLenghtUsername')
            .max(40, 'forms.errors.wrongLenghtUsername')
            .email()
            .trim('forms.errors.noStartOrEndWithSpace'),
      password: Yup
                .string()
                .strict(true)
                .required('forms.errors.isRequired')
                .min(8, 'forms.errors.wrongLenghtPassword')
                .max(20, 'forms.errors.wrongLenghtPassword')
                .trim('forms.errors.noStartOrEndWithSpace'),
      confirmPassword: Yup
                      .string()
                      .strict(true)
                      .required('forms.errors.isRequired')
                      .min(8, 'forms.errors.wrongLenghtPassword')
                      .max(20, 'forms.errors.wrongLenghtPassword')
                      .trim('forms.errors.noStartOrEndWithSpace'),
      firstName: Yup
                .string()
                .strict(true)
                .required('forms.errors.isRequired')
                .min(8, 'forms.errors.wrongLenghtUsername')
                .max(20, 'forms.errors.wrongLenghtUsername')
                .trim('forms.errors.noStartOrEndWithSpace'),
      lastName: Yup
                .string()
                .strict(true)
                .required('forms.errors.isRequired')
                .min(8, 'forms.errors.wrongLenghtUsername')
                .max(20, 'forms.errors.wrongLenghtUsername')
                .trim('forms.errors.noStartOrEndWithSpace'),
      isAcceptedDocument: Yup
                          .bool()
                          .default(false)
    }),
    onSubmit: (values: RegisterUser) => {
    }
  });

      return (
          <Dialog
          open={ isShowRegisterDialog }
          TransitionComponent={ Transition }
          keepMounted
          onClose={ () => showRegisterDialog(false) }
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
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
            <TextField
            id='firstName'
            name='firstName'
            error={ !!errors.firstName }
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={ values.firstName }
            label={ <Trans i18nKey='forms.register.firstName'/> }
            color='secondary'
            className={ input }
            helperText={ <Trans i18nKey={ errors.firstName }/> }
            />
            <TextField
            id='lastName'
            name='lastName'
            error={ !!errors.lastName }
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={ values.lastName }
            label={ <Trans i18nKey='forms.register.lastName'/> }
            color='secondary'
            className={ input }
            helperText={ <Trans i18nKey={ errors.lastName }/> }
            />
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
            <PasswordInput
            id='confirmPassword'
            name='confirmPassword'
            isError={ !!errors.confirmPassword }
            onChange={ handleChange }
            onBlur={ handleBlur }
            password={ values.password }
            i18nKeyTitle='forms.register.confirmPassword'
            i18nKeyErrorText = { errors.confirmPassword }
            color='secondary'
            className={ input }
            />
            <Checkbox
            id='isAcceptedDocument'
            name='isAcceptedDocument'
            value={ values.isAcceptedDocument }
            // tslint:disable-next-line: no-unsafe-any
            // onChange={ (e) => setValues({ ...values, isSave: !values.isSave})}
            labelI18Key='forms.register.isAcceptedDocument'
            color='secondary'
            />
            </form>
            <DialogActions>
            <Button onClick={ () => showRegisterDialog(false) } color='secondary'>
              <Trans i18nKey='action.register'/>
            </Button>
            <Button onClick={ () => showRegisterDialog(false) } color='secondary'>
              <Trans i18nKey='action.cancel'/>
            </Button>
          </DialogActions>
          </DialogContent>
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