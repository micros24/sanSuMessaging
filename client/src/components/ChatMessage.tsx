import { useState } from "react";
import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";

export default function ChatMessage() {
  const handleOnMessageSend = (e) => {};
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    message: "",
  });

  return (
    <>
      <Row>
        <Col>
          <Form onSubmit={handleOnMessageSend}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Aa"
                value={formData.message}
                aria-label="Aa"
                aria-describedby="messageSendInput"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    document.getElementById("btnMessageSendInput")?.click();
                  }
                }}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
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
