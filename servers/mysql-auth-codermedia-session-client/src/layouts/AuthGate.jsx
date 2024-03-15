import { FaRightToBracket } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "../pages/auth/Logout";

const AuthGate = () => {
  const { user } = useSelector((state) => state.auth);
  let content;
  if (!user) {
    content = (
      <Link to="/login">
        <FaRightToBracket />
      </Link>
    );
  } else {
    content = <Logout />;
  }
  return content;
};

export default AuthGate;
