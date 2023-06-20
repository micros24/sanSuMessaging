import { useNavigate, Navigate } from "react-router-dom";
import { useAuthState } from "../context/auth";
import { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
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

export default function AddAFriend() {
  // workaround route guard
  const user = useAuthState().user;
  if (!user) {
    return <Navigate to="/" />;
  }

  const navigate = useNavigate();
  const [errors, setErrors] = useState(Object);
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleGoBack = () => {
    navigate("/messaging"); // Messages
  };

  const [getUsers, { loading }] = useLazyQuery(GET_USERS, {
    onError: (error) => setErrors(error.graphQLErrors[0].extensions.errors),
    onCompleted(data) {
      let usersMarkup;
      if (!data || loading) {
        usersMarkup = <p>Loading...</p>;
      } else if (data.getUsers.length === 0) {
        usersMarkup = <p>Add some friends to start chatting :)</p>;
      } else if (data.getUsers.length > 0) {
        usersMarkup = data.getUsers.map((user) => (
          <div key={user.firstName + " " + user.lastName}>
            <p>{user.firstName + " " + user.lastName}</p>
          </div>
        ));
      }
    },
  });

  return (
    <div className="d-flex justify-content-center">
      <Row className="mt-5 mb-5 p-3 bg-white text-dark bg-trans">
        <Button
          variant="primary"
          type="button"
          style={{ position: "absolute", width: "100px" }}
          onClick={handleGoBack}
        >
          Go back
        </Button>
        <h1 className="text-center">Search for a friend</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formsEmailAddress">
            <Form.Label className={errors.name && "text-danger"}>
              {errors.name ?? "Enter the friend's name"}
            </Form.Label>
            <Form.Control
              className={errors.name && "is-invalid"}
              type="text"
              placeholder="Name"
              value={formData.name}
              disabled={loading}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Form.Group>

          <div className="text-center mb-3">
            <Button
              variant="success"
              type="button"
              className="w-100"
              disabled={loading}
              onClick={() => {
                getUsers({ variables: formData });
              }}
            >
              Back to messages
            </Button>
          </div>
        </Form>
      </Row>
    </div>
  );
}
