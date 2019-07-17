import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import {Grid, Paper, TextField,} from '@material-ui/core';
import Button from "@material-ui/core/Button/Button";
import { Redirect } from 'react-router';
import State from "../../Component/state/State";


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
        overflow: 'scroll',
        width: theme.spacing.unit * 90,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        height: '80%',
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
            alphaState : this.props.essence_kernel.detail.state ? this.props.essence_kernel.detail.state : [],
            level_of_detail : this.props.essence_kernel.detail.level_of_detail ? this.props.essence_kernel.detail.level_of_detail : []

        }

        this.saveStateAlpha = this.saveStateAlpha.bind(this);
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

    checkedState (event) {
        let field = event.target.name;
        if(event.target.checked) {
            this.state[field] = event.target.value
        } else {
            this.state[field] = ''
        }

    }

    saveAlpha() {


        let alpha_id = this.props.essence_kernel.id
        if (this.state.alpha_name) {
            this.props.graph_global.cellLabelChanged(this.props.essence_kernel, this.state.alpha_name)
            // this.state.graph.cellLabelChanged(this.state.data, "Change Test");
        }


        if (this.state.alpha_description) {
            this.props.essence_kernels.filter(function (data) {
                return data.id === alpha_id
            })[0].detail.description = this.state.alpha_description

        }

        this.props.essence_kernels.filter(function (data) {
            return data.id === alpha_id
        })[0].detail.state = this.state.alphaState


        // this.state.graph.cellLabelChanged(this.state.data, "Change Test");
        this.props.closeForm()
    }

    saveActivitySpace() {

        let activity_space_id = this.props.essence_kernel.id
        if (this.state.activity_space_name) {
            this.props.graph_global.cellLabelChanged(this.props.essence_kernel, this.state.activity_space_name)
            // this.state.graph.cellLabelChanged(this.state.data, "Change Test");
        }
        if (this.state.activity_space_description) {
            this.props.essence_kernels.filter(function (data) {
                return data.id === activity_space_id
            })[0].detail.description = this.state.activity_space_description

        }
        // this.state.graph.cellLabelChanged(this.state.data, "Change Test");
        this.props.closeForm()
    }

    saveActivity() {
        if (this.state.activity_name) {
            this.props.graph_global.cellLabelChanged(this.props.essence_kernel, this.state.activity_name)
            // this.state.graph.cellLabelChanged(this.state.data, "Change Test");
        }
        let activity_id = this.props.essence_kernel.id

        if (this.state.activity_description) {
            this.props.essence_kernels.filter(function (data) {
                return data.id === activity_id
            })[0].detail.description = this.state.activity_description

        }
        // this.state.graph.cellLabelChanged(this.state.data, "Change Test");
        this.props.closeForm()
    }

    saveCompetency() {
        if (this.state.competency_name) {
            this.props.graph_global.cellLabelChanged(this.props.essence_kernel, this.state.competency_name)
            // this.state.graph.cellLabelChanged(this.state.data, "Change Test");
        }

        let competency_id = this.props.essence_kernel.id
        let competency_detail = this.props.essence_kernels.filter(function (data) {
            return data.id === competency_id
        })[0].detail


        competency_detail.description = this.state.competency_description ? this.state.competency_description : ''


        // competency_detail.level.Assists =  this.state.Assists ? this.state.Assists : ''
        // competency_detail.level.Applies =  this.state.Applies ? this.state.Applies : ''
        // competency_detail.level.Masters =  this.state.Masters ? this.state.Masters : ''
        // competency_detail.level.Adapt =  this.state.Adapt ? this.state.Adapt : ''
        // competency_detail.level.Innovates =  this.state.Innovates ? this.state.Innovates : ''

        this.props.closeForm()
    }

    saveWorkProduct() {
        if (this.state.work_product_name) {
            this.props.graph_global.cellLabelChanged(this.props.essence_kernel, this.state.work_product_name)
            // this.state.graph.cellLabelChanged(this.state.data, "Change Test");
        }
        let work_product_id = this.props.essence_kernel.id

        if (this.state.work_product_description) {
            this.props.essence_kernels.filter(function (data) {
                return data.id === work_product_id
            })[0].detail.description = this.state.work_product_description

        }

        this.props.essence_kernels.filter(function (data) {
            return data.id === work_product_id
        })[0].detail.level_of_detail = this.state.level_of_detail
        // this.state.graph.cellLabelChanged(this.state.data, "Change Test");
        this.props.closeForm()
    }

    saveStateAlpha(index, data) {
        this.state.alphaState[index] = data;
    }

    render() {
        const { classes }= this.props;
        const data = this.props.essence_kernel;

        if (data !=undefined) {
            if (data.style === 'Alpha') {
                // const alphaState = this.props.essence_kernel.detail.state;

                // this.state.alphaState = this.props.essence_kernel.detail.state
                // this.state.alphaState = this.props.essence_kernel.detail.state;

                var alphaState = this.state.alphaState;

                return (
                    <div className={classes.paper} >Edit Detail

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
                                   multiline
                                   rows={3}
                                   label="Alpha Description"
                                   onChange={this.updateState.bind(this)}
                                   defaultValue={data.detail.description}
                                   name="alpha_description">
                        </TextField>
                        <br/>
                        State :
                        <br/> <br/>
                        {alphaState.map((alphaStateData, index) =>

                            <State state = {alphaStateData} key = {index} index={index} saveStateAlpha={this.saveStateAlpha}>

                            </State>




                        )}
                        <br/>
                        <Button variant="outlined" color="primary" onClick={() => this.setState({alphaState: [...alphaState, {
                            name : '',
                            description : '',
                            checkList : []
                            }]})}>
                            Add State
                        </Button>
                        <br/>

                        <br/>
                        Work Product :
                        {data.detail.workProduct.map((wp, key) =>
                            <li>{wp.value}</li>
                        )}
                        <br/>

                        Sub Alpha :
                        {data.detail.subAlpha.map((alpha, key) =>
                            <li>{alpha.value}</li>
                        )}
                        <br/>

                        <Button variant="contained" color="primary" onClick={this.saveAlpha.bind(this)}>
                            Save
                        </Button>
                    </div>

                );
            } else if (data.style === 'Competency') {
                this.state.Assists = data.detail.level.Assists ;
                this.state.Applies = data.detail.level.Applies ;
                this.state.Masters = data.detail.level.Masters ;
                this.state.Adapt = data.detail.level.Adapt ;
                this.state.Innovates = data.detail.level.Innovates ;
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
                                   multiline
                                   rows={3}
                                   label="Competency Description"
                                   onChange={this.updateState.bind(this)}
                                   defaultValue={data.detail.description}
                                   name="competency_description"
                        >
                        </TextField>
                        <br/>
                        <br/>
                        Level
                        <br/>
                        <br/>
                        <input defaultChecked={data.detail.level.Assists } type="checkbox" onClick={this.updateState.bind(this)} name="Assists" value="Assists"/>Assists
                        <input defaultChecked={data.detail.level.Applies } type="checkbox" onClick={this.updateState.bind(this)} name="Applies" value="Applies"/>Applies
                        <input defaultChecked={data.detail.level.Masters } type="checkbox" onClick={this.updateState.bind(this)} name="Masters" value="Masters"/>Masters
                        <input defaultChecked={data.detail.level.Adapt } type="checkbox" onClick={this.updateState.bind(this)} name="Adapt" value="Adapt"/>Adapt
                        <input defaultChecked={data.detail.level.Innovates } type="checkbox" onClick={this.updateState.bind(this)} name="Innovates" value="Innovates"/>Innovates
                        <br/>
                        <br/>
                        <Button variant="contained" color="primary" onClick={this.saveCompetency.bind(this)} color="primary">
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
                                   multiline
                                   rows={3}
                                   onChange={this.updateState.bind(this)}
                                   defaultValue={data.detail.description}
                                   label="Activity Description"
                                   name="activity_description"
                        >
                        </TextField>
                        <br/>
                        <br/>

                        Complete Criterion :<br/>
                            Alpha :
                            <br/>
                            {data.detail.completionCriterion.alphas.map((alpha, key) =>
                                <li>{alpha.value}</li>
                            )}
                            Work Product :
                            <br/>
                            {data.detail.completionCriterion.workProduct.map((data, key) =>
                                <li>{data.value}</li>
                            )}
                        <br/>
                        <br/>

                        Entry Criterion :<br/>
                            Alpha :
                            <br/>
                            {data.detail.entryCriterion.alphas.map((alpha, key) =>
                                <li>{alpha.value}</li>
                            )}
                            Work Product :
                            <br/>
                            {data.detail.entryCriterion.workProduct.map((data, key) =>
                                <li>{data.value}</li>
                            )}
                        <br/>
                        <br/>

                        Competencies :
                        {data.detail.competencies.map((value, key) =>
                            <li>{value}</li>
                        )}
                        <br/>
                        <br/>
                        <Button variant="contained" color="primary" onClick={this.saveActivity.bind(this)} color="primary">
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
                                   multiline
                                   rows={3}
                                   label="Activity Space Description"
                                   name="activity_space_description"
                                   defaultValue={data.detail.description}
                                   onChange={this.updateState.bind(this)}
                        >
                        </TextField>
                        <br/>
                        <br/>

                        Activity List
                        <br/>
                        <br/>
                        {data.detail.activity.map((activity, key) =>
                            <li>{activity.value}</li>
                        )}
                        <br/>
                        <br/>
                        <Button variant="contained" color="primary" onClick={this.saveActivitySpace.bind(this)} color="primary">
                            Save Data
                        </Button>
                    </div>

                );
            } else if (data.style === 'WorkProduct') {
                const level_of_detail = this.state.level_of_detail
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
                                   multiline
                                   rows={3}
                                   onChange={this.updateState.bind(this)}
                                   label="Work Product Description"
                                   name="work_product_description"
                                   defaultValue={data.detail.description}
                        >
                        </TextField>
                        <br/>
                        <br/>
                        {this.state.level_of_detail.map((data, index) =>
                            <TextField
                                fullWidth
                                key={index}
                                value={data}
                                label={"Level Detail "+ (index+1) }
                                // onChange={event => this.state.intention[index] = event.target.value }
                                onChange={event => this.setState({
                                    level_of_detail: [
                                        ...level_of_detail.slice(0, index),
                                        event.target.value,
                                        ...level_of_detail.slice(index + 1)
                                    ]
                                }) }    >
                            </TextField>
                        )}
                        <br/>
                        <br/>
                        <Button variant="outlined" color="primary" onClick={() => this.setState({level_of_detail: [...level_of_detail, '']})}>
                            Add level detail
                        </Button>
                        <br/>
                        <br/>
                        <Button variant="contained" color="primary" onClick={this.saveWorkProduct.bind(this)} color="primary">
                            Save Data
                        </Button>
                    </div>

                );
            } else {
                return (
                    <div className={classes.paper}>Edit Detail

                        <TextField id="name"
                                   fullWidth
                                   label="Name"
                                   name="name"
                                   onChange={this.updateState.bind(this)}
                                   defaultValue={data.value}
                        >
                        </TextField>


                        <Button variant="contained" color="primary" onClick={this.validate.bind(this)}>
                            Save
                        </Button>
                    </div>

                );
            }
        }



    }

}


export default withStyles(styles)(NewMethod);
