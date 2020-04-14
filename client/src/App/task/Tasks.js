import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { List, ListItem, ListItemSecondaryAction, ListItemAvatar, ListItemText } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import DeleteTask from './DeleteTask';
import Select from '@material-ui/core/Select';
import CheckBox from '@material-ui/core/Checkbox';
import auth from './../auth/auth-helper';
import { Link } from 'react-router-dom';
import { list, update } from './api-task.js';
import { makeStyles } from '@material-ui/styles';

const styles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  }
}));

export default function Tasks() {
  const classes = styles();
  const [tasks, setTasks] = useState([]);
  // const [completedTasks, setCompleted] = useState([]);
  // const [incompleteTasks, setIncomplete] = useState([]);
  // const [filter, setFilter] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
   
    list({t: jwt.token}, signal).then((data) => {
        if (data && data.error) {
          console.log(data.error)
        } else {
          setTasks(data);
        }
    });
  }, [tasks, jwt.token]);

  const handleFilter = e => {
    // const filterValue = e.target.value;
    // if (filterValue === 1)
    //   setTasks(completedTasks);
    // else
    //   setTasks(incompleteTasks);
    // setFilter(e.target.value);
    //  if (filter)
    //   setTasks(completedTasks);
    // else
    //   setTasks(incompleteTasks);
      
  }

  const handleChecked = index => e => {
    let task = {
      description: tasks[index].description,
      completed: e.target.checked
    };
    let newArr = [...tasks];
    newArr[index].completed = e.target.checked;
    update({
      taskId: tasks[index]._id
    }, {
      t: jwt.token
    }, task).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setTasks(newArr);
      }
    })
  };

  return ( 
    <Paper className={classes.root} elevation={4}>
      <Typography type="title" className={classes.title}>
        My Tasks
      </Typography>
      <Select
      native
      value={''}
      onChange={handleFilter}
      inputProps={{
        name: 'completed-filter',
        id: 'age-native-simple',
      }}
    >
      <option aria-label="None" value={'no-filter'}>Filter</option>
      <option value={'completed'}>Completed</option>
      <option value={'false'}>Not Completed</option>
    </Select>
      <List dense>
        {tasks.map((item, i) => {
        return (<ListItem button key={i}>
                  <ListItemAvatar>
                    <Avatar>
                      <CheckBox 
                        checked={item.completed} 
                        onChange={handleChecked(i)} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.description} />
                  <ListItemSecondaryAction>
                    <Link to={"/tasks/" + tasks[i]._id}>
                      <IconButton aria-label="Edit" color="primary">
                        <Edit/>
                      </IconButton>
                    </Link>
                    <DeleteTask taskId={tasks[i]._id} />
                  </ListItemSecondaryAction>
                </ListItem>
        )})}
      </List>
    </Paper>
  )
};
