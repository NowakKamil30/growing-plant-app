/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { User } from '../interfaces/User';
import { Trans } from 'react-i18next';

interface UserCardProps {
    i18nTitle: string
    user?: User
}

const UserCard: React.FC<UserCardProps> = ({
    user,
    i18nTitle
}): JSX.Element => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            <Trans i18nKey={ i18nTitle }/>
        </Typography>
        <Typography variant="h5" component="h2">
        </Typography>
        <Typography variant="body2" component="p">
            <Typography className={classes.pos} color="textSecondary">
                {user?.firstName}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
                {user?.lastName}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
                {user?.email}
            </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UserCard;

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 25,
    },
    pos: {
      marginBottom: 12,
      fontSize: 20
    },
  });