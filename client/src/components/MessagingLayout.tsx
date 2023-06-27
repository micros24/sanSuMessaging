import SideBar from "./SideBar";
import SideBarTop from "./SideBarTop";
import ChatMessage from "./ChatMessage";
import ChatWindow from "./ChatWindow";
import ChatWindowTop from "./ChatWindowTop";
import FriendRequests from "./FriendRequests";
import AccountModal from "./modals/AccountModal";
import FriendRequestsModal from "./modals/FriendRequestsModal";
import { useAuthState } from "../context/auth";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Navigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const FRIEND_REQUESTS_QUERY = gql`
  query getFriendRequests {
    getFriendRequests {
      sender recipient
    }
  }
`;

const FRIEND_REQUESTS_SUBSCRIPTION = gql`
  subscription newFriendRequest($recipient: String!) {
    newFriendRequest(recipient: $recipient) {
      sender recipient
    }
  }
`;

export default function MessagingLayout() {
  // workaround route guard
  const user = useAuthState().user;
  if (!user) {
    return <Navigate to="/" />;
  }
  const [_, setNotificationCount] = useState(0);

  // query on load
  const { subscribeToMore } = useQuery(FRIEND_REQUESTS_QUERY, {
    onCompleted(data) {
      setNotificationCount(data.getFriendRequests.length);
    },
  });

  const handleAccountClick = () => {
    const accountModal = document.getElementById("btnShowAccountModal");
    accountModal?.click();
  };

  const handleFriendRequestsClick = () => {
    const friendRequestsModal = document.getElementById(
      "btnShowFriendRequestsModal"
    );
    friendRequestsModal?.click();
  };

  const handleFriendClick= () => {
    // TODO: update ChatWindow on clicking a friend
  };

  return (
    <div className="vh-100">
      <FriendRequestsModal isNewLogin={true} />
      <AccountModal />
      <FriendRequests
        isNewLogin={true}
        onFriendRequestsClick={handleFriendRequestsClick}
        subscribeToFriendRequests={() =>
          subscribeToMore({
            document: FRIEND_REQUESTS_SUBSCRIPTION,
            variables: { recipient: user.email },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newCount = subscriptionData.data.newFriendRequest;
              return Object.assign({}, prev, {
                getFriendRequests: {
                  recipient: [newCount, ...prev.getFriendRequests],
                  sender: [newCount, ...prev.getFriendRequests]
                }
              });
            }
          })
        }
      />
      <Row>
        <Col className="col-2">
          <Row className="mt-3">
            <SideBarTop onAccountClick={handleAccountClick} />
          </Row>
          <Row
            className="overflow-auto col-2 mx-0"
            style={{ position: "absolute", height: "91vh", marginTop: "2vh" }}
          >
            <SideBar onFriendClick={handleFriendClick}/>
          </Row>
        </Col>
        <Col className="col-10 mt-3">
          <Row>
            <ChatWindowTop />
          </Row>
          <Row
            style={{
              position: "absolute",
              height: "85vh",
              width: "81%",
              marginTop: "2vh",
              marginLeft: "0.5%",
            }}
            className="bg-white bg-trans overflow-auto"
          >
            <ChatWindow />
          </Row>
          <Row
            style={{
              position: "absolute",
              bottom: "1%",
              width: "80%",
              marginLeft: "1%",
            }}
          >
            <ChatMessage />
          </Row>
        </Col>
      </Row>
    </div>
  );
}
