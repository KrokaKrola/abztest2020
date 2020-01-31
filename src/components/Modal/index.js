import React from 'react';
import { Modal } from 'react-bootstrap';

const SuccessModal = props => {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3>Congratulations</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You have successfully passed the registration</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn" onClick={props.onHide}>
          Great
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
