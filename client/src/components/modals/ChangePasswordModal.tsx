import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const CHANGE_PASSWORD = gql`
  mutation changePassword($oldPassword: String!, $newPassword: String!, $confirmPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword, confirmPassword: $confirmPassword) {
      email firstName lastName
    }
  }
`;

export default function ChangePasswordModal() {
  const [show, setShow] = useState(false);
  const [toastText] = useState("Your password have been changed!");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errors, setErrors] = useState(Object);
  const notify = () => toast(toastText);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    onError: (error) => setErrors(error.graphQLErrors[0].extensions.errors),
    onCompleted() {
      notify();
      handleClose();
    },
    variables: formData,
  });

  const handleChangePasswordFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    changePassword();
  };

  return (
    <>
      <Button
        id="btnShowChangePasswordModal"
        variant="primary"
        onClick={handleShow}
        hidden
      />
      <Modal 
        show={show} 
        onHide={handleClose} 
        centered
        backdrop="static"
        keyboard={false}
        >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleChangePasswordFormSubmit}>
          <Modal.Body className="text-center">

                <Form.Group className="mb-3" controlId="formsCurrentPassword">
                  <Form.Label className={errors.oldPassword && "text-danger"}>
                    {errors.oldPassword ?? "Current Password"}
                  </Form.Label>
                  <Form.Control
                    className={errors.oldPassword && "is-invalid"}
                    placeholder="Current password"
                    type="password"
                    onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formsNewPassword">
                  <Form.Label className={errors.newPassword && "text-danger"}>
                    {errors.newPassword ?? "New Password"}
                  </Form.Label>
                  <Form.Control
                    className={errors.newPassword && "is-invalid"}
                    placeholder="New password"
                    type="password"
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formsConfirmPassword">
                  <Form.Label className={errors.confirmPassword && "text-danger"}>
                    {errors.confirmPassword ?? "Confirm Password"}
                  </Form.Label>
                  <Form.Control
                    className={errors.confirmPassword && "is-invalid"}
                    placeholder="Confirm password"
                    type="password"
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </Form.Group>
          </Modal.Body>

          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Change password
              </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
