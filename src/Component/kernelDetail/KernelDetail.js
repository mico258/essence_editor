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

class NewMethod extends Component {
    constructor(props) {
        super(props);

        this.data = this.props.essence_kernel;
        this.state = {
            name: 'TEST',
            description: '',
            author: '',
            createdMethod: false,
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

    updateState (event) {
        let field = event.target.name;
        this.state[field] = event.target.value
    }

    saveAlpha() {

        this.props.graph_global.cellLabelChanged(this.props.essence_kernel, this.state.alpha_name)
        // this.state.graph.cellLabelChanged(this.state.data, "Change Test");
    }

    saveActivitySpace() {

        this.props.graph_global.cellLabelChanged(this.props.essence_kernel, this.state.activity_space_name)
        // this.state.graph.cellLabelChanged(this.state.data, "Change Test");
    }

    saveActivity() {

        this.props.graph_global.cellLabelChanged(this.props.essence_kernel, this.state.activity_name)
        // this.state.graph.cellLabelChanged(this.state.data, "Change Test");
    }

    saveCompetency() {

        this.props.graph_global.cellLabelChanged(this.props.essence_kernel, this.state.competency_name)
        // this.state.graph.cellLabelChanged(this.state.data, "Change Test");
    }

    saveWorkProduct() {

        this.props.graph_global.cellLabelChanged(this.props.essence_kernel, this.state.work_product_name)
        // this.state.graph.cellLabelChanged(this.state.data, "Change Test");
    }

    render() {
        const { classes }= this.props;
        const data = this.props.essence_kernel;

        if (data !=undefined) {
            if (data.style === 'Alpha') {
                return (
                    <div className={classes.paper}>Edit Detail

                        <TextField id="alpha_name"
                                   fullWidth
                                   label="Alpha Name"
                                   name="alpha_name"
                                   onChange={this.updateState.bind(this)}
                                   defaultValue={data.value}
                        >
                        </TextField>
                        <br/>

                        <TextField id="alpha_description"
                                   fullWidth
                                   label="Alpha Description"
                                   onChange={this.updateState.bind(this)}
                                   name="alpha_description">
                        </TextField>
                        <br/>
                        State :
                        <br/>
                        Sub Alpha :
                        <br/>

                        <Button onClick={this.saveAlpha.bind(this)}>
                            Save
                        </Button>
                    </div>

                );
            } else if (data.style === 'Competency') {
                return (
                    <div className={classes.paper}>Edit Competency Detail
                        <br/><br/>
                        <TextField id="competency_name"
                                   fullWidth
                                   label="Competency Name"
                                   name="competency_name"
                                   onChange={this.updateState.bind(this)}
                                   defaultValue={data.value}
                        >
                        </TextField>
                        <br/>
                        <br/>
                        <TextField id="competency_description"
                                   fullWidth
                                   label="Competency Description"
                                   onChange={this.updateState.bind(this)}
                                   name="competency_description"
                        >
                        </TextField>
                        <br/>
                        <br/>
                        Level
                        <br/>
                        <br/>
                        <input type="checkbox" name="Assists" value="Assists"/>Assists
                        <input type="checkbox" name="Applies" value="Applies"/>Applies
                        <input type="checkbox" name="Masters" value="Masters"/>Masters
                        <input type="checkbox" name="Adapt" value="Adapt"/>Adapt
                        <input type="checkbox" name="Innovates" value="Innovates"/>Innovates
                        <br/>
                        <br/>
                        <Button onClick={this.saveCompetency.bind(this)} color="primary">
                            Save Data
                        </Button>
                    </div>

                );
            } else if (data.style === 'Activity') {
                return (
                    <div className={classes.paper}>Edit Activity Detail
                        <br/><br/>
                        <TextField id="activity_name"
                                   fullWidth
                                   label="Activity Name"
                                   name="activity_name"
                                   onChange={this.updateState.bind(this)}
                                   defaultValue={data.value}
                        >
                        </TextField>
                        <br/>
                        <br/>
                        <TextField id="activity_description"
                                   fullWidth
                                   onChange={this.updateState.bind(this)}
                                   label="Activity Description"
                                   name="activity_description"
                        >
                        </TextField>
                        <br/>
                        <br/>

                        Complete Criterion :

                        <br/>
                        <br/>

                        Entry Criterion :

                        <br/>
                        <br/>

                        Competencies :

                        <br/>
                        <br/>
                        <Button onClick={this.saveActivity.bind(this)} color="primary">
                            Save Data
                        </Button>
                    </div>

                );
            }else if (data.style === 'ActivitySpace') {
                return (
                    <div className={classes.paper}>Edit Activity Space Detail
                        <br/><br/>
                        <TextField id="activity_space_name"
                                   fullWidth
                                   label="Activity Space Name"
                                   name="activity_space_name"
                                   onChange={this.updateState.bind(this)}
                                   defaultValue={data.value}
                        >
                        </TextField>
                        <br/>
                        <br/>
                        <TextField id="activity_space_description"
                                   fullWidth
                                   label="Activity Space Description"
                                   name="activity_space_description"
                                   onChange={this.updateState.bind(this)}
                        >
                        </TextField>
                        <br/>
                        <br/>

                        Activity List
                        <br/>
                        <br/>

                        <br/>
                        <br/>
                        <Button onClick={this.saveActivitySpace.bind(this)} color="primary">
                            Save Data
                        </Button>
                    </div>

                );
            } else if (data.style === 'WorkProduct') {
                return (
                    <div className={classes.paper}>Edit Work Product Detail
                        <br/><br/>
                        <TextField id="work_product_name"
                                   fullWidth
                                   label="Work Product Name"
                                   name="work_product_name"
                                   defaultValue={data.value}
                                   onChange={this.updateState.bind(this)}
                        >
                        </TextField>
                        <br/>
                        <br/>
                        <TextField id="work_product_description"
                                   fullWidth
                                   onChange={this.updateState.bind(this)}
                                   label="Work Product Description"
                                   name="work_product_description"
                        >
                        </TextField>
                        <br/>
                        <br/>
                        <TextField id="work_product_level_detail"
                                   fullWidth
                                   onChange={this.updateState.bind(this)}
                                   label="Work Product Level Detail"
                                   name="work_product_level_detail"
                        >
                        </TextField>
                        <br/>
                        <br/>
                        <Button onClick={this.saveWorkProduct.bind(this)} color="primary">
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
                                   name="name"
                                   onChange={this.updateState.bind(this)}
                                   defaultValue={data.value}
                        >
                        </TextField>
                        XXXXXXX
                        <br/>
                        {data.value}
                        <br/>
                        <TextField id="description"
                                   fullWidth
                                   onChange={this.updateState.bind(this)}
                                   label="Method Description"
                                   name="description">
                        </TextField>
                        <br/>
                        <TextField id="author"
                                   fullWidth
                                   onChange={this.updateState.bind(this)}
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

}


export default withStyles(styles)(NewMethod);
