
import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { apiUrl } from '../../../static/js/variables';
import './KnowledgeBase.css';

/**
 * KnowledgeBase: knowledge base display page for the BLADE Project
 *
 * @version 1.0.0
 * @author [Nicolas Six](https://github.com/nicoSix)
 */
class KnowledgeBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
          kb: [],
        };
    }

    componentDidMount() {
        this._isMounted = true;
        fetch(apiUrl + '/api/knowledge_base/get')
          .then(response => response.json())
          .then(kb => this.setState({ kb }));
    }

    getAlternativesNames() {
        return this.state.kb.map((row, index) => {
            return <td key={index}><b>{ row["name"] }</b></td>
        })
    }

    getAlternativesInfo() {
        if(this.state.kb[0]) {
            var infoKeys = Object.keys(this.state.kb[0]["infoAttributes"]);
            return infoKeys.map(key => {
                return (
                    <tr key={ key }>
                    <td>{ key }</td>
                    {
                        
                        this.state.kb.map((row, index) => {
                            console.log(row["infoAttributes"][key])
                            return <td key={ index }>{ row["infoAttributes"][key].toString() }</td>
                        })
                    }
                </tr>
                )
            })
        }
    }

    getAlternativesAttributes() {
        if(this.state.kb[0]) {
            var infoKeys = Object.keys(this.state.kb[0]["consideredAttributes"]);
            return infoKeys.map(key => {
                return (
                    <tr key={ key }>
                    <td>{ key }</td>
                    {
                        
                        this.state.kb.map((row, index) => {
                            console.log(row["consideredAttributes"][key])
                            return <td key={ index }>{ row["consideredAttributes"][key].toString() }</td>
                        })
                    }
                </tr>
                )
            })
        }
    }

    render() {
        return (
            <div className="knowledge-base">
                <Container>
                    <h1 className="section-title">Blockchain alternatives</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <td>#</td>
                                { this.getAlternativesNames() }
                            </tr>
                        </thead>
                        <tbody>
                            { this.getAlternativesInfo() }
                            { this.getAlternativesAttributes() }
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
    };
}

export default KnowledgeBase;