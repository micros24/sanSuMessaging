import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useMessagingState } from "../context/messaging";
import { MessageModel } from "../../../src/models";
import { Row, Col } from "react-bootstrap";

const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      uuid
      to
      from
      content
      createdAt
    }
  }
`;

export default function ChatHistory() {
  const currentlyMessaging = useMessagingState().recipient;
  const [messages, setMessages] = useState<MessageModel[]>([]);

  let from;
  if (currentlyMessaging) {
    from = currentlyMessaging.email;
  } else {
    from = "";
  }

  const {} = useQuery(GET_MESSAGES, {
    onCompleted(data) {
      setMessages(data.getMessages);
    },
    variables: {
      from: from,
    },
  });

  return (
    <div>
      <Row>
        <Col>
          <p>
            {messages.length !== 0
              ? messages.map((message) => (
                  <p>
                    {message.from === currentlyMessaging.email ? (
                      // My messages
                      <div className="d-flex justify-content-start">
                        {message.content}
                      </div>
                    ) : (
                      // Their messages
                      <div className="d-flex justify-content-end">
                        {message.content}
                      </div>
                    )}
                  </p>
                ))
              : "You are now connected! Send your first message!"}
          </p>
        </Col>
      </Row>
    </div>
  );
}
