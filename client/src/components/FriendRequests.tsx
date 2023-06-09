import { useState } from "react";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { useAuthState } from "../context/auth";
import { Badge, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FRIEND_REQUESTS_QUERY = gql`
  query getFriendRequests {
    getFriendRequests {
      sender
    }
  }
`;

const FRIEND_REQUESTS_SUBSCRIPTION = gql`
  subscription newFriendRequest($recipient: String!) {
    newFriendRequest(recipient: $recipient) {
      sender
      recipient
    }
  }
`;

interface Props {
  isNewLogin: boolean;
  onFriendRequestsClick: () => void; // show modal
}

export default function FriendRequests({
  isNewLogin,
  onFriendRequestsClick,
}: Props) {
  const user = useAuthState().user;
  const [notificationCount, setNotificationCount] = useState(0);
  const [toastText] = useState("You have received a friend request");
  const notify = () => toast(toastText);

  const { refetch } = useQuery(FRIEND_REQUESTS_QUERY, {
    onError: (error) =>
      alert("An error has occured: " + error.graphQLErrors[0].extensions.code),
    onCompleted(data) {
      setNotificationCount(data.getFriendRequests.length);
    },
  });

  const {} = useSubscription(FRIEND_REQUESTS_SUBSCRIPTION, {
    onError: (error) =>
      alert("An error has occured: " + error.graphQLErrors[0].extensions.code),
    onData() {
      let plusOne = notificationCount + 1;
      setNotificationCount(plusOne);
      notify();
    },
    variables: {
      recipient: user.email,
    },
  });

  // re-render
  if (isNewLogin === true) {
    isNewLogin = false;
    refetch();
  }

  return (
    <Button
      variant="link"
      className="text-white d-flex justify-content-center align-items-center bg-transparent link-underline link-underline-opacity-0 mt-2"
      onClick={onFriendRequestsClick}
      style={{ position: "absolute", right: "0" }}
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
