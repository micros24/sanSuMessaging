import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useAuthState } from "../context/auth";
import { Button, Form, Row } from "react-bootstrap";

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
      profilePicture
    }
  }
`;

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function Register() {
  let file;
  // workaround route guard
  const user = useAuthState().user;
  if (user) {
    return <Navigate to="/messaging" />;
  }

  const navigate = useNavigate();
  const [errors, setErrors] = useState(Object);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    profilePicture: "",
  });

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onError: (error) => setErrors(error.graphQLErrors[0].extensions.errors),
    onCompleted: (data) => {
      setFormData({ ...formData, profilePicture: data.uploadFile.url });
    },
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onError: (error) => setErrors(error.graphQLErrors[0].extensions.errors),
    update: (_, __) => navigate("/"), // Redirect to Login
    variables: formData,
  });

  const handleSubmitRegisterForm = (e: FormEvent) => {
    e.preventDefault();
    registerUser();
  };

  const handleProfilePictureSelected = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    const fileUpload = e.target.files[0];
    file = fileUpload;
    var fileName = file.name;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
      await uploadFile({ variables: { file } });
    } else {
      e.currentTarget.value = "";
      alert("Only jpg/jpeg, png, and gif files are allowed!");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Row className="mt-5 mb-5 p-3 bg-white text-dark bg-trans">
        <span className="text-center">
          <h1>Registration</h1>
          Already have an account? <Link to="/">Login here!</Link>
        </span>
        <p></p>
        <Form onSubmit={handleSubmitRegisterForm}>
          <Form.Group className="mb-3" controlId="formsEmailAddress">
            <Form.Label className={errors.email && "text-danger"}>
              {errors.email ?? "Email Address"}
            </Form.Label>
            <Form.Control
              className={errors.email && "is-invalid"}
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
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="fileUploadProfilePicture" className="mb-3">
            <Form.Label className={errors.profilePicture && "text-danger"}>
              {errors.profilePicture ?? "Profile Picture"}
            </Form.Label>
            <Form.Control
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={handleProfilePictureSelected}
            />
            <Form.Text className="text-muted">
              This field is optional.
            </Form.Text>
          </Form.Group>

          <div className="text-center mb-3">
            <Button
              variant="primary"
              type="submit"
              className="w-100 btn-success"
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
