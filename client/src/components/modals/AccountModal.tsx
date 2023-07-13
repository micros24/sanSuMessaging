import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { useAuthDispatch, useAuthState } from "../../context/auth";
import { useNavigate, Link } from "react-router-dom";
import {
  Col,
  Form,
  Row,
  Tooltip,
  Button,
  Modal,
  Image,
  OverlayTrigger,
} from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const footerOverride = {
  justifyContent: "space-between",
};

const EDIT_USER_DETAILS = gql`
  mutation editUserDetails(
    $firstName: String!
    $lastName: String!
    $profilePicture: String
  ) {
    editUserDetails(
      firstName: $firstName
      lastName: $lastName
      profilePicture: $profilePicture
    ) {
      email
      firstName
      lastName
      profilePicture
      token
    }
  }
`;

const UPDATE_PROFILE_PICTURE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

interface Props {
  showAddAFriendButton?: boolean;
}

export default function AccountModal({ showAddAFriendButton }: Props) {
  let file;
  const [show, setShow] = useState(false);
  const [toastText] = useState("Account details have been updated!");
  const notify = () => toast(toastText);
  const [errors, setErrors] = useState(Object);
  const dispatch = useAuthDispatch();
  const user = useAuthState().user;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    profilePicture: user.profilePicture,
  });

  const [editUserDetails, { loading }] = useMutation(EDIT_USER_DETAILS, {
    onError: (error) => setErrors(error.graphQLErrors[0].extensions.errors),
    onCompleted(data) {
      setErrors({});
      // refresh token on accout details edit
      dispatch({ type: "LOGIN", payload: data.editUserDetails });
      notify();
    },
    variables: formData,
  });

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    window.location.href = "/";
    // navigate("/");
    // location.reload();
  };

  const handleEditProfileFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    editUserDetails();
  };

  const handleChangePassword = () => {
    const changePasswordModal = document.getElementById(
      "btnShowChangePasswordModal"
    );
    handleClose();
    changePasswordModal?.click();
  };

  const [updateProfilePicture] = useMutation(UPDATE_PROFILE_PICTURE, {
    onError: (error) => setErrors(error.graphQLErrors[0].extensions.errors),
    onCompleted: (data) => {
      setFormData({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: data.uploadFile.url,
      });
      user.profilePicture = data.uploadFile.url;
    },
  });

  const handleChangeProfilePicture = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    const fileUpload = e.target.files[0];
    file = fileUpload;
    var fileName = file.name;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
      await updateProfilePicture({ variables: { file } });
    } else {
      e.currentTarget.value = "";
      alert("Only jpg/jpeg, png, and gif files are allowed!");
    }
  };

  const handleBtnClickEditProfilePicture = () => {
    let fileUploadInput = document.getElementById(
      "accountModalProfilePictureEdit"
    );
    fileUploadInput?.click();
  };

  return (
    <>
      <Form>
        <Form.Control
          id="accountModalProfilePictureEdit"
          type="file"
          accept="image/png, image/gif, image/jpeg"
          hidden
          onChange={handleChangeProfilePicture}
        />
      </Form>
      <Button
        id="btnShowAccountModal"
        variant="primary"
        onClick={handleShow}
        hidden
      />
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {user.firstName} {user.lastName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>
            {user.profilePicture ? (
              <Link to={user.profilePicture} target="_blank">
                <Image
                  src={user.profilePicture}
                  height={200}
                  width={200}
                  roundedCircle
                />
              </Link>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
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
            )}
          </p>
          <Button variant="primary" onClick={handleBtnClickEditProfilePicture}>
            Edit profile picture
          </Button>{" "}
          <Button variant="warning" onClick={handleChangePassword}>
            Change password
          </Button>
          <hr />
          <Form onSubmit={handleEditProfileFormSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formsEmail">
                  <Form.Label className={errors.email && "text-danger"}>
                    {errors.email ?? "Email Address"}
                  </Form.Label>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-top`}>
                        Contact an admin to change your email address
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      className={errors.email && "is-invalid"}
                      placeholder="Email address"
                      disabled
                      value={user.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </OverlayTrigger>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formsFirstName">
                  <Form.Label className={errors.firstName && "text-danger"}>
                    {errors.firstName ?? "First Name"}
                  </Form.Label>
                  <Form.Control
                    className={errors.firstName && "is-invalid"}
                    type="text"
                    placeholder="First name"
                    defaultValue={user.firstName}
                    disabled={loading}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="formsLastName">
                  <Form.Label className={errors.lastName && "text-danger"}>
                    {errors.lastName ?? "Last Name"}
                  </Form.Label>
                  <Form.Control
                    className={errors.lastName && "is-invalid"}
                    type="text"
                    placeholder="Last name"
                    defaultValue={user.lastName}
                    disabled={loading}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button id="btnSubmitEditProfileForm" hidden type="submit" />
          </Form>
        </Modal.Body>
        <Modal.Footer style={footerOverride}>
          <div>
            <Button variant="danger" disabled={loading} onClick={handleLogOut}>
              Logout
            </Button>
          </div>
          <div>
            <Button
              variant="success"
              type="button"
              onClick={() => navigate("/addFriend")}
              hidden={showAddAFriendButton}
              disabled={loading}
            >
              Add a friend
            </Button>
          </div>
          <div>
            <Button
              variant="secondary"
              disabled={loading}
              onClick={handleClose}
            >
              Cancel
            </Button>{" "}
            <Button
              variant="primary"
              disabled={loading}
              onClick={() =>
                document.getElementById("btnSubmitEditProfileForm")?.click()
              }
            >
              Save changes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
