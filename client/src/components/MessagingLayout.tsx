import SideBar from "./SideBar";
import SideBarTop from "./SideBarTop";
import ChatMessage from "./ChatMessage";
import ChatWindow from "./ChatHistory";
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

  return (
    <div className="vh-100 overflow-hidden">
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
          <Row className="mt-2">
            <SideBarTop onAccountClick={handleAccountClick} />
          </Row>
          <Row
            className="overflow-auto col-2 mx-0"
            style={{ position: "absolute", height: "91.5vh", marginTop: "2vh" }}
          >
            <SideBar />
          </Row>
        </Col>
        <Col className="col-10 mt-2 p-0">
          <Row>
            <ChatWindowTop />
          </Row>
          <Row
            style={{
              position: "absolute",
              height: "86.5vh",
              width: "83.2%",
              marginTop: "10px",
              marginLeft: "10px",
            }}
            className="bg-white bg-messages overflow-auto"
          >
            <ChatWindow clearMessageHistory={true} />
          </Row>
          <Row
            style={{
              position: "absolute",
              bottom: "8px",
              width: "80%",
              marginLeft: "3%",
            }}
          >
            <ChatMessage />
          </Row>
        </Col>
      </Row>
    </div>
  );
}
