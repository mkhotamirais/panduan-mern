import { FaTrash } from "react-icons/fa";
import useWorkoutContext from "../hooks/useNnV1WorkoutContext";
import { formatDistanceToNow } from "date-fns";
import useNnV1AuthContext from "../hooks/useNnV1AuthContext";
import { nn } from "../../../../config/constants";

const NnWorkoutCard = ({ wo }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useNnV1AuthContext();

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(`${nn}/v1/workouts/${wo?._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json?.data });
    }
  };

  return (
    <div className="border rounded p-3 relative">
      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 flex items-center justify-center size-8 rounded-full bg-gray-200 text-red-500 hover:opacity-50"
      >
        <FaTrash />
      </button>
      <h3>{wo?.title}</h3>
      <p>load: {wo?.load}</p>
      <p>reps: {wo?.reps}</p>
      <div className="text-sm">
        <p>createdAt: {formatDistanceToNow(new Date(wo?.createdAt), { addSuffix: true })}</p>
        <p>updatedAt: {formatDistanceToNow(new Date(wo?.updatedAt), { addSuffix: true })}</p>
      </div>
    </div>
  );
};
NnWorkoutCard.propTypes;

export default NnWorkoutCard;
