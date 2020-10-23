/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { Collapse, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import { changeMainDrawerPosition, changeMainDrawerVisible } from '../../stores/actions/LayoutControlAction';
import { ReduceTypes } from '../../stores/reducers';
import { Dispatch } from 'redux';
import { DrawerProps } from '@material-ui/core/Drawer/Drawer';
import { settings } from '../../settings/settings.json';
import { ExpandLess, ExpandMore, StarBorder } from '@material-ui/icons';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Trans } from 'react-i18next';


const mapDispatcherToProps = (dispatch: Dispatch) => (
    {
        changeDrawerVisible: (isMainDrawerVisible: boolean) => (
            dispatch(changeMainDrawerVisible(isMainDrawerVisible))
        ),
        changeDrawerPosition: (anchor: DrawerProps['anchor']) => (
            dispatch(changeMainDrawerPosition(anchor))
        ),
    }
);

const mapStateToProps = (state: ReduceTypes): any =>({
    isVisible: state.layoutControl.isMainDrawerVisible,
    anchor: state.layoutControl.MainDrawerAnchor,
});

const connector = connect(mapStateToProps, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface MainDrawerProps extends PropsFromRedux {
    isVisible: boolean;
    anchor: DrawerProps['anchor'];
    changeDrawerVisible: (isVisible: boolean) => void;
    changeDrawerPosition: (anchor: DrawerProps['anchor']) => void;
}

const MainDrawer: React.FC<MainDrawerProps> = ({
    isVisible,
    changeDrawerVisible,
    anchor,
    changeDrawerPosition,
}): JSX.Element => {
    const {
        drawer,
        root,
        nested,
        title,
     } = useStyles();

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
            <ListItem button>
                <ListItemIcon>
                <SendIcon />
                </ListItemIcon>
                <ListItemText primary='Sent mail' />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary='Drafts' />
            </ListItem>
            <ListItem button onClick={() => null}>
                <ListItemIcon>
                <InboxIcon />
                </ListItemIcon>
                <ListItemText primary='Inbox' />
                {true ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={true} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                <ListItem button className={nested}>
                    <ListItemIcon>
                    <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary='Starred' />
                </ListItem>
                </List>
            </Collapse>
        </List>
    </Drawer>
    );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      backgroundColor: theme.palette.secondary.main,
      minWidth: 200,
    },
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


export default connector(MainDrawer);