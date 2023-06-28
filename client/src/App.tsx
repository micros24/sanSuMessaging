import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Register from "./components/Register";
import MessagingLayout from "./components/MessagingLayout";
import AddAFriend from "./components/AddAFriend";
import { AuthProvider } from "./context/auth";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" index Component={Login} />
          <Route path="register" Component={Register} />
          <Route path="messaging" Component={MessagingLayout} />
          <Route path="/addFriend" Component={AddAFriend} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
