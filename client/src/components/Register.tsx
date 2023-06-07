import { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    profilePicture: "",
  });

  const submitRegisterForm = (e: FormEvent) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="d-flex justify-content-center">
      <Row className="mt-5 mb-5 p-3 bg-white text-dark bg-form">
        <h1 className="text-center">Registration</h1>
        <Form onSubmit={submitRegisterForm}>
          <Form.Group className="mb-3" controlId="formsEmailAddress">
            <Form.Label>Email Address</Form.Label>
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

          <Form.Group className="mb-3" controlId="formsConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formsFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formsLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              value={formData.profilePicture}
              onChange={(e) =>
                setFormData({ ...formData, profilePicture: e.target.value })
              }
            />
            <Form.Text className="text-muted">
              You can leave this field blank if you prefer.
            </Form.Text>
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              type="submit"
              className="w-25 btn-success"
            >
              Register
            </Button>
          </div>
        </Form>
      </Row>
    </div>
  );
}
