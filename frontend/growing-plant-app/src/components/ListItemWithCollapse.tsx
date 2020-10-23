/* eslint-disable @typescript-eslint/no-unused-vars */
import { Collapse, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import React from 'react';
import { Trans } from 'react-i18next';
import ListItemButton from './ListItemButton';

interface ListItemWithCollapseProps {
    icon: () => JSX.Element;
    list: () => JSX.Element;
    isExpand: boolean;
    i18nKeyTitle: string;
    onClick: () => void;
}

const ListItemWithCollapse: React.FC<ListItemWithCollapseProps> = ({
    icon,
    isExpand,
    list,
    i18nKeyTitle,
    onClick
 }): JSX.Element => {

    return (
        <>
        <ListItemButton
            onClick={ onClick }
            icon = {icon}
            i18nKeyTitle = { i18nKeyTitle }
        >
            { isExpand ? <ExpandLess /> : <ExpandMore /> }
        </ListItemButton>
        <Collapse in={ isExpand } timeout='auto' unmountOnExit>
            { list() }
        </Collapse>
    </>
    );
};

export default ListItemWithCollapse;