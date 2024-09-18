import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import SSOLogin from "./pages/SSOLogin";
import RechargeReceipt from "./ui/RechargeReceipt";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sso" element={<SSOLogin />} />
        <Route path="home/*" element={<Home />} />
        <Route path="/recharge-receipt/*" element={<RechargeReceipt />} />
      </Routes>
    </Router>
  );
}

export default App;
