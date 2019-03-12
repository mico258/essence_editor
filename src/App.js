import React, { Component } from 'react';
import Router from './Router';
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import logo from './logo.svg';
import './App.css';
import {
    MuiThemeProvider,
    createMuiTheme,
} from '@material-ui/core/styles';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    Button
} from '@material-ui/core';

class App extends Component {
  render() {
    return (
        <Router />
    );
  }
}

export default App;
