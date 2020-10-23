/* eslint-disable @typescript-eslint/no-unused-vars */
import { createStyles, ListItem, ListItemIcon, ListItemText, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { Trans } from 'react-i18next';
import { NavLink } from 'react-router-dom';

interface ListItemLinkProps {
    icon: () => JSX.Element;
    i18nKeyTitle: string;
    path: string;
}

const ListItemLink: React.FC<ListItemLinkProps> = ({
    icon,
    i18nKeyTitle,
    path,
    children
 }): JSX.Element => {
     const { link } = useStyles();

    return (
        <NavLink to={ path } className={ link }>
            <ListItem button>
                <ListItemIcon>
                    { icon() }
                </ListItemIcon>
                <ListItemText>
                    <Trans i18nKey={ i18nKeyTitle }/>
                </ListItemText>
                {children}
            </ListItem>
        </NavLink>
    );
};

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    link: {
        color: theme.palette.primary.contrastText,
        textDecoration: 'none'
    }
    }),
);

export default ListItemLink;