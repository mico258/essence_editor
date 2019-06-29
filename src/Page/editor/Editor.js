import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import {
    mxGraph,
    mxRubberband,
    mxKeyHandler,
    mxEdgeHandler,
    mxVertexHandler,
    mxConnectionHandler,
    mxCell,
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
import Json from "../../Assets/Action/json_icon.png";
import Alpha from "../../Assets/EssenceKernel/Alpha.png";
import ActivityPng from "../../Assets/EssenceKernel/Activity.png";
import ActivitySpacePng from "../../Assets/EssenceKernel/Activity_Space.png";
import CompetencyPng from "../../Assets/EssenceKernel/Competency.png";
import WorkProductPng from "../../Assets/EssenceKernel/Work_Product.png";
import KernelDetail from "../../Component/kernelDetail/KernelDetail";
import Modal from "@material-ui/core/Modal/Modal";


export default class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openForm : false,
            graph_global : null,
            essence_component :[],
            detail_data : null,
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
        this.toJSON = this.toJSON.bind(this);
    }

    openModal() {
        this.setState({
            openForm: true
        });
    };

    handleClose() {
        this.setState({
            openForm: false
        })
    };

    componentDidMount() {
        this.LoadGraph();
    }

    toJSON() {
        const element = document.createElement("a");
        const data_json = {
            "name_id" : "ProductBacklogEssentials",
            "name": "Product Backlog Essentials",
            "description": "Capture what the users of a system want it to do as a priority-ranked list of independently buildable items",
            "intention": ["Add work tracking necessities"],
            "activitySpace" : [
                {
                    "name_id" : "UnderstandTheRequirements",
                    "name": "Understand The Requirements",
                    "description" : "Establish a shared understanding of what the system to be produced must do",
                    "activity": [
                        {
                            "name_id" : "RefineProductBacklog",
                            "name" : "Refine Product Backlog",
                            "description" : "Get and keep the Product Backlog visible, up-to-date and in good working order, with high priority items well understood",
                            "completionCriterion" :
                                {
                                    "alphas" : [
                                        "Requirements.Coherent",
                                        "ProductBacklogItem.Identified"
                                    ],
                                    "workProduct" : [
                                        "ProductBacklog.ItemsPrioritized"
                                    ]
                                },
                            "entryCriterion" :
                                {
                                    "alphas" : [],
                                    "workProduct" : [
                                        "ProductBacklog.Any"
                                    ]
                                },
                            "competencies" : [
                                "StakeholderRepresentation",
                                "Development",
                                "Analysis",
                                "Testing"
                            ]
                        },
                        {
                            "name_id" : "AgreeDefinitionOfDone",
                            "name" : "Agree Definition of Done",
                            "description" : "Agree the quality criteria that will be used to determine whether any change to the product is fully and correctly implemented",
                            "completionCriterion" :
                                {
                                    "alphas" : [
                                        "Requirements.Coherent"
                                    ],
                                    "workProduct" : [
                                        "DefinitionOfDone.CompletionConditionsListedOrBeyond"
                                    ]
                                },
                            "entryCriterion" :
                                {
                                    "alphas" : [],
                                    "workProduct" : []
                                },
                            "competencies" : [
                                "StakeholderRepresentation",
                                "Development",
                                "Analysis",
                                "Testing"
                            ]
                        },
                        {
                            "name_id" : "PrepareAProductBacklogItem",
                            "name" : "Prepare a Product Backlog Item",
                            "description" : "Ensure that the Product Backlog Item is ready for development and that it is clear how it will be tested",
                            "completionCriterion" :
                                {
                                    "alphas" : [
                                        "Requirements.Coherent",
                                        "ProductBacklogItem.ReadyForDevelopment"
                                    ],
                                    "workProduct" : [
                                        "TestCase.TestIdeasCapturedOrBeyond"
                                    ]
                                },
                            "entryCriterion" :
                                {
                                    "alphas" : [
                                        "ProductBacklogItem.Identified"
                                    ],
                                    "workProduct" : [
                                        "ProductBacklog.ItemsPrioritized"
                                    ]
                                },
                            "competencies" : [
                                "StakeholderRepresentation",
                                "Development",
                                "Analysis",
                                "Testing"
                            ]
                        }
                    ]
                }
            ],
            "alpha" : [
                {
                    "name_id" : "Requirements",
                    "name" : "Requirements",
                    "description" : "What the software system must do to address the opportunity and satisfy the stakeholders",
                    "workProduct" : [
                        {
                            "name_id" : "ProductBacklog",
                            "name" : "Product Backlog",
                            "description" : "Testing An ordered list of things to build into the product to enhance its value",
                            "level_of_detail" : [
                                "ItemsGathered",
                                "ItemsPrioritized",
                                "Cost-BenefitQuantified"
                            ]
                        },
                        {
                            "name_id" : "DefinitionOfDone",
                            "name" : "Definition of Done",
                            "description" : "The quality criteria that will be used to determine whether the product is of acceptable / releasable quality",
                            "level_of_detail" : [
                                "CompletionConditionsListed",
                                "QualityCriteriaAndEvidenceDescribed"
                            ]
                        },
                        {
                            "name_id" : "TestCase",
                            "name" : "Test Case",
                            "description" : "Defines test inputs and expected results to help evaluate whether a specific aspect of the system works correctly",
                            "level_of_detail" : [
                                "TestIdeasCaptured",
                                "Scripted",
                                "Automated"
                            ]
                        }
                    ],
                    "state" : [
                        {
                            "name_id" : "Conceived",
                            "name" : "Conceived",
                            "description" : "The need for a new system has been agreed",
                            "checklist" : [
                                "Stakeholders agree system is to be produced",
                                "Users identified",
                                "Funding stakeholders identified",
                                "Opportunity clear"
                            ]
                        },
                        {
                            "name_id" : "Bounded",
                            "name" : "Bounded",
                            "description" : "The purpose and theme of the new system are clear",
                            "checklist" : [
                                "Development stakeholders identified",
                                "System purpose agreed",
                                "System success clear",
                                "Shared solution understanding exists",
                                "Requirement's format agreed",
                                "Requirements management in place",
                                "Prioritization scheme clear",
                                "Constraints identified & considered",
                                "Assumptions clear"
                            ]
                        },
                        {
                            "name_id" : "Coherent",
                            "name" : "Coherent",
                            "description" : "The requirements provide a coherent description of the essential characteristics of the new system",
                            "checklist" : [
                                "Requirements shared",
                                "Requirements' origin clear",
                                "Rationale clear",
                                "Conflicts addressed",
                                "Essential characteristics clear",
                                "Key usage scenarios explained",
                                "Priorities clear",
                                "Impact understood",
                                "Team knows & agrees on what to deliver"
                            ]
                        },
                        {
                            "name_id" : "Acceptable",
                            "name" : "Acceptable",
                            "description" : "The requirements describe a system that is acceptable to the stakeholders",
                            "checklist" : [
                                "Acceptable solution described",
                                "Change under control",
                                "Value to be realized clear",
                                "Clear how opportunity addressed",
                                "Testable"
                            ]
                        },
                        {
                            "name_id" : "Addressed",
                            "name" : "Addressed",
                            "description" : "Enough of the requirements have been addressed to satisfy the need for a new system in a way that is acceptable to the stakeholders",
                            "checklist" : [
                                "Enough addressed to be acceptable",
                                "Requirements and system match",
                                "Value realized clear",
                                "System worth making operational"
                            ]
                        },
                        {
                            "name_id" : "Fulfilled",
                            "name" : "Fulfilled",
                            "description" : "The requirements that have been addressed fully satisfy the need for a new system",
                            "checklist" : [
                                "Stakeholders accept requirements",
                                "No hindering requirements",
                                "Requirements fully satisfied"
                            ]
                        }
                    ],
                    "subAlpha" : [
                        {
                            "name_id" : "ProductBacklogItem",
                            "name" : "Product Backlog Item",
                            "parent_name_id" : "Requirements",
                            "description" : "Something to build into the product to enhance its value",
                            "workProduct" : [],
                            "state" : [
                                {
                                    "name_id" : "Identified",
                                    "name" : "Identified",
                                    "description" : "A way to enhance the value of a product has been found",
                                    "checklist" : [
                                        "A way to enhance the value of a product has been found",
                                        "The item has an agreed name that is unique and meaningful",
                                        "There is a shared high-level understanding of what the item is and why it is needed"
                                    ]
                                },
                                {
                                    "name_id" : "ReadyForDevelopment",
                                    "name" : "Ready for Development",
                                    "description" : "The item is sufficiently well understood that the team responsible for adding it to the product can plan and start the work to get this done",
                                    "checklist" : [
                                        "The item is well-enough understood by the stakeholders and the team for it to be prioritized for development",
                                        "The value is understood enough to proceed",
                                        "The size of the item is understood enough to proceed",
                                        "The relative priority of the item is agreed"
                                    ]
                                },
                                {
                                    "name_id" : "Done",
                                    "name" : "Done",
                                    "description" : "The item has been implemented in the product and has been demonstrated to be of adequate quality",
                                    "checklist" : [
                                        "The item has been included in the product",
                                        "The stakeholders are happy that the value associated with the item has been realized",
                                        "The item has been verified as meeting all relevant quality criteria",
                                        "The item has been validated as being usable and fit-for-purpose"
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            "competencies" : [
                {
                    "name_id" : "StakeholderRepresentation",
                    "name" : "Stakeholder Representation",
                    "description" : "The ability to gather, communicate and balance the needs of other stakeholders, and accurately represent their views",
                    "level" : [
                        "Assists", "Applies", "Masters", "Adapt", "Innovates"
                    ]
                },
                {
                    "name_id" : "Development",
                    "name" : "Development",
                    "description" : "The ability to design and program effective software systems following the standards and norms agreed by the team",
                    "level" : [
                        "Assists", "Applies", "Masters", "Adapt", "Innovates"
                    ]
                },
                {
                    "name_id" : "Testing",
                    "name" : "Testing",
                    "description" : "The ability to test a system, verifying that it is usable and that it meets the requirements",
                    "level" : [
                        "Assists", "Applies", "Masters", "Adapt", "Innovates"
                    ]
                },
                {
                    "name_id" : "Analysis",
                    "name" : "Analysis",
                    "description" : "The ability to understand opportunities and their related stakeholder needs, and transform them into an agreed and consistent set of requirements",
                    "level" : [
                        "Assists", "Applies", "Masters", "Adapt", "Innovates"
                    ]
                }
            ],
            "patterns" : [
                {
                    "name_id" : "Estimating",
                    "name" : "Estimating",
                    "description" : "Estimating patterns provide guidance on how to maintain work progress measures and forecasting capability",
                    "pattern" : [
                        {
                            "name_id" : "RelativeEstimating",
                            "name" : "Relative Estimating",
                            "description" : "Effort to get Product Backlog Items done is estimated not in absolute units of time, but relative to each other. This allows progress to be predicted based on performance",
                            "alpha" : [],
                            "activity" : [],
                            "competencies" : [],
                        }
                    ]
                },
                {
                    "name_id" : "ProductValue",
                    "name" : "Product Value",
                    "description" : "Product Value patterns provide guidance on how to define and prioritize the value to build into the solution",
                    "pattern" : [
                        {
                            "name_id" : "INVEST",
                            "name" : "INVEST",
                            "description" : "Independent, Negotiable, Valuable, Estimable, Small, Testable",
                            "alpha" : [],
                            "activity" : [],
                            "competencies" : [],
                        },
                        {
                            "name_id" : "SplittingProductBacklogItems",
                            "name" : "Splitting Product Backlog Items",
                            "description" : "Small things get done faster. In agile development there is a continuous and relentless drive to reduce the size of backlog items by splitting bigger items into smaller ones",
                            "alpha" : [],
                            "activity" : [],
                            "competencies" : [],
                        }
                    ]
                }
            ],
            "extensionElements" : []
        } ;

        //TODO data_dynamic
        var data_json_dynamic = {
            "name_id" : "",
            "name" : "",
            "description" : "",
            "intention" : [],
            "activitySpace" : [],
            "alpha": [],
            "competencies": [],
            "patterns": [],
            "extensionElements": []

        };

        var jsonse = JSON.stringify(data_json);
        const file = new Blob([jsonse], {type: 'application/json'});
        element.href = URL.createObjectURL(file);
        element.download = "MethodEssence.json";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    addAlpha() {

        let newAlpha = {
            name: 'New Alpha',
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
            name: 'New Activity',
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
            name: 'New Activity Space',
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
            name: 'New Competency',
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
            name: 'New Work Product',
            type: 'WorkProduct',
            x: 500,
            y: 280,
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


            }catch (e) {

                console.log(e)

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
            var connectionHandler = new mxConnectionHandler(this.state.graph_global)




            // keyboard backspace hit
            var graph = this.state.graph_global;
            var detail = this;


            // keyboard enter hit
            keyHandler.bindKey(13, function()
            {
                if (graph.isEnabled())
                {
                    let kernel_data_detail = graph.getSelectionCell()
                    if (kernel_data_detail != undefined) {
                        detail.detail_data = kernel_data_detail
                        detail.openModal();
                    }

                }


            });


            // keyboard backspace hit
            keyHandler.bindKey(8, function()
            {

                if (graph.isEnabled())
                {
                    console.log(graph.getSelectionCell())
                    graph.removeCells();
                }
            });

            // keyboard delete hit
            keyHandler.bindKey(46, function(evt)
            {
                if (graph.isEnabled())
                {
                    console.log(graph.getSelectionCell())
                    graph.removeCells();
                }
            });

            // keyboard Left Arrow hit
            keyHandler.bindKey(37, function(evt)
            {
                if (graph.isEnabled())
                {

                    graph.getModel().beginUpdate();

                    try {


                        //let editedCell = new mxCell(null,geometry,graph.getSelectionCell().getStyle());
                        graph.translateCell(graph.getSelectionCell(),-10,0)

                    } catch (e) {

                        console.log(e)

                    } finally {
                        // Updates the display
                        graph.getModel().endUpdate();
                    }

                }
            });

            // keyboard Up Arrow hit
            keyHandler.bindKey(38, function(evt)
            {
                if (graph.isEnabled())
                {

                    graph.getModel().beginUpdate();

                    try {


                        //let editedCell = new mxCell(null,geometry,graph.getSelectionCell().getStyle());
                        graph.translateCell(graph.getSelectionCell(),0,-10)

                    } catch (e) {

                        console.log(e)

                    } finally {
                        // Updates the display
                        graph.getModel().endUpdate();
                    }

                }
            });

            // keyboard Right Arrow hit
            keyHandler.bindKey(39, function(evt)
            {
                if (graph.isEnabled())
                {

                    graph.getModel().beginUpdate();

                    try {


                        //let editedCell = new mxCell(null,geometry,graph.getSelectionCell().getStyle());
                        graph.translateCell(graph.getSelectionCell(),10,0)

                    } catch (e) {

                        console.log(e)

                    } finally {
                        // Updates the display
                        graph.getModel().endUpdate();
                    }

                }
            });

            // keyboard Down Arrow hit
            keyHandler.bindKey(40, function(evt)
            {
                if (graph.isEnabled())
                {

                    graph.getModel().beginUpdate();

                    try {


                        //let editedCell = new mxCell(null,geometry,graph.getSelectionCell().getStyle());
                        graph.translateCell(graph.getSelectionCell(),0,10)

                    } catch (e) {

                        console.log(e)

                    } finally {
                        // Updates the display
                        graph.getModel().endUpdate();
                    }

                }
            });

            //handle when click is released

            connectionHandler.mouseUp = function () {
                if (graph.isEnabled())
                {
                    // graph.model.setValue(graph.getSelectionCell(),"Change Var");
                }
            }
















        }
    }
    render() {
        return (
            <div>
                <div className="topnav">
                    <button onClick={this.toJSON}><img src={Json}  /></button>

                </div>
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

                <Modal open={this.state.openForm} onClose={this.handleClose.bind(this)} >
                    <KernelDetail essence_kernel={this.detail_data} graph_global={this.state.graph_global}/>
                </Modal>
            </div>

        )
    }
}
