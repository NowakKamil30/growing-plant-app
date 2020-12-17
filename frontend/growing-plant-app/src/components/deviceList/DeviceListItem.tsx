/* eslint-disable @typescript-eslint/no-unused-vars */
import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import React from 'react';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import { Device } from '../../interfaces/Device';

interface DeviceListItemProps {
    device?: Device
}

const DeviceListItem: React.FC<DeviceListItemProps> = ({
    device
}): JSX.Element => (
    <ListItem>
    <ListItemAvatar>
          <ImportantDevicesIcon/>
      </ListItemAvatar>
      <ListItemText primary={device?.name}/>
    </ListItem>
);

export default DeviceListItem;