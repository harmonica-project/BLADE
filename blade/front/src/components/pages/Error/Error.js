
import React, { Component } from 'react';
import { Container, Row, Jumbotron } from 'react-bootstrap';
import './Error.css';

/**
 * Error: entry point of the BLADE project
 *
 * @version 1.0.0
 * @author [Nicolas Six](https://github.com/nicoSix)
 */
class Error extends Component {
    render() {
        return (
            <div className="error">
                <Container>
                    <Row>
                        <Jumbotron>
                            <h1 className="display-4">Error { this.props.errorCode }: { this.props.errorMsgShort }.</h1>
                            <p className="lead">{ this.props.errorMsgLong }</p>
                        </Jumbotron>
                    </Row>
                </Container>
            </div>
        )
    };
}

export default Error;