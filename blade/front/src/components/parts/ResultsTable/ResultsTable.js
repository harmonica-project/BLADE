
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import './ResultsTable.css';

/**
 * ResultsTable: displays the summary results from the recommendation
 *
 * @version 1.0.0
 * @author [Nicolas Six](https://github.com/nicoSix)
 */
class ResultsTable extends Component {
    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    displayResultTable(results) {
        if (results && !this.isEmpty(results)) {
            return (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Blockchain</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.getSortedResults(this.props.results).map((result, i) => {
                            return (
                                <tr key={i}>
                                    <td>#{ (i + 1) }</td>
                                    <td>{ result["name"] + " (" + result["consensusAlgorithm"] + ")"}</td>
                                    <td>{ result["score"] }</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            )
        }
        else {
            return <p className="lead">No results to display yet. Please select your requirements before.</p>
        }
    }

    getSortedResults(results) {
        var sorted = results.sort(function(a, b) {return b.score - a.score});
        return sorted;
    }

    render() {
        return this.displayResultTable(this.props.results);
    };
}

export default ResultsTable;