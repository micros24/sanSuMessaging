import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import Login from "./components/Login";
import Register from "./components/Register";

// const ws = new WebSocket("ws://localhost:3000");
// ws.addEventListener("message", function (event) {
//   const data = JSON.parse(event.data);

//   if (data.type === "message") {
//     addMessage(data.data, data.kind);
//   }
// });

function App() {
  return (
    <div className="container-flex">
      {/* <Login /> */}
      <Register />
    </div>
  );
}

export default App;
