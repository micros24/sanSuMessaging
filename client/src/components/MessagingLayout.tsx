import SideBar from "./SideBar";
import SideBarTop from "./SideBarTop";
import ChatMessage from "./ChatMessage";
import ChatWindow from "./ChatWindow";
import ChatWindowTop from "./ChatWindowTop";
import AccountModal from "./modals/AccountModal";
import { useAuthState } from "../context/auth";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Navigate } from "react-router-dom";

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

  return (
    <div className="vh-100">
      <Row>
        <Col className="col-2">
          <Row className="mt-3">
            <AccountModal />
            <SideBarTop onAccountClick={handleAccountClick} />
          </Row>
          <Row
            className="overflow-auto col-2 mx-0"
            style={{ position: "absolute", height: "91vh", marginTop: "2vh" }}
          >
            <SideBar />
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
              bottom: "2%",
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
