import React, { useState } from 'react';
import { Card, CardActions, CardContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import auth from './../auth/auth-helper';
import { Redirect } from 'react-router-dom';
import { signin } from './api-auth.js';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
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

export default function Signin(props) {
  const classes = styles();
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false
  });

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    };

    signin(user).then((data) => {
      if (data) {
        if (data.error) {
          setValues({
            ...values,
            error: data.error
          });
        } else {
          auth.authenticate(data, () => {
            setValues({
              ...values,
              redirectToReferrer: true
            });
          })
        }
      }
    });
  };

  const handleChange = (name) => event => {
    setValues({ ...values, [name]: event.target.value })
  };

  const { from } = props.location.state || {
    from: {
      pathname: '/'
    }
  }
  
  if (values.redirectToReferrer) {
    return (<Redirect to={from}/>)
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography 
          type="headline" 
          component="h2" 
          className={classes.title}>
          Sign In
        </Typography>
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
        onChange={handleChange('password')} margin="normal"/>
        <br/> {
          values.error && (<Typography component="p" color="error">
          <Icon 
            color="error" 
            className={classes.error}>
            {values.error}
          </Icon>
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
  );
};