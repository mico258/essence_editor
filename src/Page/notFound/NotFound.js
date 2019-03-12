import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import logo from "../../logo.svg";
import './NotFound.css'


const styles = theme => ({

});

class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {


    }

    render() {
        const { classes }= this.props;
        return (
            <div>
                <div className="overlay"></div>
                <div className = "terminal">
                    <h1> Error < span className = "errorcode" > 404 </span></h1>
                    <p className = "output" > The page you are looking for might have been removed, had its name changed or is temporarily unavailable </p>
                    <p className="output">Click this link to <a href="/">go back</a></p>
                    <p className = "output" > Good luck </p>
                </div>
            </div>
        );
    }

}


export default withStyles(styles)(NotFound);
