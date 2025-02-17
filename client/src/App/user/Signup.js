import React, { useState } from 'react';
import { Card, CardActions, CardContent } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/styles';
import { create } from './api-user.js';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { Link } from 'react-router-dom';

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

export default function Signup() {
  const classes = styles();
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: ''
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    }
    const createUser = async () => {
      const data = await create(user);
      if (data) {
        if (data.error) {
          console.log('signup error')
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, error: '', open: true });
        }
      }
    };

    createUser();
  };

  return (<div>
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Sign Up
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
            {values.error}</Typography>)
        }
      </CardContent>
      <CardActions>
        <Button 
          color="primary" 
          variant="contained" 
          onClick={clickSubmit} 
          className={classes.submit}>
          Submit
        </Button>
      </CardActions>
    </Card>
    <Dialog open={values.open} disableBackdropClick={true}>
      <DialogTitle>New Account</DialogTitle>
      <DialogContent>
        <DialogContentText>
          New account successfully created.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Link to="/signin">
          <Button 
            color="primary" 
            autoFocus="autoFocus" 
            variant="contained">
            Sign In
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  </div>
  )
};