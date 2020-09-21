
import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

import './RecommendationAttributeForm.css';

/**
 * RecommendationAttributeForm: this is an attribute section of the recommendation form (is public, ...)
 *
 * @version 1.0.0
 * @author [Nicolas Six](https://github.com/nicoSix)
 */
class RecommendationAttributeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
          weight: 0.0,
          requirements: {
              value: 0.0,
              key: "preference"
          }
        };
    }

    updateFormState() {
        this.props.updateFormValues(this.props.attribute.key, this.state);
    }

    handleChangeWeight(e) {
        this.setState({
            weight: e.target.value
        }, () => this.updateFormState())
    }

    handleChangeRequired(e) {
        var newKey = "";
        if(e.target.checked) newKey = "mandatory";
        else newKey = "preference";

        this.setState({
            requirements: {
                value: this.state.requirements.value,
                key: newKey
            }
        }, () => this.updateFormState())
    }

    handleChangeValue(e) {
        this.setState({
            requirements: {
                value: e.target.value,
                key: this.state.requirements.key
            }
        }, () => this.updateFormState())
    }

    buildLowerFormPart(attribute) {
        return (
            <Col md={12} className="upper-separation">
                <Col>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id={ attribute.key + "RequiredCheck" } name={ attribute.key + "RequiredCheck" } onChange={ this.handleChangeRequired.bind(this) } checked={ this.state.requirements.key === "mandatory"}/>
                        <label className="form-check-label" htmlFor={ attribute.key + "RequiredCheck" }>Required</label>
                    </div>
                </Col>
                <Col>
                    <select className="form-control custom-select" id={ attribute.key + "Preference"} name={ attribute.key + "Preference"} onChange={ this.handleChangeWeight.bind(this) }>
                        <option value="0">Indifferent</option>
                        <option value="0.25">Weakly desirable</option>
                        <option value="0.5">Desirable</option>
                        <option value="0.75">Highly desirable</option>
                        <option value="1">Extremely desirable</option>
                    </select>
                </Col>
            </Col>
        )
    }

    buildSelectForm(attribute) {
        return (
            <Col className="input-pane-col">
                <div className="input-pane">
                    <Col md={12}>
                        <h3 className="pane-title">{ this.props.attribute.name }</h3>
                    </Col>
                    <Col md={12}>
                    <select className="form-control custom-select" id={ attribute.key } name={ attribute.key } onChange={ this.handleChangeValue.bind(this) }>
                        { attribute.options.map(option => {
                            return <option key={ option.name } value={ option.value }>{ option.name }</option>
                        })}
                    </select>
                    </Col>
                    { this.buildLowerFormPart(attribute) }
                </div>
            </Col>
        )
    }

    buildNumericForm(attribute) {
        return (
            <Col className="input-pane-col">
                <div className="input-pane">
                    <Col md={12}>
                        <h3 className="pane-title">{ this.props.attribute.name }</h3>
                    </Col>
                    <Col md={12}>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" id={ attribute.key } name={ attribute.key } placeholder={ attribute.placeholder }  onChange={ this.handleChangeValue.bind(this) }/>
                            <div className="input-group-append">
                            <span className="input-group-text" id={ attribute.key + "-unit"}>{ attribute.unit }</span>
                            </div>
                        </div>
                    </Col>
                    { this.buildLowerFormPart(attribute) }
                </div>
            </Col>
        )
    }

    buildBooleanForm(attribute) {
        return (
            <Col className="input-pane-col">
                <div className="input-pane">
                    <Col md={12}>
                        <h3 className="pane-title">{ this.props.attribute.name }</h3>
                    </Col>
                    <Col md={12}>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name={ attribute.key } id={ attribute.key } value="1" checked={ parseInt(this.state.requirements.value) === 1 } onChange={ this.handleChangeValue.bind(this) }/>
                            <label className="form-check-label" htmlFor={ attribute.key }>Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name={ attribute.key } id={ attribute.key } value="0" checked={ parseInt(this.state.requirements.value) === 0 } onChange={ this.handleChangeValue.bind(this) }/>
                            <label className="form-check-label" htmlFor={ attribute.key }>No</label>
                        </div>
                    </Col>
                    { this.buildLowerFormPart(attribute) }
                </div>
            </Col>
        )
    }

    render() {
        return (
            <div>
                {(() => {
                    switch (this.props.attribute.type) {
                    case "boolean":   
                        return this.buildBooleanForm(this.props.attribute);
                    case "numeric":   
                        return this.buildNumericForm(this.props.attribute);
                    case "select":   
                        return this.buildSelectForm(this.props.attribute);
                    default:      
                        return (<div/>);
                    }
                })()}
            </div>
            )
    };
}

export default RecommendationAttributeForm;