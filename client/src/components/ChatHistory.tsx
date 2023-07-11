import { useState, useRef, useEffect } from "react";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { useMessagingState } from "../context/messaging";
import { useAuthState } from "../context/auth";
import { MessageModel } from "../../../src/models";
import { Badge } from "react-bootstrap";

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

const NEW_MESSAGES_SUBSCRIPTION = gql`
  subscription newMessage($recipient: String!, $from: String!) {
    newMessage(recipient: $recipient, from: $from) {
      uuid
      to
      from
      content
      createdAt
    }
  }
`;

interface Props {
  clearMessageHistory: boolean;
}

export default function ChatHistory({ clearMessageHistory }: Props) {
  const user = useAuthState().user;
  const currentlyMessaging = useMessagingState().recipient;
  const divRef = useRef<HTMLDivElement>(null);
  const [messageHistory, setMessageHistory] = useState<MessageModel[]>([]);

  let from;
  if (currentlyMessaging) {
    from = currentlyMessaging.email;
  } else {
    from = undefined;
  }

  useEffect(() => {
    if (divRef.current != null) divRef.current.scrollIntoView();
  });

  const { refetch } = useQuery(GET_MESSAGES, {
    onCompleted(data) {
      var myArray = Array.from(data.getMessages).reverse();
      setMessageHistory(myArray);
    },
    variables: {
      from: from,
    },
  });

  if (clearMessageHistory === true) {
    // re-render
    clearMessageHistory = false;
    refetch();
  }

  useSubscription(NEW_MESSAGES_SUBSCRIPTION, {
    // onError: (error) =>
    //   alert("An error has occured: " + error.graphQLErrors[0].extensions.code),
    onData(data) {
      let newMessage = data.data.data.newMessage;
      let temp = [...messageHistory, newMessage];
      setMessageHistory(temp);
    },
    variables: {
      from: from,
      recipient: user.email,
    },
  });

  return (
    <div>
      {messageHistory.length !== 0 ? (
        messageHistory.map((message) => (
          <div key={message.uuid} style={{ fontSize: "24px" }}>
            {message.from === currentlyMessaging.email ? (
              // Their messages
              <div className="d-flex justify-content-start text-center p-1">
                <Badge
                  pill
                  bg="light"
                  className="px-3 py-2 fw-normal"
                  text="dark"
                >
                  {message.content}
                </Badge>
              </div>
            ) : (
              // My messages
              <div className="d-flex justify-content-end text-center p-1">
                <Badge pill bg="success" className="px-3 py-2 fw-normal">
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
      <div ref={divRef} />
    </div>
  );
}
