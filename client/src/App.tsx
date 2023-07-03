import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Register from "./components/Register";
import MessagingLayout from "./components/MessagingLayout";
import AddAFriend from "./components/AddAFriend";
import { AuthProvider } from "./context/auth";
import { MessagingProvider } from "./context/messaging";

export default function App() {
  return (
    <AuthProvider>
      <MessagingProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/messaging" element={<MessagingLayout />} />
            <Route path="/addFriend" element={<AddAFriend />} />
          </Routes>
        </BrowserRouter>
      </MessagingProvider>
    </AuthProvider>
  );
}
