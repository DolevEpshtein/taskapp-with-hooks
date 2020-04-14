import React from 'react';
import { Card, CardContent, CardMedia } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import noteLogo from './../../note.jpg';

const styles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: 40
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px 
    ${theme.spacing(2)}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  }
}));


export default function Home() {
  const classes = styles();

  return ( typeof window !== "undefined" &&
    (<div>
      <Card className={classes.card}>
        <Typography 
        type="headline" 
        component="h2" 
        className={classes.title}>
          Home Page
        </Typography>
        <CardMedia 
        className={classes.media}
        image={noteLogo}
        title="Hanging Note"/>
        <CardContent>
          <Typography type="body1" component="p">
            Welcome to ToDo App HomePage
          </Typography>
        </CardContent>
      </Card>
    </div>
  ))
};