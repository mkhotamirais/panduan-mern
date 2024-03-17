import { createContext, useEffect, useReducer } from "react";
import { nnV1AuthReducer } from "./nnV1AuthReducer";

export const NnV1AuthContext = createContext();

const NnV1AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(nnV1AuthReducer, { user: null });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("nnV1User"));
    if (user) {
      dispatch({ type: "SIGNIN", payload: user });
    }
  }, []);
  return <NnV1AuthContext.Provider value={{ ...state, dispatch }}>{children}</NnV1AuthContext.Provider>;
};
NnV1AuthProvider.propTypes;

export default NnV1AuthProvider;
