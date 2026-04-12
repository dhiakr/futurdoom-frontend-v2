import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import SiteLayout from "./components/SiteLayout";
import ChatbotPage from "./pages/ChatbotPage";
import HomePage from "./pages/HomePage";
import Share from "./pages/Share";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/share" element={<Share />} />
      </Route>
      <Route path="/app" element={<ChatbotPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
