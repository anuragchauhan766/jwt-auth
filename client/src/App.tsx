import Signin from "./pages/Auth/Signin";

import { Routes, Route, Outlet } from "react-router-dom";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Signup from "./pages/Auth/Signup";
import Resetpassword from "./pages/Auth/Resetpassword";
import EmailVerfication from "./pages/Auth/EmailVerfication";

import Home from "./pages/Home/Home";
import Navbar from "@components/Navbar/Navbar";

import Account from "./pages/User/Account";
import ProtectedRoute from "@components/Protected/ProtectedRoute";

function Layout() {
  return (
    <div className="bg-dark-blue w-full h-full ">
      <div className=" flex w-full h-screen  p-10 flex-col space-y-5">
        <Navbar />
        <Outlet />
      </div>
      <hr className="border-black" />
      <footer className="w-full bg-dark-blue flex items-center justify-center p-5">
        <p className="text-white font-light text-lg">
          Made with ❤️ by Anurag Singh Chauhan
        </p>
      </footer>
    </div>
  );
}
function App() {
  return (
    <div className="bg-dark-blue">
      <Routes>
        // with navbar pages
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/account/:user" element={<Account />}></Route>
          </Route>
        </Route>
        // without navbar pages
        <Route path="/auth/signin" element={<Signin />}></Route>
        <Route path="/auth/signup" element={<Signup />}></Route>
        <Route path="/auth/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/auth/resetpassword" element={<Resetpassword />}></Route>
        <Route
          path="/auth/emailverification"
          element={<EmailVerfication />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
