import React, { useState } from 'react';
import { Card, CardActions, CardContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { create } from './api-task.js';
import auth from './../auth/auth-helper';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

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

export default function CreateTask() {
  const classes = styles();
  const [values, setValues] = useState({
    description: '',
    open: false,
    error: ''
  });

  const jwt = auth.isAuthenticated();

  const handleChange = (event) => {
    setValues({...values, description: event.target.value })
  };

  const clickSubmit = () => {
    const task = {
      description: values.description || undefined
    };

    const createData = async () => {
      const data = await create(task, { t: jwt.token });
        if (data && data.error) {
          setValues({
            ...values, 
            error: data.error
          });
        } else {
            setValues({
              ...values, 
              error: '',
              open: true
            });
        }
      };
      
      createData();
  };

  return ( 
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography 
            type="headline" 
            component="h2" 
            className={classes.title}>
            Create Task
          </Typography>
          <TextField
            id="description" 
            label="Description" 
            className={classes.textField} 
            multiline 
            rows="4" 
            value={values.description} 
            onChange={handleChange} 
            margin="normal" />
            <br/>
            <br/> {
              values.error && (
                <Typography 
                  component="p" 
                  color="error">
                  <Icon color="error" 
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
                className={classes.submit}
                >Submit
              </Button>
            </CardActions>
            </Card>
            <Dialog open={values.open} disableBackdropClick={true}>
              <DialogTitle>New Task</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    New task successfully created.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Link to="/tasks">
                    <Button 
                      color="primary" 
                      autoFocus="autoFocus" 
                      variant="contained">
                      My Tasks
                    </Button>
                  </Link>
                </DialogActions>
            </Dialog>
    </div>);
};