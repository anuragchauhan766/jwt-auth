import Signin from "./pages/Auth/Signin";

import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Signup from "./pages/Auth/Signup";
import Resetpassword from "./pages/Auth/Resetpassword";
import EmailVerfication from "./pages/Auth/EmailVerfication";

import Home from "./pages/Home/Home";

// function Layout() {
//   return (
//     <>
//       <Navbar />
//       <div className="w-full h-full pt-[72px]">
//         <Outlet />
//       </div>
//     </>
//   );
// }
function App() {
  return (
    <div className="bg-dark-blue">
      <Routes>
        // with navbar pages
        {/* <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/user" element={<Userdatatest />}></Route>
        </Route> */}
        // without navbar pages
        <Route path="/" element={<Home />}></Route>
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
