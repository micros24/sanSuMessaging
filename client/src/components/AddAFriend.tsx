import { useNavigate, Navigate } from "react-router-dom";
import { useAuthState } from "../context/auth";
import { FormEvent, useState } from "react";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import SideBarTop from "./SideBarTop";
import { ListGroup, Button, Form, Row, Image } from "react-bootstrap";
import AccountModal from "./modals/AccountModal";
import { FriendRequestSentCheckerModel } from "../../../src/models";

const GET_USERS_QUERY = gql`
  query getUsers($name: String!) {
    getUsers(name: $name) {
      email
      firstName
      lastName
      profilePicture
      match
    }
  }
`;

const SEND_FRIEND_REQUEST = gql`
  mutation sendFriendRequest($recipient: String!) {
    sendFriendRequest(recipient: $recipient) {
      recipient
    }
  }
`;

export default function AddAFriend() {
  const [users, setUsers] = useState<FriendRequestSentCheckerModel[]>([]);
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
    recipient: "",
  });

  const [getUsers, { loading }] = useLazyQuery(GET_USERS_QUERY, {
    onError: (error) => setErrors(error.graphQLErrors[0].extensions.code),
    onCompleted(data) {
      setUsers(data.getUsers);
    },
  });

  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST, {
    onError: (error) => setErrors(error.graphQLErrors[0].extensions.code),
    variables: formData,
  });

  const handleSendFriendRequest = (e: FormEvent) => {
    e.preventDefault();
    sendFriendRequest();
  };

  const handleGoBack = () => {
    navigate("/messaging"); // Messages
  };

  const handleAccountClick = () => {
    const accountModal = document.getElementById("btnShowAccountModal");
    accountModal?.click();
  };

  return (
    <>
      <AccountModal showAddAFriendButton />
      <div className="mt-3">
        <SideBarTop onAccountClick={handleAccountClick} />
      </div>
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
              {users[0] ? (
                users.map((person: FriendRequestSentCheckerModel) => (
                  <ListGroup.Item key={person.email}>
                    <div className="d-flex justify-content-between align-items-center">
                      {person.profilePicture ? (
                        <Image
                          src={person.profilePicture}
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
                      )}{" "}
                      {person.firstName} {person.lastName} ({person.email})
                      {person.match === "recipient" ? (
                        <Button
                          variant="success"
                          type="button"
                          className="disabled"
                        >
                          Request sent!
                        </Button>
                      ) : person.match === "sender" ? (
                        <Button
                          variant="success"
                          type="button"
                          className="disabled"
                        >
                          They have sent you a friend request!
                        </Button>
                      ) : (
                        ""
                      )}
                    </div>
                  </ListGroup.Item>
                ))
              ) : (
                <span className="text-center">
                  Friend search will appear here.
                </span>
              )}
            </ListGroup>
          </Row>
        </Form>
      </div>
    </>
  );
}
