import React, { useState } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import auth from './../auth/auth-helper'
import { remove } from './api-user.js'
import { Redirect } from 'react-router-dom'

export default function DeleteUser({ userId }) {
  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = useState(false);
  const jwt = auth.isAuthenticated();

  const clickButton = () => {
    setOpen(true);
  };

  const deleteAccount = () => {
    remove({
      userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        auth.signout(() => console.log('deleted'))
        setRedirect(true);      }
    })
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  if (redirect) {
    return <Redirect to='/'/>
  };

  return (<span>
    <IconButton 
      aria-label="Delete" 
      onClick={clickButton} 
      color="secondary">
      <DeleteIcon/>
    </IconButton>

    <Dialog 
      open={open} 
      onClose={handleRequestClose}>
      <DialogTitle>{"Delete Account"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Confirm to delete your account.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRequestClose} color="primary">
          Cancel
        </Button>
        <Button 
          onClick={deleteAccount} 
          color="secondary" 
          autoFocus="autoFocus">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  </span>)
};

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired
};