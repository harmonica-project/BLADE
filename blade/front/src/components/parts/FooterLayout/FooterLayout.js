
import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import sorbonne from "../../../static/vendor/sorbonne.svg";
import cri from "../../../static/vendor/cri.png";

import './FooterLayout.css';

/**
 * FooterLayout: template for BLADE Footer
 *
 * @version 1.0.0
 * @author [Nicolas Six](https://github.com/nicoSix)
 */
class FooterLayout extends PureComponent {
    render() {
        return (
            <footer className="footer d-none d-sm-block">
                <Container fluid>
                    <Row>
                        <Col>
                            <p><b>Affiliations</b></p>
                            <img src={ sorbonne } className="img-fluid" width="200" alt="Université Paris 1 Panthéon-Sorbonne"/>
                            <img src={ cri } className="img-fluid" width="200" alt="Centre de Recherche en Informatique (CRI)"/>
                        </Col>
                        <Col>
                            <p><b>Developed by</b></p>
                            <div>Nicolas Six, Ph.D. student, Paris 1 Panthéon-Sorbonne</div>
                            <div>Nicolas Herbaut, Associate Professor, Paris 1 Panthéon-Sorbonne</div>
                            <div>Camille Salinesi, Professor, Paris 1 Panthéon-Sorbonne</div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        )
    };
}

export default FooterLayout;