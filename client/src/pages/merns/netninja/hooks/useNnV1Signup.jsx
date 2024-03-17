import { useState } from "react";
import { nn } from "../../../../../config/constants";
import useAuthContext from "./useNnV1AuthContext";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const useNnV1Signup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(`${nn}/v1/auth/signup`, {
      // method: "POST",
      // body: JSON.stringify(data),
      // headers: { "Content-Type": "application/json" },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      enqueueSnackbar(json?.message, { variant: "error" });
      setError(json?.message);
    } else {
      localStorage.setItem("nnV1User", JSON.stringify(json));
      dispatch({ type: "SIGNIN", payload: json });
      enqueueSnackbar(json?.message, { variant: "success" });
      navigate("/netninja/nn-v1-workout");
      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
};

export default useNnV1Signup;
