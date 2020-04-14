import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import { List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Person from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';
import DeleteUser from './DeleteUser';
import auth from './../auth/auth-helper';
import { read } from './api-user.js';
import { Redirect, Link } from 'react-router-dom';

const styles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle
  }
}));

export default function Profile({ match }) {
  const classes = styles();
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);

  const userId = match.params.userId;
  const jwt = auth.isAuthenticated();


  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal

    read({
      userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        setUser(data);
      }
    });

    return function cleanup(){
      abortController.abort();
    };
  }, [userId, jwt.token]);

  if (redirectToSignin) {
    return <Redirect to='/signin'/>
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography type="title" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email}/> {
            auth.isAuthenticated().user && 
              auth.isAuthenticated().user._id === user._id && 
            (<ListItemSecondaryAction>
              <Link to={"/user/edit/" + user._id}>
                <IconButton aria-label="Edit" color="primary">
                  <Edit/>
                </IconButton>
              </Link>
              <DeleteUser userId={user._id}/>
            </ListItemSecondaryAction>)
          }
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemText primary={"Joined: " + (
            new Date(user.created)).toDateString()}/>
        </ListItem>
      </List>
    </Paper>
  );
};