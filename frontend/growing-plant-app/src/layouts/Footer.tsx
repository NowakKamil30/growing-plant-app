/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { Trans } from 'react-i18next';

const Footer = () => {
    const { root, text } = useStyles();

    return (
        <Box
        component='footer'
        bgcolor='secondary.main'
        className={ root }
        >
            <Box
            component='p'
            color='secondary'
            className={ text }>
                <Trans i18nKey='footer'/>
            </Box>
        </Box>
    );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8
    },
    text: {
        fontSize: 20,
    }
  }),
);

export default Footer;