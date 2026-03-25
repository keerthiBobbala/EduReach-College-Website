import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/Navbar";
import FloatingChatButton from "./components/FloatingChatButton";

const WithNavbar = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    {children}
    <FloatingChatButton />
  </>
);

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-center" />
        <WithNavbar>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </WithNavbar>
      </AuthProvider>
    </BrowserRouter>
  );
}