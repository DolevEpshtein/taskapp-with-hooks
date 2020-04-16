import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { indigo, pink } from '@material-ui/core/colors';
import MainRouter from '../src/App/MainRouter';

const theme = createMuiTheme({
  palette: {
    primary: {
    light: '#757de8',
    main: '#3f51b5',
    dark: '#002984',
    contrastText: '#fff',
  },
  secondary: {
    light: '#ff79b0',
    main: '#ff4081',
    dark: '#c60055',
    contrastText: '#000',
  },
    openTitle: indigo['400'],
    protectedTitle: pink['400'],
    type: 'light'
  }
});

render((
  <BrowserRouter>
  <ThemeProvider theme={theme}>
    <MainRouter/>
  </ThemeProvider>
</BrowserRouter>
), document.getElementById('root'));