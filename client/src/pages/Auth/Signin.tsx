import { Link } from "@mui/material";
import { NavLink as RouterNavLink } from "react-router-dom";
import LoginForm from "@components/Form/LoginForm";

function Signin() {
  return (
    <div className="w-full  flex  justify-center  p-8 ">
      <div className="w-full max-w-3xl  bg-light-blue rounded-xl text-white p-2 sm:p-20">
        <h1 className="text-center font-bold text-2xl sm:text-5xl  sm:mt-0 my-10">
          Sign in
        </h1>
        <hr className="w-full  border-t-2 border-t-orange-200 my-16" />

        <LoginForm />

        <hr className="w-full  border-t-2 border-t-orange-200 my-10" />
        <div className="text-sm w-full text-center my-10">
          <span>Don't have an account? </span>
          <Link
            to="/auth/signup"
            component={RouterNavLink}
            className="text-white  hover:text-ctc"
          >
            <span>Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
