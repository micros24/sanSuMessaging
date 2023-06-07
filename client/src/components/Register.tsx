import { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class Register extends Component {
  render() {
    return (
      <div className="conatiner mt-5 pt-1 d-flex justify-content-center">
        <Form className="w-50">
          <Form.Group className="mb-3" controlId="formsEmailAddress">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formsPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formsConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formsFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control placeholder="First name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formsLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control placeholder="Last name" />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control type="file" />
            <Form.Text className="text-muted">
              You can leave this field blank if you prefer.
            </Form.Text>
          </Form.Group>

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

export default Register;
