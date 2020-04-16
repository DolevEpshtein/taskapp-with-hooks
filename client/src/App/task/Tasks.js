import React, { useState, useEffect, useReducer } from 'react';
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
import filterReducer from '../reducers/tasksFilterReducer';

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
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');
  const jwt = auth.isAuthenticated();
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await list({ t: jwt.token });
      if (data && data.error) {
        console.log(data.error);
      } else {
        setTasks(data);
      }
    };
    
    fetchData();
  }, [jwt.token]);

  const handleShowAll = () => {
    dispatchFilter({ type: 'SHOW_ALL' });
  };

  const handleShowComplete = () => {
    dispatchFilter({ type: 'SHOW_COMPLETE' });
  };

  const handleShowIncomplete = () => {
    dispatchFilter({ type: 'SHOW_INCOMPLETE' });
  };

  const handleFilter = e => {
    switch(e.target.value) {
      case 'ALL': {
        handleShowAll();
        break;
      }
      case 'COMPLETE': {
        handleShowComplete();
        break;
      }
      case 'INCOMPLETE': {
        handleShowIncomplete();
        break;
      }
      default:
        handleShowAll();
    }
  };

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

  const filteredTasks = tasks.filter(task => {
    if (filter === 'ALL') {
      return true;
    }
    if (filter === 'COMPLETE' && task.completed) {
      return true;
    }
    if (filter === 'INCOMPLETE' && !task.completed) {
      return true;
    }
    return false;
  });

  const removeTask = (task) => {
    const updatedTasks = [...tasks];
    const index = updatedTasks.indexOf(task);
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };
  
  return ( 
    <Paper className={classes.root} elevation={4}>
      <Typography 
        type="title" 
        variant="h6" 
        className={classes.title}>
        My Tasks
      </Typography>
      <Select
      native
      value={filter}
      onChange={handleFilter}
      inputProps={{
        name: 'completed-filter',
        id: 'age-native-simple',
      }}
    >
      <option aria-label="None" value={'ALL'}>Filter</option>
      <option value={'COMPLETE'} >Completed</option>
      <option value={'INCOMPLETE'} >Not Completed</option>
    </Select> 
      <List dense>
        {filteredTasks.map((item, i) => {
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
                    <Link to={"/tasks/" + filteredTasks[i]._id}>
                      <IconButton aria-label="Edit" color="primary">
                        <Edit/>
                      </IconButton>
                    </Link>
                    <DeleteTask task={filteredTasks[i]}
                     taskId={filteredTasks[i]._id} onRemove={removeTask}/>
                  </ListItemSecondaryAction>
                </ListItem>
        )})}
      </List>
    </Paper>
  )
};
