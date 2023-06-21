import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

const FRIEND_REQUESTS = gql`
  query getFriendRequests {
    getFriendRequests {
      sender
    }
  }
`;

interface Props {
  isNewLogin: boolean;
}

export default function Notifications({ isNewLogin }: Props) {
  const [notificationCount, setNotificationCount] = useState(0);

  const { refetch } = useQuery(FRIEND_REQUESTS, {
    pollInterval: 5000, // Poll every 5 seconds
    onCompleted(data) {
      setNotificationCount(data.getFriendRequests.length);
    },
  });
  if (isNewLogin === true) {
    refetch();
  }

  return (
    <Button
      type="button"
      variant="link"
      className="text-white d-flex justify-content-center align-items-center bg-transparent link-underline link-underline-opacity-0 "
      style={{ position: "absolute", right: "0", margin: "0.5%" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="currentColor"
        className="bi bi-bell-fill"
        viewBox="0 0 16 16"
      >
        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
      </svg>
      <Badge bg="danger">
        {notificationCount > 0 ? notificationCount : ""}
      </Badge>
      <span className="visually-hidden">Friend requests</span>
    </Button>
  );
}
