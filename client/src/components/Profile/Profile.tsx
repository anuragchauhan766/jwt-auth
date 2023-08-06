import { Link } from "@mui/material";
import { NavLink as RouterNavLink } from "react-router-dom";
function Profile() {
  return (
    <div className="text-black flex justify-center items-center w-full bg-blue-400 h-[calc(100vh-72px)]">
      profile
      <Link
        to="/user"
        component={RouterNavLink}
        className="text-white  hover:text-ctc"
      >
        <span>user data</span>
      </Link>
    </div>
  );
}

export default Profile;
