
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { stringify } from 'json2yaml';
import RecommendationCategoryForm from '../../parts/RecommendationCategoryForm/RecommendationCategoryForm';
import RecommendationLogs from '../../parts/RecommendationLogs/RecommendationLogs';
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

        this.resultsField = React.createRef();
        this.yamlField = React.createRef();
        
        struct.forEach(category => {
            category.fields.forEach(attribute => {
                attributeKeys.push(attribute.key);
            })
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
          results: {}
        };
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
                this.setState({
                    results: response.result,
                    yamlFile: stringify(response.request)
                });
            });
        });
    }

    componentDidMount() {
        this._isMounted = true;
    }

    render() {
        return (
            <div className="recommendation">
                <Container fluid>
                    <Row>
                        <Col>
                            <h1 className="section-title">Inputs</h1>
                            {
                                struct.map(categoryInfo => {
                                    return <RecommendationCategoryForm key={ categoryInfo.name } categoryInfo={ categoryInfo } updateFormValues={ this.updateFormValues.bind(this) }/>
                                })
                            }
                        </Col>
                        <Col>
                            <h1 className="section-title">Results</h1>
                            <RecommendationLogs resultsField={ JSON.stringify(this.state.results, null, "\t").replace(/\\n/g, ' / ') } yamlField={ this.state.yamlFile }/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    };
}

export default Recommendation;