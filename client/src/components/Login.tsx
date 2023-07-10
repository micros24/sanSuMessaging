import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { Button, Form, Row } from "react-bootstrap";
import { useAuthDispatch, useAuthState } from "../context/auth";

const LOGIN_USER = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      firstName
      lastName
      profilePicture
      token
    }
  }
`;

export default function Login() {
  // workaround route guard
  const user = useAuthState().user;
  if (user) {
    return <Navigate to="/messaging" />;
  }

  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(Object);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [getUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onError: (error) => setErrors(error.graphQLErrors[0].extensions.errors),
    onCompleted(data) {
      authDispatch({ type: "LOGIN", payload: data.login });
      navigate("/messaging");
    },
  });

  return (
    <div className="d-flex justify-content-center">
      <Row className="mt-5 mb-5 p-3 bg-white text-dark bg-trans">
        <h1 className="text-center">Login</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formsEmailAddress">
            <Form.Label className={errors.email && "text-danger"}>
              {errors.email ?? "Email Address"}
            </Form.Label>
            <Form.Control
              className={errors.email && "is-invalid"}
              type="email"
              placeholder="Email"
              // value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formsPassword">
            <Form.Label className={errors.password && "text-danger"}>
              {errors.password ?? "Password"}
            </Form.Label>
            <Form.Control
              className={errors.password && "is-invalid"}
              type="password"
              placeholder="Password"
              // value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  getUser({ variables: formData });
                }
              }}
            />
          </Form.Group>

          <p className="text-center">
            Dont have an account? <Link to="/register">Register here!</Link>
          </p>

          <div className="text-center mb-3">
            <Button
              variant="primary"
              type="button"
              className="w-100 btn-success"
              disabled={loading}
              onClick={() => {
                getUser({ variables: formData });
              }}
            >
              Log In
            </Button>
          </div>
        </Form>
      </Row>
    </div>
  );
}
