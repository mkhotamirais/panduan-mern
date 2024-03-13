import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { selectProductById, updateProductThunk } from "../../../../app/features/reduxThunk/reduxThunkSlice";
import { PiSpinner } from "react-icons/pi";
import { useSnackbar } from "notistack";

const ReduxThunkUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.reduxThunk);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const product = useSelector((state) => selectProductById(state, id));
  useEffect(() => {
    if (product) {
      setName(product?.name);
      setPrice(product?.price);
      setDescription(product?.description);
    }
  }, [product]);

  const canSave = [name, price, description].every(Boolean);
  const { enqueueSnackbar } = useSnackbar();

  const nameRef = useRef();
  useEffect(() => {
    nameRef.current.focus();
  }, []);
  const handleUpdate = (e) => {
    e.preventDefault();
    if (canSave) {
      const data = { id, name, price, description };
      data.updatedAt = new Date().toISOString();
      dispatch(updateProductThunk(data))
        .unwrap()
        .then((res) => {
          enqueueSnackbar(res.message, { variant: "success" });
          navigate(-1);
        })
        .catch((err) => {
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
        <Label id="description">description</Label>
        <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Button type="submit" disabled={!canSave} className={"py-2"}>
          {status === "loading" ? <PiSpinner className="animate-spin inline text-xl" /> : "update"}
        </Button>
      </form>
    </div>
  );
};

export default ReduxThunkUpdate;
