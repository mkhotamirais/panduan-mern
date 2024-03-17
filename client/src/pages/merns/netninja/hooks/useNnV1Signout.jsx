import { useNavigate } from "react-router-dom";
import useNnV1AuthContext from "./useNnV1AuthContext";
import useNnV1WorkoutContext from "./useNnV1WorkoutContext";

const useNnV1Signout = () => {
  const { dispatch } = useNnV1AuthContext();
  const { dispatch: dispatchWo } = useNnV1WorkoutContext();
  const navigate = useNavigate();

  const signout = () => {
    localStorage.removeItem("nnV1User");
    dispatch({ type: "SIGNOUT" });
    dispatchWo({ type: "SET_WORKOUTS", payload: null });
    navigate("/netninja/nn-v1-signin");
  };

  return { signout };
};

export default useNnV1Signout;
