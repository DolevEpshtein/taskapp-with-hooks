import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardContent} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/styles';import auth from './../auth/auth-helper';
import {read, update} from './api-user.js';
import { Redirect } from 'react-router-dom';

const styles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}));

export default function EditProfile(props) {
  const classes = styles();
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: '',
    redirectToProfile: false
  });

  const jwt = auth.isAuthenticated();
  const userId = props.match.params.userId;

  useEffect(() => {
    const fetchData = async () => {
      const data = await read({ userId }, { t: jwt.token });
      if (data && data.error) {
        setValues(values => ({ ...values, error: data.error }));
      } else {
        setValues(values => ({
          ...values,
          name: data.name || undefined,
          email: data.email || undefined
      }));
      }
    };

    fetchData();
  }, [userId, jwt.token]);
 
  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    };
    const updateData = async () => {
      const data = await update({ userId }, { t: jwt.token }, user);
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({...values, userId: data._id, redirectToProfile: true});
      }
    };

    updateData();
  };

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})
  }

  if (values.redirectToProfile) {
    return (<Redirect to={'/user/' + values.userId}/>)
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography 
          type="headline" 
          component="h2" 
          className={classes.title}>
          Edit Profile
        </Typography>
        <TextField 
          id="name" 
          label="Name" 
          className={classes.textField} 
          value={values.name} 
          onChange={handleChange('name')}
          margin="normal"/><br/>
        <TextField 
          id="email" 
          type="email" 
          label="Email" 
          className={classes.textField} 
          value={values.email} 
          onChange={handleChange('email')} 
          margin="normal"/><br/>
        <TextField 
          id="password" 
          type="password" 
          label="Password" 
          className={classes.textField} 
          value={values.password} 
          onChange={handleChange('password')} 
          margin="normal"/>
        <br/> {
          values.error && (<Typography component="p" color="error">
            <Icon color="error" className={classes.error}>error</Icon>
            {values.error}
          </Typography>)
        }
      </CardContent>
      <CardActions>
        <Button 
          color="primary" 
          variant="contained" 
          onClick={clickSubmit} 
          className={classes.submit}>Submit</Button>
      </CardActions>
    </Card>
  )
};