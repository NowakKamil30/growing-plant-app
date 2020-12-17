/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { Device } from '../../interfaces/Device';
import DeviceListItem from './DeviceListItem';

interface DeviceListProps {
    devices?: Device[];
}

const DeviceList: React.FC<DeviceListProps> = ({
    devices
}) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {devices?.map((device: Device, index: number) => {
        if (index < devices.length - 1) {
          return (
            <>
              <DeviceListItem device={devices?.[0]}/>
              <Divider variant="inset" component="li" />
            </>
          )
        } else {
          return <DeviceListItem device={devices?.[0]}/>
        }
      })}

    </List>
  );
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export default DeviceList;