import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProducts, postProduct } from "../../../../app/features/mysqlRelational/msrProductSlice";
import { Button, Input, InputRef, Label, Select } from "../../../../components/Tags";
import { PiSpinner } from "react-icons/pi";
import { getUsers } from "../../../../app/features/mysqlRelational/msrUserSlice";

const MsrProductPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.msrProduct);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [userId, setUserId] = useState("");

  const canSave = [name, price].every(Boolean);
  const { enqueueSnackbar } = useSnackbar();
  const { data: users } = useSelector((state) => state.msrUser);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const nameRef = useRef();
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      const data = { name, price, userId };
      dispatch(postProduct(data))
        .unwrap()
        .then((res) => {
          enqueueSnackbar(res.message, { variant: "success" });
          dispatch(getProducts());
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
        <Label id="price">price</Label>
        <Input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <Label id="userId">Author</Label>
        <Select value={userId} id="userId" onChange={(e) => setUserId(e.target.value)}>
          <option value="">select author</option>
          {users.map((user) => (
            <option key={user?.id} value={user?.id}>
              {user?.name}
            </option>
          ))}
        </Select>
        <Button type="submit" disabled={!canSave} className={"py-2"}>
          {status === "loading" ? <PiSpinner className="animate-spin inline text-xl" /> : "post"}
        </Button>
      </form>
    </div>
  );
};

export default MsrProductPost;
