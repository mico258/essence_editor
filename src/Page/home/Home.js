import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import logo from "../../essence.png";
import Modal from '@material-ui/core/Modal';
import NewMethod from './../../Component/newMethod/NewMethod'
import Button from 'react-bootstrap/Button'
// import from '@material-ui'



const styles = theme => ({

});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            methodList:[
                {
                    id: 1,
                    name: 'Essence Agile'
                },
                {
                    id: 2,
                    name: 'Essence Waterfall'
                }
            ],
            openForm : false
        }
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
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Design your method in Essence Standard
                    </p>

                    <span>

                </span>
                </header>
                <body className="App-body">
                {this.state.methodList.map((value, key) =>
                    <Grid><a href={'/editor/'+value.id}>{value.name}</a></Grid>
                )}
                <Modal open={this.state.openForm} onClose={this.handleClose.bind(this)}>
                    <NewMethod/>
                </Modal>
                <Button variant="contained" color="primary" onClick={this.openModal.bind(this)}>New Method</Button>

                </body>

            </div>

        );
    }

}


export default withStyles(styles)(Home);
