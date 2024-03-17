import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers, setSort, updateUser } from "../../../../app/features/mysql/mysV2UserSlice";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { PiSpinner } from "react-icons/pi";

const MysV2UserUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const item = useSelector((state) => state.mysV2User.data.find((s) => s.id.toString() === id));

  const { status } = useSelector((state) => state.mysV2User);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (item) {
      setName(item?.name);
      setAge(item?.age);
    }
  }, [item]);

  const canSave = [name, age].every(Boolean);
  const { enqueueSnackbar } = useSnackbar();

  const nameRef = useRef();
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      const data = { id, name, age };
      dispatch(updateUser(data))
        .unwrap()
        .then((res) => {
          enqueueSnackbar(res.message, { variant: "success" });
          dispatch(getUsers());
          dispatch(setSort("updatedAt"));
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
      <form onSubmit={handleSubmit}>
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

export default MysV2UserUpdate;
