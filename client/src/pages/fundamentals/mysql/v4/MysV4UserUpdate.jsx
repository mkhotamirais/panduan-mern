import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers, setSort, updateUser } from "../../../../app/features/mysql/mysV4UserSlice";
import { Button, Input, InputRef, Label, Select } from "../../../../components/Tags";
import { PiSpinner } from "react-icons/pi";

const MysV4UserUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const item = useSelector((state) => state.mysV4User.data.find((s) => s.id.toString() === id));

  const { status } = useSelector((state) => state.mysV4User);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    console.log(item);
  }, [item]);

  useEffect(() => {
    if (item) {
      setName(item?.name);
      setRole(item?.role);
      setEmail(item?.email);
    }
  }, [item]);

  const canSave = [name, role, email].every(Boolean);
  const { enqueueSnackbar } = useSnackbar();

  const nameRef = useRef();
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      const data = { uuid: item?.uuid, name, role, email };
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
        <Label id="email">email</Label>
        <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Label id="role">role</Label>
        <Select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </Select>
        <Button type="submit" disabled={!canSave} className={"py-2"}>
          {status === "loading" ? <PiSpinner className="animate-spin inline text-xl" /> : "update"}
        </Button>
      </form>
    </div>
  );
};

export default MysV4UserUpdate;
