import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { PiSpinner } from "react-icons/pi";
import { getProducts, updateProduct } from "../../../../app/features/mysqlBasic/mysqlBasicSlice";

const MsbProductUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { status } = useSelector((state) => state.mysqlBasic);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const item = useSelector((state) => state.mysqlBasic.data.find((s) => s.id.toString() === id));
  useEffect(() => {
    if (item) {
      setName(item.name);
      setPrice(item.price);
    }
  }, [item]);

  const canSave = [name, price].every(Boolean);
  const { enqueueSnackbar } = useSnackbar();

  const nameRef = useRef();
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (canSave) {
      const data = { id: uuidv4(), name, price };
      data.createdAt = new Date().toISOString();
      data.updatedAt = new Date().toISOString();
      dispatch(updateProduct(data))
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
      <form onSubmit={handleUpdate}>
        <Label id="name">name</Label>
        <InputRef ref={nameRef} id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <Label id="price">price</Label>
        <Input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <Button type="submit" disabled={!canSave} className={"py-2"}>
          {status === "loading" ? <PiSpinner className="animate-spin inline text-xl" /> : "update"}
        </Button>
      </form>
    </div>
  );
};

export default MsbProductUpdate;
