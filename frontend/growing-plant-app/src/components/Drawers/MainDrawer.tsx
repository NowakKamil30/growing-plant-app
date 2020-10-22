/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import { changeMainDrawerVisible } from '../../stores/actions/LayoutControlAction';
import { ReduceTypes } from '../../stores/reducers';
import { Dispatch } from 'redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      backgroundColor: theme.palette.secondary.main,
    },
  }),
);

const mapDispatcherToProps = (dispatch: Dispatch) => (
    {
        changeDrawerVisible: (isMainDrawerVisible: boolean) => (
            dispatch(changeMainDrawerVisible(isMainDrawerVisible))
        ),
    }
);

const mapStateToProps = (state: ReduceTypes): any =>({
    isVisible: state.layoutControl.isMainDrawerVisible
});

const connector = connect(mapStateToProps, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface MainDrawerProps extends PropsFromRedux {
    isVisible: boolean;
    changeDrawerVisible: (isVisible: boolean) => void;
}

const MainDrawer: React.FC<MainDrawerProps> = ({ isVisible, changeDrawerVisible }): JSX.Element => {
    const {drawer} = useStyles();

    return (
        <Drawer
            anchor='left'
            open={ isVisible }
            classes={{ paper: drawer }}
                onClick={ (): void => changeDrawerVisible(false) }
            >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
                ))}
            </List>
        </Drawer>
    );
};



export default connector(MainDrawer);