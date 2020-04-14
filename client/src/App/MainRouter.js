import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home'
import Tasks from './task/Tasks';
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import EditTask from './task/EditTask';
import CreateTask from './task/CreateTask';
import NotFoundPage from './core/NotFoundPage';
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'

function MainRouter() {
    return (<div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>
        <PrivateRoute path="/tasks/create" component={CreateTask} />
        <PrivateRoute path="/tasks/:taskId" component={EditTask} />
        <Route path="/tasks" component={Tasks}/>
        <Route component={NotFoundPage} />
      </Switch>
    </div>)
}

export default MainRouter;