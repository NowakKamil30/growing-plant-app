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
import { changeMainDrawerVisible } from '../stores/actions/LayoutControlAction';
import { Dispatch } from 'redux';
import { LayoutControlTypes } from '../stores/types/LayoutControlTypes';

const mapDispatcherToProps = (dispatch: Dispatch) => (
  {
      changeDrawerVisible: (isVisible: boolean) => (
          dispatch(changeMainDrawerVisible(isVisible))
      ),
  }
);

const connector = connect(null, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface HeaderProps extends PropsFromRedux {
  changeDrawerVisible: (isVisible: boolean) => LayoutControlTypes;
}

const Header: React.FC<HeaderProps> = ({ changeDrawerVisible }): JSX.Element => {
  const {
    root,
    toolbar,
    menuButton,
    title
    } = useStyles();

  return (
    <header className={root}>
      <AppBar position='static'>
        <Toolbar className={toolbar}>
          <IconButton
          edge='start'
          className={menuButton}
          color='inherit'
          aria-label='menu'
          onClick={(): LayoutControlTypes => changeDrawerVisible(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={title}>
            <Trans i18nKey='title'/>
          </Typography>
          <Button color='inherit'>
              <Trans i18nKey='action.login' />
          </Button>
        </Toolbar>
      </AppBar>
    </header>
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
    title: {
      flexGrow: 1,
    },
  }),
);

export default connector(Header);
