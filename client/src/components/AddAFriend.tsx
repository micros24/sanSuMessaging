import { useNavigate, Navigate } from "react-router-dom";
import { useAuthState } from "../context/auth";
import { FormEvent, useState } from "react";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const GET_USERS = gql`
  query getUsers($name: String!) {
    getUsers(name: $name) {
      email
      firstName
      lastName
      profilePicture
    }
  }
`;

const SEND_FRIEND_REQUEST = gql`
  mutation sendFriendRequest($sender: String!, $recipient: String!) {
    sendFriendRequest(sender: $sender, recipient: $recipient) {
      sender
      recipient
    }
  }
`;

let users;
export default function AddAFriend() {
  // workaround route guard
  const user = useAuthState().user;
  if (!user) {
    return <Navigate to="/" />;
  }

  const navigate = useNavigate();
  const [errors, setErrors] = useState(Object);
  const [friendSearchName, setFriendSearchName] = useState({
    name: "",
  });

  const [formData, setFormData] = useState({
    sender: "",
    recipient: "",
  });

  const [getUsers, { loading }] = useLazyQuery(GET_USERS, {
    onError: (error) => setErrors(error.graphQLErrors[0].extensions),
    onCompleted(data) {
      users = data.getUsers;
    },
  });

  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST, {
    onError: (error) => setErrors(error.graphQLErrors[0].extensions),
    variables: formData,
  });

  const handleSendFriendRequest = (e: FormEvent) => {
    e.preventDefault();
    sendFriendRequest();
  };

  const handleGoBack = () => {
    navigate("/messaging"); // Messages
  };

  return (
    <div className="container w-75">
      <Row className="mb-3 mt-3 p-3 bg-white text-dark bg-trans">
        <Button
          variant="secondary"
          type="button"
          style={{ position: "absolute", width: "100px" }}
          onClick={handleGoBack}
        >
          Go back
        </Button>
        <h1 className="text-center">Search for a friend</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formsEmailAddress">
            <Form.Label className={errors.errors && "text-danger"}>
              {errors.errors ?? "Enter the friend's name"}
            </Form.Label>
            <Form.Control
              className={errors.errors && "is-invalid"}
              type="text"
              placeholder="Name"
              disabled={loading}
              onChange={(e) => setFriendSearchName({ name: e.target.value })}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  document.getElementById("btnSearchFriend")?.click();
                }
              }}
            />
          </Form.Group>

          <div className="text-center mb-3">
            <Button
              id="btnSearchFriend"
              variant="success"
              type="button"
              className="w-100"
              disabled={loading}
              onClick={() => {
                getUsers({ variables: friendSearchName });
              }}
            >
              Search a friend
            </Button>
          </div>
        </Form>
      </Row>

      <Form onSubmit={handleSendFriendRequest}>
        <Row className="p-3 bg-white text-dark bg-trans">
          <ListGroup>
            {users ? (
              users.map((user) => (
                <ListGroup.Item key={user.email}>
                  <div className="d-flex justify-content-between align-items-center">
                    {user.profilePicture} {user.firstName} {user.lastName} (
                    {user.email})
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
                        setFormData({ ...formData, recipient: user.email });
                      }}
                    >
                      Send request
                    </Button>
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <span className="text-center">
                Frined search will appear here.
              </span>
            )}
          </ListGroup>
        </Row>
      </Form>
    </div>
  );
}
