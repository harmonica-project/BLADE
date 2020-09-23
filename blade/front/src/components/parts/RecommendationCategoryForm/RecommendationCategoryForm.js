
import React, { Component } from 'react';
import { Accordion, Card, Row } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import RecommendationAttributeForm from '../../parts/RecommendationAttributeForm/RecommendationAttributeForm';
import './RecommendationCategoryForm.css';

/**
 * RecommendationCategoryForm: this is a category section of the recommendation form (security, ...)
 * @version 1.0.0
 * @author [Nicolas Six](https://github.com/nicoSix)
 */
class RecommendationCategoryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    toggleAccordion(isOpen) {
        if(isOpen !== this.state.open) {
            this.setState({
                open: isOpen
            }, () => {
                useAccordionToggle(0, null);
            })
        }
    }

    accordionHandler() {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        return (
            <Accordion className="category">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0" className="accordionHeader" onClick={ this.accordionHandler.bind(this) }>
                        <h2 className="accordionTitle">{ this.props.categoryInfo.name }</h2>
                        <small className="text-muted">(Click to { this.state.open ? "hide" : "display"})</small>
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