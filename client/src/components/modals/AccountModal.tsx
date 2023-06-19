import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAuthDispatch } from "../../context/auth";
import { useNavigate } from "react-router-dom";

export default function AccountModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/"); // Redirect to Login
  };

  const footerOverride = {
    justifyContent: "space-between",
  };

  return (
    <>
      <Button
        id="btnShowAccountModal"
        variant="primary"
        onClick={handleShow}
        hidden
      ></Button>

      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            TODO: Put currently logged-in user's name here
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>TODO: Put profile picture editing</p>
          <p>TODO: Put profile editing textboxes and functions</p>
        </Modal.Body>
        <Modal.Footer style={footerOverride}>
          <div>
            <Button variant="danger" onClick={handleLogOut}>
              Logout
            </Button>
          </div>
          <div>
            <Button
              variant="secondary"
              style={{ marginRight: "15px" }}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save changes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
