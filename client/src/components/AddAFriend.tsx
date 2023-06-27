import { useNavigate, Navigate, useParams } from "react-router-dom";
import { useAuthState } from "../context/auth";
import { FormEvent, useState } from "react";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import SideBarTop from "./SideBarTop";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import AccountModal from "./modals/AccountModal";
import { UserModel } from "../../../src/models";

const GET_USERS = gql`
  query getUsers($name: String!) {
    getUsers(name: $name) {
      email firstName lastName profilePicture match
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
  let { refreshUsers } = useParams();
  const [users, setUsers] = useState([]);
  // workaround route guard
  const user = useAuthState().user;
  if (!user) {
    return <Navigate to="/" />;
  } else if (refreshUsers === "true") {
    setUsers([]);
    return <Navigate to="/addFriend" />;
  }

  const navigate = useNavigate();
  const [errors, setErrors] = useState(Object);
  const [friendSearchName, setFriendSearchName] = useState({
    name: "",
  });

  const [formData, setFormData] = useState({
    recipient: "",
  });

  const [getUsers, { loading }] = useLazyQuery(GET_USERS, {
    onError: (error) => setErrors(error.graphQLErrors[0].extensions),
    onCompleted(data) {
      setUsers(data.getUsers);
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
              {users ? (
                users.map((person: UserModel ) => (
                  <ListGroup.Item key={person.email}>
                    <div className="d-flex justify-content-between align-items-center">
                      {person.profilePicture} {person.firstName} {person.lastName} (
                      {person.email})

                      {person.match === true ? (
                        <Button
                        variant="success"
                        type="button"
                        className="disabled"
                        >
                          Request sent!
                        </Button>
                      ) : (
                            <Button
                            variant="primary"
                            type="submit"
                            onClick={(e) => {
                              setFormData({ recipient: person.email });
                              e.currentTarget.classList.add("disabled");
                              e.currentTarget.classList.replace(
                                "btn-primary",
                                "btn-success"
                              );
                              e.currentTarget.innerText = "Request sent!";
                            }}
                            >
                              Send request
                            </Button>
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
