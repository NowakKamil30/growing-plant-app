/* eslint-disable @typescript-eslint/no-unused-vars */
import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import React from 'react';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import { Device } from '../../interfaces/Device';
import ListItemLink from '../list/ListItemLink';

interface DeviceListItemProps {
    device?: Device
}

const DeviceListItem: React.FC<DeviceListItemProps> = ({
    device
}): JSX.Element => (
    <ListItem>
        <ListItemLink
        icon={ () => <ImportantDevicesIcon /> }
        i18nKeyTitle={ device?.name || ""}
        path={ '/my-device/' + device?.id } 
        />
    </ListItem>
);

export default DeviceListItem;