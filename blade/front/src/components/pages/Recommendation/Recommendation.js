
import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { stringify } from 'json2yaml';
import RecommendationCategoryForm from '../../parts/RecommendationCategoryForm/RecommendationCategoryForm';
import RecommendationLogs from '../../parts/RecommendationLogs/RecommendationLogs';
import ResultsTable from '../../parts/ResultsTable/ResultsTable';
import InfoModal from '../../parts/InfoModal/InfoModal';
import { apiUrl } from '../../../static/js/variables';
import { struct } from './struct';
import './Recommendation.css';

/**
 * Recommendation: main form to get a BLADE recommendation
 *
 * @version 1.0.0
 * @author [Nicolas Six](https://github.com/nicoSix)
 */
class Recommendation extends Component {
    constructor(props) {
        super(props);
        var attributeKeys = [];
        var attributeForm = {};
        var categoryRefs = {};

        this.constraints = []
        this.infoModal = React.createRef();

        struct.forEach(category => {
            category.fields.forEach(attribute => {
                attributeKeys.push(attribute.key);
            })

            categoryRefs[category.name] = React.createRef();
        })

        attributeKeys.forEach(key => {
            attributeForm[key] = {
                weight: 0.0,
                requirements: {
                    value: 0.0,
                    key: "preference"
                }
            }
        })

        this.state = {
          form: attributeForm,
          yamlFile: "",
          results: {},
          categoryRefs: categoryRefs,
          isLoading: true,
          constraints: {},
          history: [],
          requirements: {}
        };
    }

    openInfoModal() {
        this.infoModal.current.openModal()
    }

    toggleCategories(isOpen) {
        Object.keys(this.state.categoryRefs).forEach(key => {
            this.state.categoryRefs[key].current.toggleAccordion(isOpen);
        })
    }

    async getConstraints() {
        return fetch(apiUrl + '/api/constraints/generate', {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            return response.result
        });
    }

    buildNewHistory(attrKey, attrValue) {
        var newHistory = this.state.history
        var found = false

        for (var i = 0; i < newHistory.length; i++) {
            var key = Object.keys(newHistory[i])[0]
            if (key === attrKey) {
                found = true;
                newHistory[i][key] = attrValue;
            }
        }

        if(!found) newHistory.push({[attrKey]: attrValue});
        return newHistory;
    }

    buildNewRequirements(attrKey, attrValue) {
        var newRequirements = this.state.requirements;
        if(attrValue["requirements"]["key"] === "mandatory") {
            newRequirements[attrKey] = attrValue["requirements"]["value"];
        }
        else {
            if(newRequirements[attrKey]) delete newRequirements[attrKey];
        }
        return newRequirements;
    }

    updateFormValues(attrKey, newAttrValues) {
        var newForm = this.state.form;
        newForm[attrKey] = newAttrValues;

        this.setState({ form: newForm }, () => {
            fetch(apiUrl + '/api/recommendation/generate', {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.form)
            })
            .then(response => response.json())
            .then(response => {
                var newHistory = this.buildNewHistory(attrKey, newAttrValues)
                var newRequirements = this.buildNewRequirements(attrKey, newAttrValues)
                
                this.setState({
                    history: newHistory,
                    results: response.result,
                    yamlFile: stringify(response.request),
                    requirements: newRequirements
                });

                //console.log(this.state.history)
                console.log(this.state.requirements)
            });
        });
    }

    componentDidMount() {
        this.getConstraints()
            .then(constraints => {
                console.log(constraints)
                this.setState({
                    isLoading: false, 
                    constraints: constraints
                });
            });
    }

    render() {
        return (
            <div className="recommendation">
                <InfoModal ref={ this.infoModal }/>
                <Container fluid>
                    <Row>
                        <Col>
                            <h1 className="section-title display-4 inputHeader">Recommendation tool</h1>
                            <p className="lead">Welcome to the recommendation tool. Please select your requirements on the left panel to see the most prefereable blockchain for this context.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="sectionWrapper">
                                <Row>
                                    <Col md={8}>
                                        <h2 className="inputHeader">Requirement selection</h2>
                                        <p className="lead">For each field, you can select your preferences using the scale selector. You can also select your requirements using the dedicated checkbox and associated value field for each attribute.</p>
                                    </Col>
                                    <Col className="buttonGroup">
                                        <Button variant="secondary" onClick={ this.toggleCategories.bind(this, true) }>Open all</Button>{' '}
                                        <Button variant="secondary" onClick={ this.toggleCategories.bind(this, false) }>Close all</Button>
                                    </Col>
                                </Row>
                                {
                                    struct.map((categoryInfo) => {
                                        return <RecommendationCategoryForm 
                                            ref={ this.state.categoryRefs[categoryInfo.name] } 
                                            key={ categoryInfo.name } 
                                            categoryInfo={ categoryInfo } 
                                            updateFormValues={ this.updateFormValues.bind(this) } 
                                            constraints={ this.state.constraints } 
                                            requirements={ this.state.requirements }
                                        />
                                    })
                                }
                            </div>
                        </Col>
                        <Col>
                            <div className="sectionWrapper">
                                <Row>
                                    <Col md={8}>
                                        <h2 className="inputHeader">Results panel</h2>
                                    </Col>
                                    <Col className="buttonGroup">
                                        <Button variant="secondary" onClick={ this.openInfoModal.bind(this) }>?</Button>
                                    </Col>
                                </Row>
                                <ResultsTable results={ (this.state.results ? this.state.results.res : {}) }/>
                                <RecommendationLogs resultsField={ JSON.stringify(this.state.results, null, "\t").replace(/\\n/g, ' / ') } yamlField={ this.state.yamlFile }/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    };
}

export default Recommendation;