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
    onError: (error) => alert(error.graphQLErrors[0].extensions.code),
    variables: formData,
  });

  const handleOnMessageSend = (e: FormEvent) => {
    e.preventDefault();
    setFormData({ ...formData, to: currentlyMessaging.email });
    sendMessage();
  };

  return (
    <>
      <Row>
        <Col>
          <Form onSubmit={handleOnMessageSend}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Aa"
                value={formData.content}
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
                id="btnMessageSendInput"
                onClick={handleOnMessageSend}
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
