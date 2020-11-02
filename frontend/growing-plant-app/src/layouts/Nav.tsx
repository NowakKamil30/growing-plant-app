import { Box } from '@material-ui/core';
import React from 'react';
import MainDrawer from '../components/drawers/MainDrawer';

const Nav = (): JSX.Element => {

    return (
        <Box component='nav'>
            <MainDrawer/>
        </Box>
    );
};

export default Nav;