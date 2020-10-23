/* eslint-disable @typescript-eslint/no-unused-vars */
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import { Trans } from 'react-i18next';

interface ListItemButtonProps {
    icon: () => JSX.Element;
    i18nKeyTitle: string;
    onClick: () => void;
}

const ListItemButton: React.FC<ListItemButtonProps> = ({
    icon,
    i18nKeyTitle,
    onClick,
    children
 }): JSX.Element => {

    return (
        <ListItem button onClick={ onClick }>
            <ListItemIcon>
                { icon() }
            </ListItemIcon>
            <ListItemText>
                <Trans i18nKey={ i18nKeyTitle }/>
            </ListItemText>
            {children}
        </ListItem>
    );
};

export default ListItemButton;