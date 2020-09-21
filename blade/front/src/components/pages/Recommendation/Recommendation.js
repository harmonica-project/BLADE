
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { stringify } from 'json2yaml';
import RecommendationCategoryForm from '../../parts/RecommendationCategoryForm/RecommendationCategoryForm';
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
          form: attributeForm
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
                this.resultsField.current.value = JSON.stringify(response.result, null, "\t").replace(/\\n/g, ' / ');
                this.yamlField.current.value = stringify(response.request);
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
                            <h2>Decision results</h2>
                            <textarea className="form-control" id="resultsField" ref={ this.resultsField }rows="10"></textarea>
                            <h2>YAML file</h2>
                            <textarea className="form-control" id="yamlField" ref={ this.yamlField }rows="10"></textarea>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    };
}

export default Recommendation;