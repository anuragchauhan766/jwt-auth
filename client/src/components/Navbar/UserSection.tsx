import { useAuth } from "@context/AuthContext";
import { Link } from "@mui/material";
import { NavLink as RouterNavLink } from "react-router-dom";
function UserSection() {
  const { user, signout } = useAuth();
  const username = user?.email?.split("@")[0];

  if (user) {
    return (
      <>
        <li className="grow-0 basis-auto shrink-0">
          <span className="capitalize text-lg cursor-default">
            Hii, {user.name}
          </span>
        </li>
        <li className="grow-0 basis-auto shrink-0">
          <Link
            to={`/account/${username}`}
            className="text-white"
            component={RouterNavLink}
          >
            <span className="capitalize text-lg drop-shadow-[0_0_5px_rgba(255,255,255,0.25)] hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
              Account
            </span>
          </Link>
        </li>
        <li className="grow-0 basis-auto shrink-0">
          <button
            className="border-none text-white bg-transparent cursor-pointer"
            onClick={async () => {
              await signout();
            }}
          >
            <span className="font-bold drop-shadow-[0_0_5px_rgba(255,255,255,0.25)] hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] text-lg">
              signout
            </span>
          </button>
        </li>
      </>
    );
  } else {
    return (
      <>
        <li className="grow-0 basis-auto shrink-0">
          <Link
            to={`/account/${username}`}
            className="text-white"
            component={RouterNavLink}
          >
            <span className="capitalize text-lg drop-shadow-[0_0_5px_rgba(255,255,255,0.25)] hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
              Account
            </span>
          </Link>
        </li>
        <li className="grow-0 basis-auto shrink-0">
          <Link
            to="/auth/signin"
            className="text-white"
            component={RouterNavLink}
          >
            <span className="text-lg drop-shadow-[0_0_5px_rgba(255,255,255,0.25)] hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] ">
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
            <span className="text-lg shadow-lg drop-shadow-[0_0_5px_rgba(255,255,255,0.25)] hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
              Signup
            </span>
          </Link>
        </li>
      </>
    );
  }
}

export default UserSection;
