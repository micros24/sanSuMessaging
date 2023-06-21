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
  onFriendRequestsClick: () => void; // show modal
}

export default function Notifications({
  isNewLogin,
  onFriendRequestsClick,
}: Props) {
  const [notificationCount, setNotificationCount] = useState(0);

  const { refetch } = useQuery(FRIEND_REQUESTS, {
    pollInterval: 5000, // Poll every 5 seconds
    onCompleted(data) {
      setNotificationCount(data.getFriendRequests.length);
    },
  });
  if (isNewLogin === true) {
    // re-render
    refetch();
  }

  return (
    <Button
      variant="link"
      className="text-white d-flex justify-content-center align-items-center bg-transparent link-underline link-underline-opacity-0 "
      onClick={onFriendRequestsClick}
      style={{ position: "absolute", right: "0", margin: "0.5%" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="currentColor"
        className="bi bi-person-fill-add"
        viewBox="0 0 16 16"
      >
        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
      </svg>
      <Badge bg="danger">
        {notificationCount > 0 ? notificationCount : ""}
      </Badge>
      <span className="visually-hidden">Friend requests</span>
    </Button>
  );
}
