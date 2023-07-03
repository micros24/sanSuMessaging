import { gql, useQuery, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { Button, Modal, Form, ListGroup, Image } from "react-bootstrap";
import { FriendRequestModel } from "../../../../src/models";
import { toast } from "react-toastify";

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

export default function FriendRequestsModal({ isNewLogin }: Props) {
  const [show, setShow] = useState(false);
  const [toastText, setToastText] = useState("");
  const [users, setUsers] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const notify = () => toast(toastText);
  const [data, setData] = useState({
    sender: "",
  });

  const [addFriend] = useMutation(ADD_FRIEND, {
    onError: (error) =>
      alert("An error has occured: " + error.graphQLErrors[0].extensions.code),
    variables: data,
  });

  const [deleteFriendRequest] = useMutation(DELETE_FRIEND_REQUEST, {
    onError: (error) =>
      alert("An error has occured: " + error.graphQLErrors[0].extensions.code),
    variables: data,
  });

  const { refetch } = useQuery(FRIEND_REQUESTS, {
    onCompleted(data) {
      setUsers(data.getFriendRequests);
    },
  });
  if (isNewLogin === true) {
    // re-render
    isNewLogin = false;
    refetch();
  }

  const handleDeleteFriendRequest = (e: FormEvent) => {
    e.preventDefault();
    let temp = users;
    let index = temp.findIndex(() => e.currentTarget.id);
    delete temp[index];
    setUsers(temp);
    deleteFriendRequest();
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
      <Button id="btnShowFriendRequestsModal" onClick={handleShow} hidden />
      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Friend Requests</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <ListGroup variant="flush">
            {users[0] ? (
              users.map((friendRequest: FriendRequestModel) => (
                <ListGroup.Item
                  id={friendRequest.sender}
                  key={friendRequest.sender}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    {friendRequest.senderProfilePicture ? (
                      <Image
                        src={friendRequest.senderProfilePicture}
                        roundedCircle
                        height={50}
                        width={50}
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-person-circle text-primary"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                          fillRule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                      </svg>
                    )}
                    {friendRequest.senderFirstName}{" "}
                    {friendRequest.senderLastName} ({friendRequest.sender})
                    <Form onSubmit={handleDeleteFriendRequest}>
                      <Button
                        variant="danger"
                        type="submit"
                        onClick={() => {
                          setData({ sender: friendRequest.sender });
                          setToastText("Friend request ignored");
                        }}
                      >
                        Ignore
                      </Button>
                    </Form>
                    <Form onSubmit={handleAddFriend}>
                      <Button
                        id={"btn" + friendRequest.sender}
                        variant="primary"
                        type="submit"
                        onClick={() => {
                          setData({ sender: friendRequest.sender });
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
