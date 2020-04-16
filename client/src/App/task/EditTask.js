import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import auth from './../auth/auth-helper';
import { read, update } from './api-task.js';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

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
  largeTextField: {
    width: 450,
    rows: 4
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}));

export default function EditTask({ match }) {
  const classes = styles();
  const [values, setValues] = useState({
    description: '',
    redirectToTasks: false,
    error: ''
  });
  const jwt = auth.isAuthenticated();
  const taskId = match.params.taskId;

  const handleChange = (event) => {
    setValues({...values, description: event.target.value })
  };

  useEffect(() => { 
    const updateData = async () => {
    const data = await read({ taskId }, { t: jwt.token });
    if (data && data.error) {
      setValues(values => ({
        ...values, 
        error: data.error
      }));
    } else {
        setValues(values => ({
          ...values,
          description: data.description
        }));
    }
  };

  updateData();
}, [jwt.token, taskId]);

  const clickSubmit = () => {
    const task = {
      description: values.description || undefined
    };
    const updateData = async () => {
      const data = await update({ taskId }, { t: jwt.token }, task);
      if (data && data.error) {
        setValues({
          ...values, 
          error: data.error
        })
      } else {
        setValues({
          ...values,
          taskId,
          redirectToTasks: true
        });
      }
    };
    
    updateData();
  };

  if (values.redirectToTasks) {
    return (<Redirect to={'/tasks'}/>)
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography 
          type="headline" 
          component="h2" 
          className={classes.title}>
          Edit Task
        </Typography>
        <TextField
          id="description"
          label="Description" 
          className={classes.largeTextField} 
          multiline rows="4" 
          value={values.description} 
          onChange={handleChange} 
          margin="normal"/><br/>
        <br/> {
              values.error && (<Typography 
              component="p" 
              color="error">
            <Icon color="error" className={classes.error}>{values.error}</Icon>
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