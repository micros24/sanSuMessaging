import { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class Login extends Component {
  render() {
    return (
      <div className="conatiner d-flex justify-content-center">
        <Form className="w-50">
          <Form.Group className="mb-3" controlId="formsEmailAddress">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formsPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <p>Dont have an account? Register here!</p>

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="w-25">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Login;
