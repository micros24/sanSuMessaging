// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Register from "./components/Register";
import MessagingLayout from "./components/MessagingLayout";
import { AuthProvider, useAuthState } from "./context/auth";
// import DynamicRoute from "./utils/DynamicRoute";

// const ws = new WebSocket("ws://localhost:3000");
// ws.addEventListener("message", function (event) {
//   const data = JSON.parse(event.data);

//   if (data.type === "message") {
//     addMessage(data.data, data.kind);
//   }
// });

export default function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(Boolean);
  // const user = useAuthState();
  // if (user) {
  //   setIsLoggedIn(true);
  // } else setIsLoggedIn(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* <DynamicRoute path="register" cCmponent={Register} guest />
            <DynamicRoute
              path="messaging"
              Component={MessagingLayout}
              authenticated
            />
            <DynamicRoute path="/" index Component={Login} guest /> */}

          <Route path="register" Component={Register} />
          <Route path="messaging" Component={MessagingLayout} />
          <Route path="/" index Component={Login} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
