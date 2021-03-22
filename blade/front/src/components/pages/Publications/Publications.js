
import React, { PureComponent } from 'react';
import { Container } from 'react-bootstrap';
import './Publications.css';

/**
 * Publications: publication page for the BLADE Project
 *
 * @version 1.0.0
 * @author [Nicolas Six](https://github.com/nicoSix)
 */
class Publications extends PureComponent {
    render() {
        return (
            <div className="publications">
                <Container>
                    <h1 className="section-title display-4">Associated publications</h1>
                    <div className="list-group group-inputs">
                        <a href="https://arxiv.org/pdf/2101.08997" className="list-group-item list-group-item-action">
                             Nicolas Six, Claudia Negri Ribalta, Nicolas Herbaut, Camille Salinesi
                            "A blockchain-based pattern for confidential and pseudo-anonymous contract enforcement"
                            2020 IEEE 19th International Conference on Trust, Security and Privacy in Computing and Communications (TrustCom)
                        </a>
                    </div>

                        <div className="list-group group-inputs">
                        <a href="https://www.openscience.fr/BLADE-Un-outil-d-aide-a-la-decision-automatique-pour-guider-le-choix-de" className="list-group-item list-group-item-action">
                             N Six, N Herbaut, C Salinesi
                            "BLADE: Un outil d’aide à la décision automatique pour guider le choix de technologie Blockchain"
                            Revue ouverte d’ingénierie des systèmes d’information 2 (1)
                        </a>
                    </div>
                    
                    <div className="list-group group-inputs">
                        <a href="http://ceur-ws.org/Vol-2613/" className="list-group-item list-group-item-action">
                            Six, Nicolas. 
                            "Decision Process for Blockchain Architectures based on Requirements." 
                            CAiSE (Doctoral Consortium) 2020.
                        </a>
                    </div>
                    <div className="list-group group-inputs">
                        <a href="https://arxiv.org/abs/2004.06080" className="list-group-item list-group-item-action">
                            Six, Nicolas, Nicolas Herbaut, and Camille Salinesi. 
                            "Which Blockchain to choose? A decision support tool to guide the choice of a Blockchain technology." 
                            INFORSID2020.
                        </a>
                    </div>
                </Container>
            </div>
        )
    };
}

export default Publications;