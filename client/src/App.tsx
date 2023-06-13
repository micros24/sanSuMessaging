import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Register from "./components/Register";
import MessagingLayout from "./components/MessagingLayout";

// const ws = new WebSocket("ws://localhost:3000");
// ws.addEventListener("message", function (event) {
//   const data = JSON.parse(event.data);

//   if (data.type === "message") {
//     addMessage(data.data, data.kind);
//   }
// });

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index Component={Login} />
        <Route path="register" Component={Register} />
        <Route path="messaging" Component={MessagingLayout} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
