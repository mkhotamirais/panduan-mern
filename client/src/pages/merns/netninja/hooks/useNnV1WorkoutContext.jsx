import { useContext } from "react";
import { NnV1WorkoutContext } from "../context/NnV1WorkoutProvider";

const useNnV1WorkoutContext = () => {
  const context = useContext(NnV1WorkoutContext);
  if (!context) throw Error("useWorkoutContext must be used inside an workout context provider");
  return context;
};

export default useNnV1WorkoutContext;
