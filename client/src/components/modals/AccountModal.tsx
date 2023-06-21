import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAuthDispatch, useAuthState } from "../../context/auth";
import { useNavigate, Link } from "react-router-dom";

interface Props {
  showAddAFriendButton?: boolean;
}

export default function AccountModal({ showAddAFriendButton }: Props) {
  const [show, setShow] = useState(false);
  const dispatch = useAuthDispatch();
  const user = useAuthState().user;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/"); // Redirect to Login
  };

  const handleAddFriend = (e) => {
    e.preventDefault();
    navigate("/addFriend");
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
            {user.firstName} {user.lastName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>
            <Link to="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="150"
                height="150"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </Link>
          </p>
          <p>TODO: Put profile picture editing</p>
          <p>123123</p>
          <p>123123</p>
          <p>123123</p>
          <p>123123</p>
        </Modal.Body>
        <Modal.Footer style={footerOverride}>
          <div>
            <Button variant="danger" onClick={handleLogOut}>
              Logout
            </Button>
          </div>
          <div>
            <Button
              variant="success"
              onClick={handleAddFriend}
              hidden={showAddAFriendButton}
            >
              Add a friend
            </Button>
          </div>
          <div>
            <Button variant="primary" onClick={handleClose}>
              Save changes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
