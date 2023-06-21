import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";

const FRIEND_REQUESTS = gql`
  query getFriendRequests {
    getFriendRequests {
      sender
      recipient
      senderFirstName
      senderLastName
      senderProfilePicture
    }
  }
`;

interface Props {
  isNewLogin: boolean;
}

let users;
export default function NotificationsModal({ isNewLogin }: Props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    recipient: "",
  });

  const { refetch } = useQuery(FRIEND_REQUESTS, {
    pollInterval: 5000, // Poll every 5 seconds
    onCompleted(data) {
      users = data.getFriendRequests;
    },
  });
  if (isNewLogin === true) {
    // re-render
    refetch();
  }

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
          <ListGroup variant="flush">
            {users ? (
              users.map((user) => (
                <ListGroup.Item key={user.sender}>
                  <div className="d-flex justify-content-between align-items-center">
                    {user.senderProfilePicture} {user.senderFirstName}{" "}
                    {user.senderLastName} ({user.sender})
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={(e) => {
                        e.currentTarget.classList.add("disabled");
                        e.currentTarget.classList.replace(
                          "btn-primary",
                          "btn-success"
                        );
                        e.currentTarget.innerText = "Request sent!";
                        setFormData({ ...formData, recipient: user.sender });
                      }}
                    >
                      Accept request
                    </Button>
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <span className="text-center">
                People that requested you as a friend will appear here.
              </span>
            )}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
