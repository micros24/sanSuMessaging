import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useMessagingState } from "../context/messaging";
import { MessageModel } from "../../../src/models";
import { Row, Col, Badge } from "react-bootstrap";

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
      {messages.length !== 0 ? (
        messages.map((message) => (
          <div key={message.uuid}>
            {message.from === currentlyMessaging.email ? (
              // Their messages
              <div className="d-flex justify-content-start text-center p-1">
                <Badge pill bg="light" className="px-3 py-2 text-black">
                  {message.content}
                </Badge>
              </div>
            ) : (
              // My messages
              <div className="d-flex justify-content-end text-center p-1">
                <Badge pill bg="success" className="px-3 py-2">
                  {message.content}
                </Badge>
              </div>
            )}
          </div>
        ))
      ) : (
        <h4 className="text-center">
          "You are now connected! Send your first message!"
        </h4>
      )}
    </div>
  );
}
