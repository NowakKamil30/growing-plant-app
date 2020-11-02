/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import RouterSwitch from '../router/RouterSwitch';

const Main = () => {
    const { root } = useStyles();

    return (
        <Box
        component='main'
        className={ root }
        >
          <RouterSwitch/>
        </Box>
    );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        flexGrow: 1
    },
  }),
);

export default Main;