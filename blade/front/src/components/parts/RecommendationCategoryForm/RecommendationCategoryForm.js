
import React, { Component } from 'react';
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
            <div className="card category">
                <div className="card-header accordionHeader" onClick={this.accordionHandler.bind(this)}>
                    <h2 className="accordionTitle">{ this.props.categoryInfo.name }</h2>
                    <small className="text-muted">(Click to { this.state.open ? "hide" : "display"})</small>
                </div>
                <ul className={"card-body " + (this.state.open ? "" : "collapse")}>
                {
                    this.props.categoryInfo.fields.map(attribute => {
                        return <RecommendationAttributeForm key={attribute.key} attribute={ attribute } updateFormValues={ this.props.updateFormValues }/>
                    })
                }
                </ul>
            </div>
        )
    };
}

export default RecommendationCategoryForm;