import SideBarTop from "./SideBarTop";
import SideBar from "./SideBar";
import ChatMessage from "./ChatMessage";
import ChatWindow from "./ChatWindow";
import ChatWindowTop from "./ChatWindowTop";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function MessagingLayout() {
  return (
    <div className="container-flex">
      <Row className="h-100">
        <Col className="col-2">
          <SideBarTop />
          <SideBar />
        </Col>
        <Col className="col-10">
          <ChatWindowTop />
          <ChatWindow />
          <ChatMessage />
        </Col>
      </Row>
    </div>
  );
}
