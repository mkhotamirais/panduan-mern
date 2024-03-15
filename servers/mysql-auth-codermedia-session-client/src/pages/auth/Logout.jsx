import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRightFromBracket } from "react-icons/fa6";
import { logout, reset } from "../../features/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <button onClick={onLogout}>
      <FaRightFromBracket />
    </button>
  );
};

export default Logout;
