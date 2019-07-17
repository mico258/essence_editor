import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import logo from "../../essence.png";
import Modal from '@material-ui/core/Modal';
import NewMethod from './../../Component/newMethod/NewMethod'
import Button from '@material-ui/core/Button';
import {Redirect} from "react-router-dom";
import EssenceAPI from "./../../Api/EssenceAPI"
// import from '@material-ui'



const styles = theme => ({

});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            methodList:[

            ],
            loading : true,
            openForm : false
        }
        EssenceAPI.get('/method')
            .then(response=> {
                console.log(response)
                for(var i = 0 ; i < response.length ; i++) {
                    this.state.methodList.push(
                        {
                            "id" : response[i]._id,
                            "name" : response[i].name
                        }
                    )
                }
                this.setState({loading : false});
                console.log(this.state)
            }).catch(err => {
            console.log(err)
        })



    };

    openModal() {
        this.setState({
            openForm: true
        })
    };

    handleClose() {
        this.setState({
            openForm: false
        })
    };


    render() {
        const { classes }= this.props;
        if (this.state.loading) {
            return (
                <div className="loader"></div>
            );
        } else {

            return (
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <p>
                            Design your method in Essence Standard
                        </p>

                        <span>

                </span>
                        {this.state.methodList.map((value, key) =>
                            <Grid><a href={'/editor/'+value.id}>{value.name}</a></Grid>
                        )}
                        <Modal open={this.state.openForm} onClose={this.handleClose.bind(this)}>
                            <NewMethod history={this.props.history}  cancel={this.handleClose.bind(this)}/>
                        </Modal>
                        <br/>
                        <Button variant="contained" color="primary" onClick={this.openModal.bind(this)}>New Method</Button>

                    </header>
                    <body className="App-body">


                    </body>

                </div>

            );
        }

    }

}


export default withStyles(styles)(Home);
