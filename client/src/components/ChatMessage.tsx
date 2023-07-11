import { useMessagingState } from "../context/messaging";
import { FormEvent } from "react";
import { useState } from "react";
import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

const SEND_MESSAGE = gql`
  mutation sendMessage($to: String!, $content: String!) {
    sendMessage(to: $to, content: $content) {
      to
      content
    }
  }
`;

export default function ChatMessage() {
  const currentlyMessaging = useMessagingState().recipient;
  const [formData, setFormData] = useState({
    to: "",
    content: "",
  });

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: () =>
      setFormData({
        to: "",
        content: "",
      }),
    variables: formData,
  });

  const handleOnMessageSend = (e: FormEvent) => {
    e.preventDefault();
    (document.getElementById("inputMessage") as HTMLInputElement).value = "";
    sendMessage();
  };

  return (
    <>
      <Row>
        <Col>
          <Form onSubmit={handleOnMessageSend}>
            <InputGroup className="mb-3">
              <Form.Control
                id="inputMessage"
                placeholder="Aa"
                aria-label="Aa"
                aria-describedby="messageSendInput"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    document.getElementById("btnMessageSendInput")?.click();
                  }
                }}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              />
              <Button
                variant="success text-white"
                type="submit"
                id="btnMessageSendInput"
                onClick={() =>
                  setFormData({ ...formData, to: currentlyMessaging.email })
                }
              >
                Send
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </>
  );
}
