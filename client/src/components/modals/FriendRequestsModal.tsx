import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate, Link } from "react-router-dom";

export default function FriendRequestsModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  return (
    <>
      <Button
        id="btnShowFriendRequestsModal"
        variant="primary"
        onClick={handleShow}
        hidden
      ></Button>
      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Friend Requests</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>tester body</p>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <Button variant="secondary">Close</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
