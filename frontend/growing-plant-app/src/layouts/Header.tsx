/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Trans } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { changeMainDrawerVisible } from '../stores/actions/DrawerControlActions';
import { Dispatch } from 'redux';
import { DrawerControlTypes } from '../stores/types/DrawerControlTypes';
import { DialogControlTypes } from '../stores/types/DialogControlTypes';
import { showLoginDialog, showRegisterDialog } from '../stores/actions/DialogControlActions';
import { Box } from '@material-ui/core';
import { Role } from '../enums/Role';
import { ReduceTypes } from '../stores/reducers';
import { AuthTypes } from '../stores/types/AuthTypes';
import { signOut } from '../stores/actions/AuthActions';

interface MapDispatcherToProps {
  changeDrawerVisible: (isVisible: boolean) => DrawerControlTypes;
  showLoginDialog: (isVisible: boolean) => DialogControlTypes;
  showRegisterDialog: (isVisible: boolean) => DialogControlTypes;
  signOut: () => AuthTypes;
}

const mapDispatcherToProps = (dispatch: Dispatch): MapDispatcherToProps => (
  {
      changeDrawerVisible: (isVisible: boolean) => (
          dispatch(changeMainDrawerVisible(isVisible))
      ),
      showLoginDialog: (isVisible: boolean) => (
        dispatch(showLoginDialog(isVisible))
      ),
      showRegisterDialog: (isVisible: boolean) => (
        dispatch(showRegisterDialog(isVisible))
      ),
      signOut: () => (
        dispatch(signOut())
      )
  }
);

interface MapStateToProps {
  role: Role;
}

const mapStateToProps = (state: ReduceTypes): MapStateToProps => ({
  role: state.auth.role
});

const connector = connect(mapStateToProps, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Header: React.FC<PropsFromRedux> = ({
  role,
  changeDrawerVisible,
  showLoginDialog,
  showRegisterDialog,
  signOut
  }): JSX.Element => {
  const {
    root,
    toolbar,
    menuButton,
    title,
    button
    } = useStyles();

  return (
    <Box component='header' className={ root }>
      <AppBar position='static'>
        <Toolbar className={toolbar}>
          <IconButton
          edge='start'
          className={menuButton}
          color='inherit'
          aria-label='menu'
          onClick={(): DrawerControlTypes => changeDrawerVisible(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={ title }>
            <Trans i18nKey='title'/>
          </Typography>
          { role === Role.USER || role === Role.ADMIN ?  (
            <Button
            color='secondary'
            variant='contained'
            className={ button }
            onClick={ signOut }
            >
              <Trans i18nKey='action.logout' />
            </Button>
          ) : (
              <>
              <Button
                color='secondary'
                variant='contained'
                className={ button }
                onClick={ () => showLoginDialog(true) }
                >
                  <Trans i18nKey='action.login' />
                </Button>
                <Button
                color='secondary'
                variant='contained'
                className={ button }
                onClick= { () => showRegisterDialog(true) }
                >
                  <Trans i18nKey='action.register' />
                </Button>
              </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    toolbar: {
      backgroundColor: theme.palette.secondary.main,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    button: {
      marginLeft: 3,
      marginRight: 3,
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default connector(Header);
