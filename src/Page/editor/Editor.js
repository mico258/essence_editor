import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import {
    mxGraph,
    mxRubberband,
    mxKeyHandler,
    mxUndoManager,
    mxEditor,
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
import SaveIcon from "../../Assets/Action/save.png";
import Alpha from "../../Assets/EssenceKernel/Alpha.png";
import ActivityPng from "../../Assets/EssenceKernel/Activity.png";
import ActivitySpacePng from "../../Assets/EssenceKernel/Activity_Space.png";
import CompetencyPng from "../../Assets/EssenceKernel/Competency.png";
import WorkProductPng from "../../Assets/EssenceKernel/Work_Product.png";
import KernelDetail from "../../Component/kernelDetail/KernelDetail";
import Modal from "@material-ui/core/Modal/Modal";
import Button from "@material-ui/core/Button/Button";

import axios from 'axios';

const CircularJSON = require('circular-json');


export default class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            openForm : false,
            name: '',
            description: '',
            author: '',
            intention: [],
            graph_global : null,
            detail_data : null,
            essence_kernel: [
            ],
            edge: [
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
        this.saveData = this.saveData.bind(this);
        this.stringifyWithoutCircular = this.stringifyWithoutCircular.bind(this)

        console.log(this.props.match.params.id)


        axios.get('http://localhost:8085/method/'+this.props.match.params.id)
            .then(result => {
                console.log(result.data)
                this.setState({
                    loading : false,
                    name : result.data.name,
                    description : result.data.description,
                    author : result.data.author,
                    intention : result.data.intention,
                    edge : CircularJSON.parse(CircularJSON.stringify(result.data.edge)),
                    essence_kernel : CircularJSON.parse(CircularJSON.stringify(result.data.essence_kernel)),
                })
                this.LoadGraph();
            }).catch(err => {
                console.log(err)
        })
    }

    stringifyWithoutCircular(json){
        return JSON.stringify(
            json,
            ( key, value) => {
                if((key === 'parent' || key == 'source' || key == 'target') && value !== null) {
                    return value.id;
                } else if(key === 'value' && value !== null && value.localName) {
                    let results = {};
                    Object.keys(value.attributes).forEach(
                        (attrKey)=>{
                            const attribute = value.attributes[attrKey];
                            results[attribute.nodeName] = attribute.nodeValue;
                        }
                    )
                    return results;
                }
                return value;
            },
            4
        );
    }

    openModal() {
        this.setState({
            openForm: true
        });
    };

    handleClose() {

        this.setState({
            openForm: false,
            detail_data : null
        })

    };

    saveData() {
        var util = require('util')

        var essence_kernel_data = JSON.parse(this.stringifyWithoutCircular(this.state.essence_kernel))

        // for (var i = 0 ; i < this.state.essence_kernel.length ; i++) {
        //     delete this.state.essence_kernel[i].parent
        //     essence_kernel_data.push(JSON.parse(this.stringifyWithoutCircular(this.state.essence_kernel[i])))
        // }

        var edge_data = JSON.parse(this.stringifyWithoutCircular(this.state.edge))

        // for (var i = 0 ; i < this.state.edge.length ; i++) {
        //     delete this.state.edge[i].parent
        //     edge_data.push(util.inspect(CircularJSON.parse(this.stringifyWithoutCircular(this.state.edge[i]))))
        // }




        let data = {
            name : this.state.name,
            description : this.state.description,
            author : this.state.author,
            intention : this.state.intention,
            edge : edge_data,
            essence_kernel : essence_kernel_data,

        }

        axios.put('http://localhost:8085/method/'+this.props.match.params.id,data)
            .then(result => {
                console.log(result)
            }).catch(err => {
                console.log(err)
        })


        console.log(this.state)
    }

    componentDidMount() {

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

        var alpha = this.state.essence_kernel.filter(function (kernel) {
            return kernel.style === 'Alpha'
        })

        for(var i = 0 ; i < alpha.length ; i++) {
            let data = {
                name_id : alpha[i].value.replace(/\s/g, ''),
                name : alpha[i].value,
                description : alpha[i].detail.description,
                workProduct : [],
                state : [],
                subAlpha : []

            }

            let alpha_detail = alpha[i].detail

            for (var j = 0 ; j < alpha_detail.workProduct.length ; j++) {
                let workProductData = {
                    name_id : alpha_detail.workProduct[j].value.replace(/\s/g, ''),
                    name : alpha_detail.workProduct[j].value,
                    description : alpha_detail.workProduct[j].detail.description,
                    level_of_detail : alpha_detail.workProduct[j].detail.level_of_detail,
                }

                data.workProduct.push(workProductData)

            }

            for (var j = 0 ; j < alpha_detail.state.length ; j++) {
                let state = {
                    name_id : alpha_detail.state[j].name.replace(/\s/g, ''),
                    name : alpha_detail.state[j].name,
                    description : alpha_detail.state[j].description,
                    checklist : alpha_detail.state[j].checkList,
                }

                data.state.push(state)

            }


            for (var j = 0 ; j < alpha_detail.subAlpha.length ; j++) {
                let subAlpha = {
                    name_id : alpha_detail.subAlpha[i].value.replace(/\s/g, ''),
                    name : alpha_detail.subAlpha[i].value,
                    description : alpha_detail.subAlpha[i].detail.description,
                    workProduct : [],
                    state : [],

                }

                let subAlpha_detail = alpha_detail.subAlpha[i].detail

                for (var k = 0 ; k < subAlpha_detail.workProduct.length ; k++) {
                    let workProductData = {
                        name_id : subAlpha_detail.workProduct[k].value.replace(/\s/g, ''),
                        name : subAlpha_detail.workProduct[k].value,
                        description : subAlpha_detail.workProduct[k].detail.description,
                        level_of_detail : subAlpha_detail.workProduct[k].detail.level_of_detail,
                    }

                    subAlpha.workProduct.push(workProductData)

                }

                for (var k = 0 ; k < subAlpha_detail.state.length ; k++) {
                    let state = {
                        name_id : subAlpha_detail.state[k].name.replace(/\s/g, ''),
                        name : subAlpha_detail.state[k].name,
                        description : subAlpha_detail.state[k].description,
                        checklist : subAlpha_detail.state[k].checkList,
                    }

                    subAlpha.state.push(state)

                }




                data.subAlpha.push(subAlpha)

            }


            data_json_dynamic.alpha.push(data)
        }

        var activitySpace = this.state.essence_kernel.filter(function (kernel) {
            return kernel.style === 'ActivitySpace'
        })

        for(var i = 0 ; i < activitySpace.length ; i++) {
            let data = {
                name_id : activitySpace[i].value.replace(/\s/g, ''),
                name : activitySpace[i].value,
                description : activitySpace[i].detail.description,
                activity : [],

            }

            var detail = activitySpace[i].detail

            for (var j = 0 ; j < detail.activity.length; j ++ ) {
                let activity = {
                    name_id : detail.activity[j].value.replace(/\s/g, ''),
                    name : detail.activity[j].value,
                    description : detail.activity[j].detail.description,
                    completionCriterion : {
                        alphas : [],
                        workProduct : []
                    },
                    entryCriterion : {
                        alphas : [],
                        workProduct : []
                    },
                    competencies: detail.activity[j].detail.competencies
                }

                let act_detail = detail.activity[j].detail;

                for (var k = 0 ; k < act_detail.entryCriterion.alphas.length; k++) {
                    activity.entryCriterion.alphas.push(act_detail.entryCriterion.alphas[k].value)
                }

                for (var k = 0 ; k < act_detail.entryCriterion.workProduct.length; k++) {
                    activity.entryCriterion.workProduct.push(act_detail.entryCriterion.workProduct[k].value)
                }

                for (var k = 0 ; k < act_detail.completionCriterion.alphas.length; k++) {
                    activity.completionCriterion.alphas.push(act_detail.completionCriterion.alphas[k].value)
                }

                for (var k = 0 ; k < act_detail.completionCriterion.workProduct.length; k++) {
                    activity.completionCriterion.workProduct.push(act_detail.completionCriterion.workProduct[k].value)
                }



                data.activity.push(activity)
            }

            data_json_dynamic.activitySpace.push(data)
        }

        var activity = this.state.essence_kernel.filter(function (kernel) {
            return kernel.style === 'Activity'
        })


        var workProduct = this.state.essence_kernel.filter(function (kernel) {
            return kernel.style === 'WorkProduct'
        })

        var competency = this.state.essence_kernel.filter(function (kernel) {
            return kernel.style === 'Competency'
        })

        for(var i = 0 ; i < competency.length ; i++) {
            let data = {
                name_id : competency[i].value.replace(/\s/g, ''),
                name : competency[i].value,
                description : competency[i].detail.description,
                level : [],

            }
            competency[i].detail.level.Assists ? data.level.push("Assists"):
            competency[i].detail.level.Adapt ? data.level.push("Adapt"):
            competency[i].detail.level.Innovates ? data.level.push("Innovates"):
            competency[i].detail.level.Innovates ? data.level.push("Innovates"):
            data_json_dynamic.competencies.push(data)
        }

        data_json_dynamic.name_id = this.state.name.replace(/\s/g, '');
        data_json_dynamic.name = this.state.name;
        data_json_dynamic.description = this.state.description;
        data_json_dynamic.intention = this.state.intention;


        var jsonse = JSON.stringify(data_json_dynamic,0,4);
        const file = new Blob([jsonse], {type: 'application/json'});
        element.href = URL.createObjectURL(file);
        element.download = data_json_dynamic.name+".json";
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
        a.detail = {
            description : '',
            workProduct: [],
            state: [],
            subAlpha: [],
            isSubAlpha: false,
            hasSubAlpha: false
        }


        this.state.essence_kernel.push(a);

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
        a.detail = {
            description: '',
            completionCriterion: {
                alphas: [],
                workProduct: []
            },
            entryCriterion: {
                alphas: [],
                workProduct: []
            },
            competencies: []

        }

        this.state.essence_kernel.push(a);


        this.refreshGraph();

    }

    arrayRemove(value) {

        this.state.essence_kernel = this.state.essence_kernel.filter(function(ele){
            return ele != value;
        });

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
        a.detail = {
            description: '',
            activity: [],
        }

        this.state.essence_kernel.push(a);


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

        a.detail = {
            description : '',
            level: {
                Assists : '',
                Applies: '',
                Masters: '',
                Adapt: '',
                Innovates: ''
            }
        }

        this.state.essence_kernel.push(a);


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
        a.detail = {
            description: '',
            level_of_detail: []
        }

        this.state.essence_kernel.push(a);

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
            this.state.graph_global.setEdgeLabelsMovable(false);
            this.state.graph_global.setVertexLabelsMovable(false);
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
                for (var key in this.state.essence_kernel) {
                    var component = this.state.essence_kernel[key];






                    let a = this.state.graph_global.insertVertex(
                        parent,
                        component.id,
                        component.value,
                        component.geometry.x,
                        component.geometry.y,
                        component.geometry.width,
                        component.geometry.height,
                        component.style
                        )

                    a.detail = component.detail
                    this.state.essence_kernel[key] = a
                }

                for (var key in this.state.edge) {
                    var component = this.state.edge[key];

                    let source_data = this.state.essence_kernel.filter(function (source) {
                        return source.id === component.source
                    })[0];
                    let target_data = this.state.essence_kernel.filter(function (source) {
                        return source.id === component.target
                    })[0];


                    let a = this.state.graph_global.insertEdge(
                        parent,
                        component.id,
                        component.value,
                        source_data,
                        target_data,
                        component.style
                    )

                    a.detail = component.detail
                    this.state.edge[key] = a
                }

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



            // keyboard backspace hit
            var graph = this.state.graph_global;


            var connectionHandler = new mxConnectionHandler(graph)

            //Handle Connection Edge

            var detail = this;
            var state = this.state;

            graph.connectionHandler.addListener(mxEvent.CONNECT, function(sender, evt)
            {
                var edge = evt.getProperty('cell');
                var source = graph.getModel().getTerminal(edge, true);
                var target = graph.getModel().getTerminal(edge, false);


                if( source.style === "ActivitySpace" ) {

                    graph.getModel().remove(edge)

                    alert("Activity Space tidak boleh mengarah ke essence kernel manapun")
                }

                if( target.style === "WorkProduct" && source.style!= "Activity") {

                    graph.getModel().remove(edge)

                    alert("Hanya Activity yang boleh mengarah ke work product")
                }
                //Constrain Untuk Competency
                // console.log('connect '+ edge +' '+ source.id+' '+target.id+' '+sourcePortId+' '+ targetPortId);
                if( (source.style === "Competency" && target.style === "WorkProduct" ) ||
                    (source.style === "WorkProduct" && target.style === "Competency" )) {

                    graph.getModel().remove(edge)

                    alert("Competency dan Work Product tidak boleh saling terhubung")
                }

                // console.log('connect '+ edge +' '+ source.id+' '+target.id+' '+sourcePortId+' '+ targetPortId);
                if( (source.style === "Competency" && target.style === "ActivitySpace" ) ||
                    (source.style === "ActivitySpace" && target.style === "Competency" )) {

                    graph.getModel().remove(edge)

                    alert("Competency dan Activity Space tidak boleh saling terhubung")
                }

                if( source.style === "Activity" && target.style === "Competency" ) {

                    graph.getModel().remove(edge)

                    alert("Activity tidak boleh mengarah ke Competency")
                }

                if( source.style === "Activity" && target.style === "Alpha" ) {

                    state.edge.push(edge);
                    state.essence_kernel.filter(function (kernel) {
                        return (kernel.id === source.id)
                    })[0].detail.completionCriterion.alphas.push(target)
                }

                if( source.style === "Activity" && target.style === "WorkProduct" ) {

                    state.edge.push(edge);
                    state.essence_kernel.filter(function (kernel) {
                        return (kernel.id === source.id)
                    })[0].detail.completionCriterion.workProduct.push(target)
                }

                if( source.style === "Alpha" && target.style === "Activity" ) {

                    state.edge.push(edge);
                    state.essence_kernel.filter(function (kernel) {
                        return (kernel.id === target.id)
                    })[0].detail.entryCriterion.alphas.push(source)
                }

                if( source.style === "WorkProduct" && target.style === "Activity" ) {

                    state.edge.push(edge);
                    state.essence_kernel.filter(function (kernel) {
                        return (kernel.id === target.id)
                    })[0].detail.entryCriterion.workProduct.push(source)
                }

                if( source.style === "WorkProduct" && target.style === "Alpha" ) {

                    state.edge.push(edge);
                    state.essence_kernel.filter(function (kernel) {
                        return (kernel.id === target.id)
                    })[0].detail.workProduct.push(source)
                }



                if( source.style === "Competency" && target.style === "Competency" ) {

                    graph.getModel().remove(edge)

                    alert("Competency tidak boleh saling terhubung dengan sesama Competency")
                }

                if( source.style === "Activity" && target.style === "Activity" ) {

                    graph.getModel().remove(edge)

                    alert("Activity tidak boleh saling terhubung dengan sesama Activity")
                }

                if( source.style === "ActivitySpace" && target.style === "ActivitySpace" ) {

                    graph.getModel().remove(edge)

                    alert("Activity Space tidak boleh saling terhubung dengan sesama Activity Space")
                }

                if( source.style === "Activity" && target.style === "ActivitySpace" ) {

                    let sourceAct = state.essence_kernel.filter(function (kernel) {
                        return (kernel.id === source.id)
                    })[0];

                    let targetAct = state.essence_kernel.filter(function (kernel) {
                        return (kernel.id === target.id)
                    })[0];

                    state.edge.push(edge)

                    targetAct.detail.activity.push(sourceAct)
                }

                if( (source.style === "Competency" && target.style === "Alpha" ) ||
                    (source.style === "Alpha" && target.style === "Competency" )) {

                    graph.getModel().remove(edge)

                    alert("Competency dan Alpha tidak boleh saling terhubung")
                }

                if( (source.style === "Competency" && target.style === "Activity" ) ) {

                    state.edge.push(edge);
                    state.essence_kernel.filter(function (kernel) {
                        return (kernel.id === target.id)
                    })[0].detail.competencies.push(source.value.toString())
                }

                if( source.style === "Alpha" && target.style === "Alpha" ) {

                    let sourceAlpha = state.essence_kernel.filter(function (kernel) {
                        return (kernel.id === source.id)
                    })[0];

                    let targetAlpha = state.essence_kernel.filter(function (kernel) {
                        return (kernel.id === target.id)
                    })[0];

                    if(targetAlpha.detail.isSubAlpha) {
                        graph.getModel().remove(edge)

                        alert("Alpha tidak boleh menjadi sub Alpha dari sebuah sub Alpha")
                    } else if(sourceAlpha.detail.hasSubAlpha){
                        graph.getModel().remove(edge)

                        alert("Alpha sudah memiliki sub Alpha")
                    } else {
                        sourceAlpha.detail.isSubAlpha = true
                        targetAlpha.detail.hasSubAlpha = true
                        state.edge.push(edge)
                        targetAlpha.detail.subAlpha.push(sourceAlpha)
                    }


                }


            });




            // keyboard enter hit
            keyHandler.bindKey(13, function()
            {
                if (graph.isEnabled())
                {

                    if (graph.getSelectionCell()) {

                        let data = graph.getSelectionCell()
                        let kernel_data_detail = state.essence_kernel.filter(function (kernel) {
                            return kernel.id === graph.getSelectionCell().id
                        })
                        console.log(data)
                        console.log(kernel_data_detail)
                        if (kernel_data_detail != undefined) {
                            detail.detail_data = kernel_data_detail[0]
                            detail.openModal();
                        }
                    }


                }


            });




            // keyboard backspace hit
            keyHandler.bindKey(8, function()
            {

                if (graph.isEnabled())
                {

                    var kernel = graph.getSelectionCell()
                    state.essence_kernel  = state.essence_kernel.filter(function(ele){
                        return ele.id !== kernel.id;
                    });
                    graph.removeCells();
                }
            });

            // keyboard delete hit
            keyHandler.bindKey(46, function(evt)
            {
                if (graph.isEnabled())
                {
                    var kernel = graph.getSelectionCell()
                    state.essence_kernel  = state.essence_kernel.filter(function(ele){
                        return ele.id !== kernel.id;
                    });
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

            var undoManager = new mxUndoManager();
            console.log(undoManager)
            var listener = function(sender, evt)
            {
                // console.log(sender.cells)
                undoManager.undoableEditHappened(evt.getProperty('edit'));
            };
            graph.getModel().addListener(mxEvent.UNDO, listener);
            graph.getView().addListener(mxEvent.UNDO, listener);














        }
    }



    render() {
        if (!this.state.loading) {
            return (
                <div className="Background">
                    <div className="topnav">
                        <button onClick={this.toJSON}><img src={Json}  /></button>
                        <button onClick={this.saveData}><img src={SaveIcon}  /></button>

                    </div>
                    <div className="sidenav">
                        <button onClick={this.addAlpha}><img src={Alpha}/></button>
                        <button onClick={this.addActivity}><img src={ActivityPng}/></button>
                        <button onClick={this.addActivitySpace}><img src={ActivitySpacePng}/></button>
                        <button onClick={this.addCompetency}><img src={CompetencyPng}/></button>
                        <button onClick={this.addWorkProduct}><img src={WorkProductPng}/></button>
                    </div>
                    <div className="Base" >

                        <div className="graph-container" ref="divGraph" id="divGraph" />
                    </div>

                    <Modal open={this.state.openForm} onClose={this.handleClose.bind(this)} >
                        <KernelDetail essence_kernels= {this.state.essence_kernel} essence_kernel={this.detail_data} graph_global={this.state.graph_global} closeForm={this.handleClose.bind(this)}/>

                    </Modal>
                </div>

            )
        } else {
            return (
                <div> Loading</div>
        )
        }

    }
}
