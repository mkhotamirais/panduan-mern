import { useEffect, useRef, useState } from "react";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { nn } from "../../../../../config/constants";
import useNnV1WorkoutContext from "../hooks/useNnV1WorkoutContext";
import useNnV1AuthContext from "../hooks/useNnV1AuthContext";

const NnWorkoutPost = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const { dispatch } = useNnV1WorkoutContext();
  const { user } = useNnV1AuthContext();

  const titleRef = useRef(null);
  useEffect(() => {
    titleRef.current.focus();
  }, []);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      enqueueSnackbar("you must be logged in", { variant: "error" });
      return;
    }
    const data = { title, load, reps };
    const response = await fetch(`${nn}/v1/workouts`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${user?.token}` },
    });
    const json = await response.json();
    if (!response.ok) {
      setEmptyFields(json?.emptyFields);
      enqueueSnackbar(json?.message, { variant: "error" });
    } else {
      setEmptyFields([]);
      enqueueSnackbar(json?.message, { variant: "success" });
      dispatch({ type: "CREATE_WORKOUT", payload: json.data });
      navigate(-1);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Label id="title">title</Label>
        <InputRef
          ref={titleRef}
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={emptyFields?.includes("title") && "border-red-500"}
        />
        <Label id="load">load</Label>
        <Input
          type="number"
          id="load"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          className={emptyFields?.includes("load") && "border-red-500"}
        />
        <Label id="reps">reps</Label>
        <Input
          type="number"
          id="reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className={emptyFields?.includes("reps") && "border-red-500"}
        />
        <Button type="submit">Post</Button>
      </form>
    </div>
  );
};

export default NnWorkoutPost;
