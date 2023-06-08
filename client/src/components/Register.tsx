import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const REGISTER_USER = gql`
  mutation register(
    $email: String!
    $password: String!
    $confirmPassword: String!
    $firstName: String!
    $lastName: String!
    $profilePicture: String
  ) {
    register(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
      firstName: $firstName
      lastName: $lastName
      profilePicture: $profilePicture
    ) {
      email
      firstName
      lastName
    }
  }
`;

export default function Register() {
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState(Object);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    profilePicture: "",
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      console.log(result);
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
    variables: formData,
  });

  const handleSubmitRegisterForm = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) e.stopPropagation();

    setValidated(true);
    registerUser();
  };

  return (
    <div className="d-flex justify-content-center">
      <Row className="mt-5 mb-5 p-3 bg-white text-dark bg-form">
        <h1 className="text-center">Registration</h1>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmitRegisterForm}
        >
          <Form.Group className="mb-3" controlId="formsEmailAddress">
            <Form.Label className={errors.email && "text-danger"}>
              {errors.email ?? "Email Address"}
            </Form.Label>
            <Form.Control
              className={errors.email && "is-invalid"}
              required
              type="email"
              placeholder="Email"
              value={formData.email}
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
              required
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formsConfirmPassword">
            <Form.Label className={errors.confirmPassword && "text-danger"}>
              {errors.confirmPassword ?? "Confirm Password"}
            </Form.Label>
            <Form.Control
              className={errors.confirmPassword && "is-invalid"}
              required
              type="password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formsFirstName">
            <Form.Label className={errors.firstName && "text-danger"}>
              {errors.firstName ?? "First Name"}
            </Form.Label>
            <Form.Control
              className={errors.firstName && "is-invalid"}
              required
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formsLastName">
            <Form.Label className={errors.lastName && "text-danger"}>
              {errors.lastName ?? "Last Name"}
            </Form.Label>
            <Form.Control
              className={errors.lastName && "is-invalid"}
              required
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label className={errors.profilePicture && "text-danger"}>
              {errors.profilePicture ?? "Profile Picture"}
            </Form.Label>
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
              disabled={loading}
            >
              Register
            </Button>
          </div>
        </Form>
      </Row>
    </div>
  );
}
