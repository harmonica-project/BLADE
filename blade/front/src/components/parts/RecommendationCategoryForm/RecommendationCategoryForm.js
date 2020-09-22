
import React, { Component } from 'react';
import { Accordion, Card, Row } from 'react-bootstrap';
import RecommendationAttributeForm from '../../parts/RecommendationAttributeForm/RecommendationAttributeForm';
import './RecommendationCategoryForm.css';

/**
 * RecommendationCategoryForm: this is a category section of the recommendation form (security, ...)
 * @version 1.0.0
 * @author [Nicolas Six](https://github.com/nicoSix)
 */
class RecommendationCategoryForm extends Component {
    render() {
        return (
            <Accordion defaultActiveKey="0" className="category">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0" className="accordionHeader">
                        <h2>{ this.props.categoryInfo.name }</h2>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Row>
                        {
                            this.props.categoryInfo.fields.map(attribute => {
                                return <RecommendationAttributeForm key={attribute.key} attribute={ attribute } updateFormValues={ this.props.updateFormValues }/>
                            })
                        }
                        </Row>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
    };
}

export default RecommendationCategoryForm;