import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function ChangePasswordModal() {
  const [show, setShow] = useState(false);
  const [toastText, setToastText] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errors, setErrors] = useState(Object);
  const notify = () => toast(toastText);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChangePasswordFormSubmit = (e: FormEvent) => {
    // TODO: change password
  };

  return (
    <>
      <Button
        id="btnShowChangePasswordModal"
        variant="primary"
        onClick={handleShow}
        hidden
      ></Button>
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

        <Modal.Body className="text-center">
            <Form onSubmit={handleChangePasswordFormSubmit}>
                <Form.Group className="mb-3" controlId="formsCurrentPassword">
                  <Form.Label className={errors.oldPassword && "text-danger"}>
                    {errors.oldPassword ?? "Current Password"}
                  </Form.Label>
                  <Form.Control
                    className={errors.oldPassword && "is-invalid"}
                    placeholder="Current password"
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
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </Form.Group>
            </Form>
        </Modal.Body>

        <Modal.Footer>
          <div>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
