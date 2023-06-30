import SideBar from "./SideBar";
import SideBarTop from "./SideBarTop";
import ChatMessage from "./ChatMessage";
import ChatWindow from "./ChatWindow";
import ChatWindowTop from "./ChatWindowTop";
import FriendRequests from "./FriendRequests";
import AccountModal from "./modals/AccountModal";
import FriendRequestsModal from "./modals/FriendRequestsModal";
import ChangePasswordModal from "./modals/ChangePasswordModal";
import { useAuthState } from "../context/auth";
import { Col, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MessagingLayout() {
  // workaround route guard
  const user = useAuthState().user;
  if (!user) {
    return <Navigate to="/" />;
  }

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

  const handleOnMessageSend = () => {
    // TODO: sending of message backend and frontend
  };

  return (
    <div className="vh-100">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        newestOnTop={false}
        hideProgressBar={true}
        theme="colored"
        pauseOnFocusLoss={false}
        closeOnClick
      />
      <FriendRequestsModal isNewLogin={true} />
      <AccountModal />
      <ChangePasswordModal />
      <FriendRequests
        isNewLogin={true}
        onFriendRequestsClick={handleFriendRequestsClick}
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
            <SideBar 
              onFriendClick={handleFriendClick}
            />
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
            <ChatMessage onMessageSend={handleOnMessageSend} />
          </Row>
        </Col>
      </Row>
    </div>
  );
}
