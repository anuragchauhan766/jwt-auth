import { NavLink as RouterNavLink } from "react-router-dom";

import { Link } from "@mui/material";
import Signupform from "@components/Form/Signupform";

function Signup() {
  return (
    <div className="w-full  flex  justify-center  p-8 ">
      <div className="w-full max-w-3xl  bg-light-blue rounded-xl text-white p-2 sm:p-20  ">
        <h1 className="text-center font-bold text-2xl sm:text-5xl  sm:mt-0 my-10">
          Signup
        </h1>
        <hr className="w-full   border-t-2 border-t-orange-200 my-16" />
        <Signupform />
        <div className="text-sm w-full text-center my-10">
          <span>Already have an account? </span>
          <Link to="/auth/signin" component={RouterNavLink}>
            <span className="text-ctc ">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
