import { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const submitLoginForm = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="d-flex justify-content-center">
      <Row className="mt-5 mb-5 p-3 bg-white text-dark bg-form">
        <h1 className="text-center">Login</h1>
        <Form onSubmit={submitLoginForm}>
          <Form.Group className="mb-3" controlId="formsEmailAddress">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formsPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </Form.Group>

          <p className="text-center">
            Dont have an account? <a href="/register">Register here!</a>
          </p>

          <div className="text-center mb-3">
            <Button
              variant="primary"
              type="submit"
              className="w-100 btn-success"
            >
              Log In
            </Button>
          </div>
        </Form>
      </Row>
    </div>
  );
}
