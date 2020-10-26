/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
    changeMainDrawerVisible,
    expandMyDevicesList,
    expandShopList,
    expandContactList
 } from '../../stores/actions/DrawerControlActions';
import { ReduceTypes } from '../../stores/reducers';
import { Dispatch } from 'redux';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ContactsIcon from '@material-ui/icons/Contacts';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DevicesIcon from '@material-ui/icons/Devices';
import StoreIcon from '@material-ui/icons/Store';
import AddIcon from '@material-ui/icons/Add';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import StorefrontIcon from '@material-ui/icons/Storefront';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import MessageIcon from '@material-ui/icons/Message';
import List from '@material-ui/core/List';
import { Trans } from 'react-i18next';
import { createStyles, DrawerProps, IconButton, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import ListItemWithCollapse from '../list/ListItemWithCollapse';
import ListItemLink from '../list/ListItemLink';

interface MapDispatcherToProps {
    changeDrawerVisible: (isVisible: boolean) => void;
    expandMyDevices: (isVisible: boolean) => void;
    expandShop: (isVisible: boolean) => void;
    expandContact: (isVisible: boolean) => void;

}

const mapDispatcherToProps = (dispatch: Dispatch): MapDispatcherToProps =>  (
    {
        changeDrawerVisible: (isMainDrawerVisible: boolean) => (
            dispatch(changeMainDrawerVisible(isMainDrawerVisible))
        ),
        expandMyDevices: (isExpand: boolean) => (
            dispatch(expandMyDevicesList(isExpand))
        ),
        expandShop: (isExpand: boolean) => (
            dispatch(expandShopList(isExpand))
        ),
        expandContact: (isExpand: boolean) => (
            dispatch(expandContactList(isExpand))
        )
    }
);

interface  MapStateToProps {
    anchor: DrawerProps['anchor'];
    isExpandShop: boolean;
    isExpandMyDevices: boolean;
    isExpandContact: boolean;
}

const mapStateToProps = (state: ReduceTypes): MapStateToProps =>({
    anchor: state.drawerControl.mainDrawerAnchor,
    isExpandShop: state.drawerControl.isExpandShopList,
    isExpandMyDevices: state.drawerControl.isExpandMyDevicesList,
    isExpandContact: state.drawerControl.isExpandContactList,
});

const connector = connect(mapStateToProps, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const MainDrawerList: React.FC<PropsFromRedux> = ({
    anchor,
    isExpandMyDevices,
    isExpandShop,
    isExpandContact,
    expandMyDevices,
    expandShop,
    changeDrawerVisible,
    expandContact }): JSX.Element => {
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
                <List component='div' disablePadding className={ nested }>
                    <ListItemLink
                        icon={ () => <ImportantDevicesIcon /> }
                        i18nKeyTitle='blank'
                        path=''
                    />
                </List>
                )}
            />
            <ListItemWithCollapse
                i18nKeyTitle='pages.shop'
                icon={ () => <StoreIcon />}
                isExpand={ isExpandShop }
                onClick={() => expandShop( !isExpandShop )}
                list={() => (
                <List component='div' disablePadding className={ nested }>
                    <ListItemLink
                        icon={ () => <StorefrontIcon /> }
                        i18nKeyTitle='pages.shop'
                        path=''
                    />
                    <ListItemLink
                        icon={ () => <NewReleasesIcon /> }
                        i18nKeyTitle='shop.NewReleases'
                        path=''
                    />
                    <ListItemLink
                        icon={ () => <ShoppingBasketIcon /> }
                        i18nKeyTitle='shop.basket'
                        path=''
                    />
                    <ListItemLink
                        icon={ () => <LocalOfferIcon /> }
                        i18nKeyTitle='shop.discounts'
                        path=''
                    />
                </List>
                )}
            />
            <ListItemWithCollapse
                i18nKeyTitle='pages.contact'
                icon={ () => <ContactsIcon />}
                isExpand={ isExpandContact }
                onClick={() => expandContact( !isExpandContact )}
                list={() => (
                <List component='div' disablePadding className={ nested }>
                    <ListItemLink
                        icon={ () => <LiveHelpIcon /> }
                        i18nKeyTitle='contact.faq'
                        path=''
                    />
                    <ListItemLink
                        icon={ () => <PhoneInTalkIcon /> }
                        i18nKeyTitle='contact.helpline'
                        path=''
                    />
                    <ListItemLink
                        icon={ () => <MessageIcon /> }
                        i18nKeyTitle='contact.message'
                        path=''
                    />
                </List>
                )}
            />
            <ListItemLink
                icon={ () => <InfoIcon /> }
                i18nKeyTitle='pages.about'
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