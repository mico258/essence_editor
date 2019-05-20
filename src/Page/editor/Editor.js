import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import {
    mxGraph,
    mxRubberband,
    mxKeyHandler,
    mxClient,
    mxUtils,
    mxStylesheet,
    mxPerimeter,
    mxConstants,
    mxToolbar,
    mxEvent
} from "mxgraph-js";
import SideBar from './../../Component/sideBar/SideBar'
import './Editor.css'
import { black } from "ansi-colors";
import Alpha from "../../Assets/EssenceKernel/Alpha.png";
import ActivityPng from "../../Assets/EssenceKernel/Activity.png";
import ActivitySpacePng from "../../Assets/EssenceKernel/Activity_Space.png";
import CompetencyPng from "../../Assets/EssenceKernel/Competency.png";
import WorkProductPng from "../../Assets/EssenceKernel/Work_Product.png";


export default class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graph_global : null,
            essence_componen :[],
            essence_kernel: [
                {
                  id :1 ,
                  name: 'box1 ',
                  x: 200,
                  y: 120,
                  width: 80,
                  height: 30,
                  style: 'fillColor=blue'


                },
                {
                    id :2 ,
                    name: 'box2',
                    x: 300,
                    y: 120,
                    width: 80,
                    height: 30,
                    style: 'fillColor=yellow'
                }

            ],
            edge: [
                {
                    id:1,
                    name:'edge test',
                    from: '',
                    to: '',
                }

            ]
        };
        this.refreshGraph = this.refreshGraph.bind(this);
        this.LoadGraph = this.LoadGraph.bind(this);
        this.addAlpha = this.addAlpha.bind(this);
        this.addActivity = this.addActivity.bind(this);
        this.addActivitySpace = this.addActivitySpace.bind(this);
        this.addCompetency = this.addCompetency.bind(this);
        this.addWorkProduct = this.addWorkProduct.bind(this);
    }

    componentDidMount() {
        this.LoadGraph();
    }

    addAlpha() {

        let newAlpha = {
            name: 'TESTTTTT',
            type: 'Alpha',
            x: 500,
            y: 120,
            width: 80,
            height: 30,
            style: 'Alpha'
        }

        this.state.essence_kernel.push(newAlpha)

        var graph = this.state.graph_global;


        // Gets the default parent for inserting new cells. This is normally the first
        // child of the root (ie. layer 0).
        var parent = graph.getDefaultParent();

        let a = this.state.graph_global.insertVertex(
            parent,
            null,
            newAlpha.name,
            newAlpha.x,
            newAlpha.y,
            newAlpha.width,
            newAlpha.height,
            newAlpha.style);
        this.state.essence_componen.push(a);


        this.refreshGraph();

    }

    addActivity() {

        let newActivity = {
            name: 'A1',
            type: 'Activity',
            x: 500,
            y: 160,
            width: 80,
            height: 30,
            style: 'Activity'
        }

        this.state.essence_kernel.push(newActivity)

        var graph = this.state.graph_global;


        // Gets the default parent for inserting new cells. This is normally the first
        // child of the root (ie. layer 0).
        var parent = graph.getDefaultParent();

        let a = this.state.graph_global.insertVertex(
            parent,
            null,
            newActivity.name,
            newActivity.x,
            newActivity.y,
            newActivity.width,
            newActivity.height,
            newActivity.style);
        this.state.essence_componen.push(a);


        this.refreshGraph();

    }

    addActivitySpace() {

        let newActivitySpace = {
            name: 'AS1',
            type: 'ActivitySpace',
            x: 500,
            y: 200,
            width: 80,
            height: 30,
            style: 'ActivitySpace'
        }

        this.state.essence_kernel.push(newActivitySpace)

        var graph = this.state.graph_global;


        // Gets the default parent for inserting new cells. This is normally the first
        // child of the root (ie. layer 0).
        var parent = graph.getDefaultParent();

        let a = this.state.graph_global.insertVertex(
            parent,
            null,
            newActivitySpace.name,
            newActivitySpace.x,
            newActivitySpace.y,
            newActivitySpace.width,
            newActivitySpace.height,
            newActivitySpace.style);
        this.state.essence_componen.push(a);


        this.refreshGraph();

    }

    addCompetency() {

        let newCompetency = {
            name: 'C1',
            type: 'Competency',
            x: 500,
            y: 240,
            width: 80,
            height: 30,
            style: 'Competency'
        }

        this.state.essence_kernel.push(newCompetency)

        var graph = this.state.graph_global;


        // Gets the default parent for inserting new cells. This is normally the first
        // child of the root (ie. layer 0).
        var parent = graph.getDefaultParent();

        let a = this.state.graph_global.insertVertex(
            parent,
            null,
            newCompetency.name,
            newCompetency.x,
            newCompetency.y,
            newCompetency.width,
            newCompetency.height,
            newCompetency.style);
        this.state.essence_componen.push(a);


        this.refreshGraph();

    }

    addWorkProduct() {

        let newWorkProduct = {
            name: 'WP1',
            type: 'WorkProduct',
            x: 500,
            y: 240,
            width: 80,
            height: 30,
            style: 'WorkProduct'
        }

        this.state.essence_kernel.push(newWorkProduct)

        var graph = this.state.graph_global;


        // Gets the default parent for inserting new cells. This is normally the first
        // child of the root (ie. layer 0).
        var parent = graph.getDefaultParent();

        let a = this.state.graph_global.insertVertex(
            parent,
            null,
            newWorkProduct.name,
            newWorkProduct.x,
            newWorkProduct.y,
            newWorkProduct.width,
            newWorkProduct.height,
            newWorkProduct.style);
        this.state.essence_componen.push(a);


        this.refreshGraph();

    }

    refreshGraph() {

        var container = ReactDOM.findDOMNode(this.refs.divGraph);

        // Checks if the browser is supported
        if (!mxClient.isBrowserSupported()) {
            // Displays an error message if the browser is not supported.
            mxUtils.error("Browser is not supported!", 200, false);
        } else {
            // Disables the built-in context menu
            mxEvent.disableContextMenu(container);

            // Creates the graph inside the given container
            var graph = this.state.graph_global;


            // Gets the default parent for inserting new cells. This is normally the first
            // child of the root (ie. layer 0).



            graph.getModel().beginUpdate();

            try {

                // var e1 = graph.insertEdge(
                //     parent,
                //     null,
                //     "",
                //     v1,
                //     v2,
                //     "strokeWidth=2;endArrow=block;endSize=2;endFill=1;strokeColor=blue;rounded=1;"
                // );
                // var e2 = graph.insertEdge(parent, null, "Edge 2", v2, v3);
                // var e3 = graph.insertEdge(parent, null, "Edge 3", v1, v3);

                //data
            } finally {
                // Updates the display
                graph.getModel().endUpdate();
            }

            // Enables rubberband (marquee) selection and a handler for basic keystrokes
            var rubberband = new mxRubberband(graph);
            var keyHandler = new mxKeyHandler(graph);
        }

    }


    LoadGraph() {
        var container = ReactDOM.findDOMNode(this.refs.divGraph);
        console.log(container);
        var zoomPanel = ReactDOM.findDOMNode(this.refs.divZoom);

        // Checks if the browser is supported
        if (!mxClient.isBrowserSupported()) {
            // Displays an error message if the browser is not supported.
            mxUtils.error("Browser is not supported!", 200, false);
        } else {
            // Disables the built-in context menu
            mxEvent.disableContextMenu(container);

            // Creates the graph inside the given container







            this.state.graph_global = new mxGraph(container);

            // Enables rubberband selection
            new mxRubberband(this.state.graph_global);

            // Gets the default parent for inserting new cells. This is normally the first
            // child of the root (ie. layer 0).
            var parent = this.state.graph_global.getDefaultParent();

            // Enables tooltips, new connections and panning
            this.state.graph_global.setPanning(true);
            this.state.graph_global.setTooltips(true);
            this.state.graph_global.setConnectable(true);
            this.state.graph_global.setEnabled(true);
            this.state.graph_global.setEdgeLabelsMovable(true);
            this.state.graph_global.setVertexLabelsMovable(true);
            this.state.graph_global.setGridEnabled(true);
            this.state.graph_global.setAllowDanglingEdges(false);
            // graph.splitEnabled = false;





            var Activity = new Object();
            Activity[mxConstants.STYLE_SHAPE] = mxConstants.STYLE_IMAGE;
            Activity[mxConstants.STYLE_IMAGE] = ActivityPng;
            Activity[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
            this.state.graph_global.getStylesheet().putCellStyle('Activity', Activity)

            var ActivitySpace = new Object();
            ActivitySpace[mxConstants.STYLE_SHAPE] = mxConstants.STYLE_IMAGE;
            ActivitySpace[mxConstants.STYLE_IMAGE] = ActivitySpacePng;
            ActivitySpace[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
            this.state.graph_global.getStylesheet().putCellStyle('ActivitySpace', ActivitySpace)

            var Competency = new Object();
            Competency[mxConstants.STYLE_SHAPE] = mxConstants.STYLE_IMAGE;
            Competency[mxConstants.STYLE_IMAGE] = CompetencyPng;
            Competency[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
            this.state.graph_global.getStylesheet().putCellStyle('Competency', Competency)

            var WorkProduct = new Object();
            WorkProduct[mxConstants.STYLE_SHAPE] = mxConstants.STYLE_IMAGE;
            WorkProduct[mxConstants.STYLE_IMAGE] = WorkProductPng;
            WorkProduct[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
            this.state.graph_global.getStylesheet().putCellStyle('WorkProduct', WorkProduct)

            var Alphastyle = new Object();
            Alphastyle[mxConstants.STYLE_SHAPE] = mxConstants.STYLE_IMAGE;
            Alphastyle[mxConstants.STYLE_IMAGE] = Alpha;
            Alphastyle[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
            this.state.graph_global.getStylesheet().putCellStyle('Alpha', Alphastyle)


            // console.log(this.state.graph_global.getStylesheet())




            this.state.graph_global.getModel().beginUpdate();

            try {
                //mxGrapg component
                var doc = mxUtils.createXmlDocument();
                var node = doc.createElement("Node");
                node.setAttribute("ComponentID", "[P01]");
                this.state.essence_componen = [];
                for (var key in this.state.essence_kernel) {
                    var component = this.state.essence_kernel[key];

                    let a = this.state.graph_global.insertVertex(
                        parent,
                        null,
                        component.name,
                        component.x,
                        component.y,
                        component.width,
                        component.height,
                        'Alpha')
                    this.state.essence_componen.push(a);
                }
                console.log(this.state.essence_componen)
                // var e1 = graph.insertEdge(
                //     parent,
                //     null,
                //     "",
                //     v1,
                //     v2,
                //     "strokeWidth=2;endArrow=block;endSize=2;endFill=1;strokeColor=blue;rounded=1;"
                // );
                // var e2 = this.state.graph_global.insertEdge(parent, null, "Edge 2", this.state.essence_kernel[0], this.state.essence_kernel[1]);

                //data
            } finally {
                // Updates the display
                this.state.graph_global.getModel().endUpdate();
            }

            // Enables rubberband (marquee) selection and a handler for basic keystrokes
            var rubberband = new mxRubberband(this.state.graph_global);
            var keyHandler = new mxKeyHandler(this.state.graph_global);

            console.log(keyHandler)


            // keyboard delete hit
            // keyHandler.bindKey(46, function(evt)
            // {
            //     console.log("Delete key pressed ...")
            //     if (this.state.graph_global.isEnabled())
            //     {
            //         this.state.graph_global.removeCells();
            //     }
            // });

            // keyboard backspace hit

            keyHandler.bindKey(8, function()
            {

                if (this.state.graph_global.isEnabled())
                {
                    this.state.graph_global.removeCells();
                }
            });

        }
    }
    render() {
        return (
            <div>
                <div className="sidenav">
                    <button onClick={this.addAlpha}><img src={Alpha}/></button>
                    <button onClick={this.addActivity}><img src={ActivityPng}/></button>
                    <button onClick={this.addActivitySpace}><img src={ActivitySpacePng}/></button>
                    <button onClick={this.addCompetency}><img src={CompetencyPng}/></button>
                    <button onClick={this.addWorkProduct}><img src={WorkProductPng}/></button>
                </div>
                <div className="App" id="page-wrap">

                    <div className="graph-container" ref="divGraph" id="divGraph" />
                </div>
            </div>

        )
    }
}
