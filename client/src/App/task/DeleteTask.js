import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import auth from './../auth/auth-helper';
import { remove } from './api-task';
import { Redirect } from 'react-router-dom';

export default function DeleteTask(props) {
  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = useState(false);
  const jwt = auth.isAuthenticated();

  const clickButton = () => {
   setOpen(true);
  };

  const deleteTask = () => {
    const removeData = async () => {
      const data = await remove({ taskId: props.taskId }, {t: jwt.token});
      if (data && data.error) {
        console.log(data.error);
      } else {
        setRedirect(true);
        props.onRemove(props.task);
      }
    };

    removeData();
  };
  
  const handleRequestClose = () => {
    setOpen(false);
  };

  if (redirect) {
    return (<Redirect to={'/tasks'} />)
  }
  return (<span>
    <IconButton 
      aria-label="Delete" 
      onClick={clickButton} 
      color="secondary">
      <DeleteIcon/>
    </IconButton>
    <Dialog open={open} onClose={handleRequestClose}>
      <DialogTitle>{"Delete Task"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Confirm to delete this task.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRequestClose} color="primary">
          Cancel
        </Button>
        <Button onClick={deleteTask} color="secondary" autoFocus="autoFocus">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  </span>)
};