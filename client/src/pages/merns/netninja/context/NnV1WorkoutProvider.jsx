import { createContext, useReducer } from "react";
import { nnV1WorkoutReducer } from "./nnV1WorkoutReducer";

export const NnV1WorkoutContext = createContext();

const NnV1WorkoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(nnV1WorkoutReducer, {
    workouts: null,
  });
  return <NnV1WorkoutContext.Provider value={{ ...state, dispatch }}>{children}</NnV1WorkoutContext.Provider>;
};
NnV1WorkoutProvider.propTypes;

export default NnV1WorkoutProvider;
