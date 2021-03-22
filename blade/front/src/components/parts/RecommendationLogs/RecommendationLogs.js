
import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import './RecommendationLogs.css';

/**
 * RecommendationLogs: component to display the logs of a BLADE recommendation
 *
 * @version 1.0.0
 * @author [Nicolas Six](https://github.com/nicoSix)
 */
class RecommendationLogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
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
                        <h2 className="accordionTitle">Raw response</h2>
                        <small className="text-muted">(Click to { this.state.open ? "hide" : "display"})</small>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <h3>Decision results</h3>
                        <textarea className="form-control" id="resultsField" value={ this.props.resultsField }rows="10" readOnly></textarea>
                        <br/>
                        <h3>YAML file</h3>
                        <textarea className="form-control" id="yamlField" value={ this.props.yamlField }rows="10" readOnly></textarea>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
    };
}

export default RecommendationLogs;