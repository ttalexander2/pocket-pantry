import * as React from 'react';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ThemeProvider, Input, Button } from 'react-native-elements';

class NewPantryForm extends React.Component {  
  //TODO: Add form input
  render() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    );
  }
}

export default NewPantryForm;
