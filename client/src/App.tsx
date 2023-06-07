import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SideBarTop from "./components/SideBarTop";
import SideBar from "./components/SideBar";
import ChatWindow from "./components/ChatWindow";
import ChatMessage from "./components/ChatMessage";
import ChatWindowTop from "./components/ChatWindowTop";
import AccountModal from "./components/modals/AccountModal";

// const ws = new WebSocket("ws://localhost:3000");
// ws.addEventListener("message", function (event) {
//   const data = JSON.parse(event.data);

//   if (data.type === "message") {
//     addMessage(data.data, data.kind);
//   }
// });

function addMessage(clientMessage: string, kind: string) {
  const row = document.createElement("tr");
  const col = document.createElement("td");
  const text = document.createTextNode(clientMessage);

  if (kind === "sender") {
    col.classList.value = "d-flex justify-content-end";
  }

  row.appendChild(col);
  col.appendChild(text);
  const chatWindowMessages = document.getElementById("chatWindowTable");
  chatWindowMessages?.appendChild(row);
}

function App() {
  const handleClickSend = () => {
    const clientMessage = document.getElementById(
      "chatMessageMessage"
    ) as HTMLTextAreaElement;

    if (!clientMessage) return false;

    // ws.send(
    //   JSON.stringify({
    //     type: "message",
    //     data: clientMessage.value,
    //     kind: "receiver",
    //   })
    // );

    addMessage(clientMessage.value, "sender");
    clientMessage.value = "";
  };

  const handleAccountClick = () => {
    const accountModal = document.getElementById("btnShowAccountModal");
    accountModal?.click();
  };

  return (
    <div className="container-flex">
      <table className="table table-borderless mb-0 position-fixed overflow-auto vh-100">
        <tbody>
          <tr>
            <td className="col-2 p-0 m-0 border-end position-fixed vh-100">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td className="bg-success border-bottom">
                      <SideBarTop onAccountClick={handleAccountClick} />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-0">
                      <SideBar />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td className="col-10 p-0">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td className="border-bottom">
                      <ChatWindowTop />
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="position-fixed overflow-scroll"
                      style={{ height: "90%", width: "83.3%" }}
                    >
                      <ChatWindow />
                      <AccountModal />
                    </td>
                  </tr>
                  <tr className="m-0 p-0">
                    <td
                      className="fixed-bottom pb-0"
                      style={{
                        width: "83.3%",
                        marginLeft: "16.7%",
                        height: "8%",
                      }}
                    >
                      <ChatMessage onSend={handleClickSend} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
