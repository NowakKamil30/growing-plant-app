/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
    changeMainDrawerVisible,
    expandMyDevicesList,
    expandShopList
 } from '../../stores/actions/LayoutControlAction';
import { ReduceTypes } from '../../stores/reducers';
import { Dispatch } from 'redux';
import { StarBorder } from '@material-ui/icons';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ContactsIcon from '@material-ui/icons/Contacts';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DevicesIcon from '@material-ui/icons/Devices';
import StoreIcon from '@material-ui/icons/Store';
import AddIcon from '@material-ui/icons/Add';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import HomeIcon from '@material-ui/icons/Home';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Trans } from 'react-i18next';
import { createStyles, DrawerProps, IconButton, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import ListItemWithCollapse from '../ListItemWithCollapse';
import ListItemLink from '../ListItemLink';

const mapDispatcherToProps = (dispatch: Dispatch) => (
    {
        changeDrawerVisible: (isMainDrawerVisible: boolean) => (
            dispatch(changeMainDrawerVisible(isMainDrawerVisible))
        ),
        expandMyDevices: (isExpand: boolean) => (
            dispatch(expandMyDevicesList(isExpand))
        ),
        expandShop: (isExpand: boolean) => (
            dispatch(expandShopList(isExpand))
        )

    }
);

const mapStateToProps = (state: ReduceTypes): any =>({
    anchor: state.drawerControl.MainDrawerAnchor,
    isExpandShop: state.drawerControl.isExpandShopList,
    isExpandMyDevices: state.drawerControl.isExpandMyDevicesList,
});

const connector = connect(mapStateToProps, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface MainDrawerListProps extends PropsFromRedux {
    anchor: DrawerProps['anchor'];
    isExpandShop: boolean;
    isExpandMyDevices: boolean;
    changeDrawerVisible: (isVisible: boolean) => void;
    expandMyDevices: (isExpand: boolean) => void;
    expandShop: (isExpand: boolean) => void;
}

const MainDrawerList: React.FC<MainDrawerListProps> = ({
    anchor,
    isExpandMyDevices,
    isExpandShop,
    expandMyDevices,
    expandShop,
    changeDrawerVisible }): JSX.Element => {
    const {
        root,
        nested,
        title,
     } = useStyles();

    return (
        <List
        component='nav'
        aria-labelledby='nested-list-subheader'
        className = { root }
        subheader={
            <Toolbar className={title}>
                <IconButton onClick={() => changeDrawerVisible(false)}>
                    { anchor === 'left' ? <ChevronLeftIcon /> : <KeyboardArrowUpIcon />}
                </IconButton>
                <Typography variant='h6' noWrap>
                    <Trans i18nKey='title'/>
                </Typography>
            </Toolbar>
        }
        >
            <ListItemLink
                icon={ () => <HomeIcon /> }
                i18nKeyTitle='pages.home'
                path=''
            />
            <ListItemLink
                icon={ () => <AccountBoxIcon /> }
                i18nKeyTitle='pages.myAccount'
                path=''
            />
            <ListItemLink
                icon={ () => <AddIcon /> }
                i18nKeyTitle='pages.addDevice'
                path=''
            />
            <ListItemWithCollapse
                i18nKeyTitle='pages.myDevices'
                icon={ () => <DevicesIcon />}
                isExpand={ isExpandMyDevices }
                onClick={() => expandMyDevices(!isExpandMyDevices) }
                list={() => (
                <List component='div' disablePadding>
                    <ListItem button className={nested}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary='Starred' />
                    </ListItem>
                </List>
                )}
            />
            <ListItemWithCollapse
                i18nKeyTitle='pages.shop'
                icon={ () => <StoreIcon />}
                isExpand={ isExpandShop }
                onClick={() => expandShop( !isExpandShop )}
                list={() => (
                <List component='div' disablePadding>
                    <ListItem button className={nested}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary='Starred' />
                    </ListItem>
                </List>
                )}
            />
            <ListItemLink
                icon={ () => <ContactsIcon /> }
                i18nKeyTitle='pages.contact'
                path=''
            />
            <ListItemLink
                icon={ () => <SupervisorAccountIcon /> }
                i18nKeyTitle='pages.adminPanel'
                path=''
            />
        </List>
    );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width: '100%',
        backgroundColor: theme.palette.secondary.main,
      },
      nested: {
        paddingLeft: theme.spacing(4),
      },
      title: {
        flexGrow: 1,
        paddingLeft: 0,
        paddingRight: 0,
      },
  }),
);


export default connector(MainDrawerList);