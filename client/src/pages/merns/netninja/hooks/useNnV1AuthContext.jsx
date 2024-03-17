import { useContext } from "react";
import { NnV1AuthContext } from "../context/NnV1AuthProvider";

const useNnV1AuthContext = () => {
  const context = useContext(NnV1AuthContext);
  if (!context) throw Error("useAuthContext must be used inside an auth context provider");
  return context;
};

export default useNnV1AuthContext;
