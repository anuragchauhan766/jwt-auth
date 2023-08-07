import { httpClient } from "@config/axiosConfig";
import { NavLink as RouterNavLink } from "react-router-dom";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "@mui/material";
function EmailVerfication() {
  const [searchParams] = useSearchParams();
  const [err, seterr] = useState("");
  const [isverified, setIsverified] = useState(false);
  const handleVerfication = async () => {
    const url = `auth/verifyemail?t=${searchParams.get("t")}`;
    try {
      const { status } = await httpClient.get(url);
      if (status === 200) setIsverified(true);
    } catch (error) {
      seterr(
        "Invalid Token! Please request a Email verification again by Login"
      );
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center space-y-20 sm:space-y-52 ">
      <div className="w-3/4 sm:w-1/2 p-5 bg-light-blue rounded-lg shadow-xl text-white">
        {isverified ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-2xl font-bold ">Email verified Successfully.</p>
            <p className="text-center">
              Please{" "}
              <Link
                component={RouterNavLink}
                to="/auth/signin"
                className="text-white hover:text-lg"
              >
                Login Now.
              </Link>
            </p>
          </div>
        ) : err ? (
          <div className="flex items-center justify-center">
            <p className="text-red-400 text-2xl font-bold text-center">{err}</p>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center space-y-5">
            <h1 className="text-2xl sm:text-5xl font-bold ">
              Email Verification
            </h1>
            <p className="text-sm text-center sm:text-lg font-light">
              Click on the Link below to Verify Your email.
            </p>
            <button
              type="button"
              onClick={handleVerfication}
              className="border-none  rounded-lg bg-ctc p-3 text-lg font-bold sm:w-1/2 hover:scale-110 cursor-pointer"
            >
              Verify Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailVerfication;
