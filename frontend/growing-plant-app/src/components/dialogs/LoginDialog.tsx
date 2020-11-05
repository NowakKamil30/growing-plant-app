/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  makeStyles,
  TextField,
  Theme} from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import Checkbox from '../inputs/Checkbox';
import { ReduceTypes } from '../../stores/reducers';
import Transition from './Transition';
import { showLoginDialog } from '../../stores/actions/DialogControlActions';
import { Trans } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { DialogControlTypes } from '../../stores/types/DialogControlTypes';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LoginUser } from '../../interfaces/LoginUser';
import PasswordInput from '../inputs/PasswordInput';
import { signIn } from '../../stores/api/AuthOperations';
import { ThunkDispatch } from 'redux-thunk';

interface MapDispatcherToProps {
  showLoginDialog: (isVisible: boolean) => DialogControlTypes;
  login: (loginUser: LoginUser) => void;
}

interface  MapStateToProps {
  isShowLoginDialog: boolean;
}

const mapDispatcherToProps = (dispatch: ThunkDispatch<{}, {}, any>): MapDispatcherToProps => ({
    showLoginDialog: (isDialogVisible: boolean) => (
      dispatch(showLoginDialog(isDialogVisible))
    ),
    login: async (loginUser: LoginUser) => (
      await dispatch(signIn(loginUser))
    )
});

const mapStateToProps = (state: ReduceTypes): MapStateToProps => ({
  isShowLoginDialog: state.dialogControl.isLoginDialogVisible,
});


const connector = connect(mapStateToProps, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const LoginDialog: React.FC<PropsFromRedux> = ({
  isShowLoginDialog,
  login,
  showLoginDialog,
}): JSX.Element => {
  const { form, input } = useStyles();
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
      login(values);
      resetForm();
      showLoginDialog(false);
     }
  });

  const closeDialog = (): void => {
    showLoginDialog(false);
    resetForm();
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
          <NavLink to='' >
            <Link color='secondary'>
              <Trans i18nKey='forms.login.forgottenPassword' />
            </Link>
          </NavLink>
          <DialogActions>
            <Button
            type='submit'
            disabled = { !isValid || touched === {} || !dirty }
            color='secondary'>
              <Trans i18nKey='action.login' />
            </Button>
            <Button
            onClick={ closeDialog }
            color='secondary'>
              <Trans i18nKey='action.cancel' />
            </Button>
          </DialogActions>
        </form>
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


export default connector(LoginDialog);