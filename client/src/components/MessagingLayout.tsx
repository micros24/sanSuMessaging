import SideBarTop from "./SideBarTop";
import SideBar from "./SideBar";
import ChatMessage from "./ChatMessage";
import ChatWindow from "./ChatWindow";
import ChatWindowTop from "./ChatWindowTop";

export default function MessagingLayout() {
  return (
    <>
      {/* <SideBarTop /> */}
      <SideBar />
      <ChatWindowTop />
      <ChatWindow />
      {/* <ChatMessage /> */}
    </>
  );
}
