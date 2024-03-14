import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers, setSort, updateUser } from "../../../../app/features/mysqlRelational/msrUserSlice";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { PiSpinner } from "react-icons/pi";

const MsrUserUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { status } = useSelector((state) => state.msrUser);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const user = useSelector((state) => state.msrUser.data.find((s) => s.id.toString() === id));
  useEffect(() => {
    if (user) {
      setName(user?.name);
      setAge(user?.age);
    }
  }, [user]);

  const canSave = [name, age].every(Boolean);
  const { enqueueSnackbar } = useSnackbar();

  const nameRef = useRef();
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (canSave) {
      const data = { id, name, age };
      dispatch(updateUser(data))
        .unwrap()
        .then((res) => {
          enqueueSnackbar(res.message, { variant: "success" });
          dispatch(getUsers());
          setSort("createdAt");
          navigate(-1);
        })
        .catch((err) => {
          console.log("err", err);
          enqueueSnackbar(err, { variant: "error" });
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <Label id="name">name</Label>
        <InputRef ref={nameRef} id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <Label id="age">age</Label>
        <Input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
        <Button type="submit" disabled={!canSave} className={"py-2"}>
          {status === "loading" ? <PiSpinner className="animate-spin inline text-xl" /> : "update"}
        </Button>
      </form>
    </div>
  );
};

export default MsrUserUpdate;
