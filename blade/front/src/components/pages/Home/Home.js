
import React, { PureComponent } from 'react';
import { Container, Row, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';

/**
 * Home: entry point of the BLADE project
 *
 * @version 1.0.0
 * @author [Nicolas Six](https://github.com/nicoSix)
 */
class Home extends PureComponent {
    render() {
        return (
            <div className="home">
                <Container>
                    <Row>
                        <Jumbotron>
                            <h1 className="display-4">Welcome to the BLADE project</h1>
                            <p className="lead">The BLADE project aims to help companies choose between available blockchains.
                            From a set of requirements, this automated process will compute the most desirable 
                            blockchain alternative for your project.</p>
                            <hr className="my-4"/>
                            <p>To get started, click on the button below!</p>
                            <Link to="/recommendation">
                                <button className="btn btn-dark">Get recommendation</button>  
                            </Link>
                        </Jumbotron>
                    </Row>
                </Container>
            </div>
        )
    };
}

export default Home;