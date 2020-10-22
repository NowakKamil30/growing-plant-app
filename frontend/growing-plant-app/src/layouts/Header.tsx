import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Trans } from 'react-i18next';

export const Header = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            <Trans i18nKey='title'/>
          </Typography>
          <Button color='inherit'>
              <Trans i18nKey='action.login' />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);
