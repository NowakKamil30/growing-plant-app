/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import { changeMainDrawerPosition } from '../../stores/actions/DrawerControlActions';
import { ReduceTypes } from '../../stores/reducers';
import { Dispatch } from 'redux';
import { DrawerProps } from '@material-ui/core/Drawer/Drawer';
import { settings } from '../../settings/settings.json';
import MainDrawerList from './MainDrawerList';

const mapDispatcherToProps = (dispatch: Dispatch) => (
    {
        changeDrawerPosition: (anchor: DrawerProps['anchor']) => (
            dispatch(changeMainDrawerPosition(anchor))
        ),
    }
);

const mapStateToProps = (state: ReduceTypes): any =>({
    isVisible: state.drawerControl.isMainDrawerVisible,
    anchor: state.drawerControl.mainDrawerAnchor
});

const connector = connect(mapStateToProps, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface MainDrawerProps extends PropsFromRedux {
    isVisible: boolean;
    anchor: DrawerProps['anchor'];
    changeDrawerPosition: (anchor: DrawerProps['anchor']) => void;
}

const MainDrawer: React.FC<MainDrawerProps> = ({
    isVisible,
    anchor,
    changeDrawerPosition,
}): JSX.Element => {
    const { drawer } = useStyles();

    const updateDimensions = (): void => changeDrawerPosition(window.innerWidth > settings.mobile.size.width ? 'left' : 'top');

    useEffect(() => {
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    });

    return (
    <Drawer
    variant='persistent'
    anchor={ anchor }
    open={ isVisible }
    classes={{ paper: drawer }}
    >
        <MainDrawerList/>
    </Drawer>
    );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      backgroundColor: theme.palette.secondary.main,
      minWidth: 200,
    },
  }),
);


export default connector(MainDrawer);