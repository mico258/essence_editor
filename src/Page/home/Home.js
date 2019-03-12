import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import logo from "../../logo.svg";



const styles = theme => ({

});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { classes }= this.props;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }

}


export default withStyles(styles)(Home);
