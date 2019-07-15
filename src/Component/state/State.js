import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import {Grid, Paper, TextField,} from '@material-ui/core';
import Button from "@material-ui/core/Button/Button";
import { Redirect } from 'react-router';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';


const styles = theme => ({
    state: {
        // position: 'static',
        // width: theme.spacing.unit * 90,
        // backgroundColor: theme.palette.background.paper,
        // boxShadow: theme.shadows[5],
        // padding: theme.spacing.unit * 4,
        // outline: 'none',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
    },
    paper: {
        position: 'static',
        width: theme.spacing.unit * 90,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
    },
});


class State extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.state.name,
            description: this.props.state.description,

            checkList : this.props.state.checkList ? this.props.state.checkList : []

        }
    }

    updateState (event) {
        let field = event.target.name;
        this.state[field] = event.target.value

    }

    saveStateAlpha() {

        this.props.saveStateAlpha(this.props.index , this.state)
    }



    render() {
        const { classes }= this.props;
        const checkList = this.state.checkList
        return (
            <div onChange={this.saveStateAlpha.bind(this)}>
                <TextField id="name"
                           fullWidth
                           label="State Name "
                           name="name"
                           className={classes.state}
                           onChange={this.updateState.bind(this)}
                           defaultValue={this.state.name}
                >
                </TextField>

                <TextField id="description"
                           fullWidth
                           label="State Description"
                           multiline
                           name="description"
                           onChange={this.updateState.bind(this)}
                           defaultValue={this.state.description}
                >
                </TextField>

                <br/>
                {this.state.checkList.map((data, index) =>
                    <TextField
                        fullWidth
                        key={index}
                        value={data}
                        label={"Checklist "+ (index+1) }
                        // onChange={event => this.state.intention[index] = event.target.value }
                        onChange={event => this.setState({
                            checkList: [
                                ...checkList.slice(0, index),
                                event.target.value,
                                ...checkList.slice(index + 1)
                            ]
                        }) }    >
                    </TextField>




                )}
                <br/>
                <br/>

                <Fab color="primary" size="small">
                <AddIcon  onClick={() => this.setState({checkList: [...checkList, '']})}>
                    Add Checklist
                </AddIcon>
                </Fab>
                <br/>
                <br/>
            </div>

        )
    }



}



export default withStyles(styles)(State);
