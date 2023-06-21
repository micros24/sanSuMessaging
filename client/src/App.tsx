// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Register from "./components/Register";
import MessagingLayout from "./components/MessagingLayout";
import AddAFriend from "./components/AddAFriend";
import { AuthProvider } from "./context/auth";

// const ws = new WebSocket("ws://localhost:3000");
// ws.addEventListener("message", function (event) {
//   const data = JSON.parse(event.data);

//   if (data.type === "message") {
//     addMessage(data.data, data.kind);
//   }
// });

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" index Component={Login} />
          <Route path="register" Component={Register} />
          <Route path="messaging" Component={MessagingLayout} />
          <Route path="addFriend" Component={AddAFriend} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
