import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import {Grid, Paper, TextField,} from '@material-ui/core';
import Button from "@material-ui/core/Button/Button";
import { Redirect } from 'react-router';


const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        width: '100%',
        'min-height': '100vh',
        top: '0',
        overflow: 'hidden'
    },
    colorPrimary: {
        backgroundColor: '#B2DFDB',
    },
    barColorPrimary: {
        backgroundColor: '#00695C',
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
    },
});

class NewMethod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'TEST',
            description: '',
            author: '',
            createdMethod: false,
            essence_kernel: null,
        }
    }

    validate (event) {
        event.preventDefault()
        if (this.state.name === '' || this.state.description === '' || this.state.author === '') {
            alert('All field is required')
        } else {
            return (<Redirect to='/' />);
        }
    }

    render() {
        const { classes }= this.props;
        const data = this.props.essence_kernel;

        if (data.style === 'Alpha') {
            return (
                <div className={classes.paper}>Edit Detail

                    <TextField id="name"
                               fullWidth
                               label="Method Name"
                               name="name">
                    </TextField>
                    Alpha Data
                    <br/>
                    {data.value}
                    <br/>
                    <TextField id="description"
                               fullWidth
                               label="Method Description"
                               name="description">
                    </TextField>
                    <br/>
                    <TextField id="author"
                               fullWidth
                               label="Creator"
                               name="author">
                    </TextField>

                    <Button onClick={this.validate.bind(this)}>
                        Save
                    </Button>
                </div>

            );
        } else if (data.style === 'Competency') {
            return (
                <div className={classes.paper}>Edit Competency Detail

                    <TextField id="competency_name"
                               fullWidth
                               label="Competency Name"
                               name="competency_name">
                    </TextField>
                    <br/>
                    <TextField id="competency_description"
                               fullWidth
                               label="Competency Description"
                               name="competency_description">
                    </TextField>
                    <br/>
                    <TextField id="competency_level"
                               fullWidth
                               label="Level"
                               name="competency_level">
                    </TextField>

                    <Button onClick={this.validate.bind(this)}>
                        Save Data
                    </Button>
                </div>

            );
        } else {
            return (
                <div className={classes.paper}>Edit Detail

                    <TextField id="name"
                               fullWidth
                               label="Method Name"
                               name="name">
                    </TextField>
                    XXXXXXX
                    <br/>
                    {data.value}
                    <br/>
                    <TextField id="description"
                               fullWidth
                               label="Method Description"
                               name="description">
                    </TextField>
                    <br/>
                    <TextField id="author"
                               fullWidth
                               label="Creator"
                               name="author">
                    </TextField>

                    <Button onClick={this.validate.bind(this)}>
                        Save
                    </Button>
                </div>

            );
        }

    }

}


export default withStyles(styles)(NewMethod);
