import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAuthDispatch, useAuthState } from "../../context/auth";
import { useNavigate, Link, redirect } from "react-router-dom";
import { Col, Form, Row } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { JWT_SECRET } from '../../../../src/config/env.json';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//TODO: token generation when editing account details

const EDIT_USER_DETAILS = gql`
  mutation editUserDetails($firstName: String!, $lastName: String!, $profilePicture: String) {
    editUserDetails(firstName: $firstName, lastName: $lastName, profilePicture: $profilePicture) {
      email
      firstName
      lastName
      profilePicture
    }
  }
`;

interface Props {
  showAddAFriendButton?: boolean;
}

export default function AccountModal({ showAddAFriendButton }: Props) {
  const [show, setShow] = useState(false);
  const [toastText, setToastText] = useState("");
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
    profilePicture: ""
  });

  const [editUserDetails, { loading }] = useMutation(EDIT_USER_DETAILS, {
    onError: (error) =>  console.log(error), //setErrors(error.graphQLErrors[0].extensions.errors),
    onCompleted(data) {
      let newUserData = data.editUserDetails;
      let tokenData = {
        email: user.email,
        firstName: newUserData.firstName,
        lastName: newUserData.lastName,
        profilePicture: newUserData.profilePicture
      }

    // Token generation
    user.token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: 60 * 60 }); 

      dispatch({ type: "LOGIN", payload: user });
    },
    variables: formData
    }
  );

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    redirect("/"); // Redirect to Login
  };

  const handleEditProfileFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    editUserDetails();
    notify();
  };

  const footerOverride = {
    justifyContent: "space-between",
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        newestOnTop={false}
        hideProgressBar={true}
        theme="colored"
        closeOnClick
      />
      <Button
        id="btnShowAccountModal"
        variant="primary"
        onClick={handleShow}
        hidden
      ></Button>
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
            <Link to="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="150"
                height="150"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </Link>
          </p>
          <Button variant="primary" type="submit">
            Edit profile picture
          </Button>
          <hr/>
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
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    className={errors.email && "is-invalid"}
                    type="text"
                    defaultValue={user.lastName}
                    placeholder="Last name"
                    disabled={loading}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button 
              id="btnSubmitEditProfileForm"
              hidden 
              type="submit" 
              onClick={() => setToastText("Account details have been updated!")}
            />
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
            <Button variant="secondary" disabled={loading} onClick={handleClose}>
              Cancel
            </Button>{" "}
            <Button variant="primary" disabled={loading} onClick={() => document.getElementById("btnSubmitEditProfileForm")?.click()}>
              Save changes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
