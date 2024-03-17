import { useEffect } from "react";
import NnWorkoutCard from "./NnWorkoutCard";
import { GridCard, PostBtn } from "../../../../components/Components";
import useWorkoutContext from "../hooks/useNnV1WorkoutContext";
import { nn } from "../../../../../config/constants";
import useNnV1AuthContext from "../hooks/useNnV1AuthContext";

const NnWorkout = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useNnV1AuthContext();

  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch(`${nn}/v1/workouts`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json?.data });
      }
    };
    if (user) {
      fetchWorkout();
    }
  }, [dispatch, user]);

  let content;
  if (workouts?.length > 0) {
    const renderedWorkouts = workouts && workouts.map((wo) => <NnWorkoutCard key={wo?._id} wo={wo} />);
    content = <GridCard>{renderedWorkouts}</GridCard>;
  } else if (workouts?.length === 0) content = <div className="flex justify-center mt-5 italic">no content</div>;
  return (
    <div>
      <div className="flex justify-between items-center">
        <PostBtn />
      </div>
      {content}
    </div>
  );
};

export default NnWorkout;
