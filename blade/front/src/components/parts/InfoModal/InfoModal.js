
import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './InfoModal.css';

/**
 * InfoModal: displayed when the user click on info in the results field
 * @version 1.0.0
 * @author [Nicolas Six](https://github.com/nicoSix)
 */
class InfoModal extends Component {
    constructor(props) {
        super(props);
            this.state = {
            modalShow: false,
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    
    openModal() {
        this.setState({
            modalShow: true,
        });
    }

    closeModal() {
        this.setState({
            modalShow: false,
        });
    }
    
    componentDidMount() {
        this.props.isOpen ? this.openModal() : this.closeModal();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.props.isOpen ? this.openModal() : this.closeModal();
        }
    }

    render() {
        return (
            <Modal show={this.state.modalShow} onHide={ this.closeModal } animation={false} className="infoModal">
                <Modal.Header closeButton>
                <Modal.Title>How to interpret the results</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        At each submission of requirements, the platform automatically computes a score using TOPSIS algorithm.
                        The score is a floating number between 0 and 1. Having a score close to 1 means that the alternative is close to the perfect
                        alternative for the submitted requirements (and the inverse for 0). Thus, an alternative can be ranked #1 in the results but far
                        from your requirements. 
                    </p>
                    <p>
                        An alternative can also have a score of -1. It means that one of your strict requirement is incompatible with the alternative.
                        Thus, the score is not computed. 
                    </p>
                    <p>
                        To ease your comprehension of the scores, you can see the content of the knowledge base in the corresponding section, on the platform.
                        You can also consult the documentation of TOPSIS to understand how are the scores computed in detail.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.closeModal}>
                    Close
                </Button>
                </Modal.Footer>
        </Modal>
        )
    };
}

export default InfoModal;