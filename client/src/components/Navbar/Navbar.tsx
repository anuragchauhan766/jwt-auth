import { Link } from "@mui/material";
import { NavLink as RouterNavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-center w-full h-[72px]">
      <ul className="flex items-center justify-around w-full h-full cursor-pointer list-none justify-items-start max-w-[1600px]  ms-auto me-auto px-6 text-white font-bold text-3xl space-x-10">
        <li className="grow basis-auto shrink-0 pe-2 sm:pe-5">
          <Link to="/" className="text-white" component={RouterNavLink}>
            <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Auth
            </span>
          </Link>
        </li>
        <li className="grow-0 basis-auto shrink-0">
          <Link
            to="/auth/signin"
            className="text-white"
            component={RouterNavLink}
          >
            <span className="drop-shadow-[0_0_5px_rgba(255,255,255,0.25)] hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] ">
              Signin
            </span>
          </Link>
        </li>
        <li className="grow-0 basis-auto shrink-0">
          <Link
            to="/auth/signup"
            className="text-white"
            component={RouterNavLink}
          >
            <span className="shadow-lg drop-shadow-[0_0_5px_rgba(255,255,255,0.25)] hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
              Signup
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
