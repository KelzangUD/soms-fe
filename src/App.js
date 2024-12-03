import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import SSOLogin from "./pages/SSOLogin";
import { BankReceipt, RechargeReceipt, SalesReceipt } from "./ui/index";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sso" element={<SSOLogin />} />
        <Route path="home/*" element={<Home />} />
        <Route path="/recharge-receipt/*" element={<RechargeReceipt />} />
        <Route path="/bank-receipt/*" element={<BankReceipt />} />
        <Route path="/sales-order-receipt/*" element={<SalesReceipt />} />
        <Route path="/reset_password" element={<ResetPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
