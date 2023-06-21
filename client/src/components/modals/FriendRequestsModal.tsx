import { gql, useQuery, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const ADD_FRIEND = gql`
  mutation addFriend($sender: String!) {
    addFriend(sender: $sender) {
      sender
    }
  }
`;

const DELETE_FRIEND_REQUEST = gql`
  mutation deleteFriendRequest($sender: String!) {
    deleteFriendRequest(sender: $sender) {
      sender
    }
  }
`;

interface Props {
  isNewLogin: boolean;
}

let users;
export default function NotificationsModal({ isNewLogin }: Props) {
  const [show, setShow] = useState(false);
  const [toastText, setToastText] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const showToastonClick = document.getElementById("btnShowToast");
  const notify = () => toast(toastText);
  const [data, setData] = useState({
    sender: "",
  });

  const [addFriend] = useMutation(ADD_FRIEND, {
    onError: (error) =>
      alert(
        "An error has occured: " + error.graphQLErrors[0].extensions.message
      ),
    variables: data,
  });

  const [deleteFriendRequest] = useMutation(DELETE_FRIEND_REQUEST, {
    onError: (error) =>
      alert("An error has occured: " + error.graphQLErrors[0].extensions),
    variables: data,
  });

  const { refetch } = useQuery(FRIEND_REQUESTS, {
    onCompleted(data) {
      users = data.getFriendRequests;
    },
  });
  if (isNewLogin === true) {
    // re-render
    refetch();
  }

  const handleDeleteFriendRequest = (e: FormEvent) => {
    e.preventDefault();
    document.getElementById(e.currentTarget.id)?.setAttribute("hidden", "");
    deleteFriendRequest();
    showToastonClick?.click();
    notify();
  };

  const handleAddFriend = (e: FormEvent) => {
    e.preventDefault();
    addFriend();
    deleteFriendRequest();
    notify();
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        newestOnTop={false}
        hideProgressBar={true}
        theme="colored"
        closeOnClick
      />
      <Button
        id="btnShowFriendRequestsModal"
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
                <ListGroup.Item id={user.sender} key={user.sender}>
                  <div className="d-flex justify-content-between align-items-center">
                    {user.senderProfilePicture} {user.senderFirstName}{" "}
                    {user.senderLastName} ({user.sender})
                    <Form onSubmit={handleDeleteFriendRequest}>
                      <Button
                        variant="danger"
                        type="submit"
                        onClick={() => {
                          setData({ sender: user.sender });
                          setToastText("Friend request ignored");
                        }}
                      >
                        Ignore
                      </Button>
                    </Form>
                    <Form onSubmit={handleAddFriend}>
                      <Button
                        id={"btn" + user.sender}
                        variant="primary"
                        type="submit"
                        onClick={() => {
                          setData({ sender: user.sender });
                          setToastText("Friend added!");
                        }}
                      >
                        Accept request
                      </Button>
                    </Form>
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
