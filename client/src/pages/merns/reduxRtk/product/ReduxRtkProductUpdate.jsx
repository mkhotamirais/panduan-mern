import { PiSpinner } from "react-icons/pi";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSnackbar } from "notistack";
import { selectProductById, useUpdateProductMutation } from "../../../../app/features/reduxRtk/productApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../../../app/features/reduxRtk/productRtkSlice";

const ReduxRtkProductUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

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

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      const data = { id, name, price, description };
      data.updatedAt = new Date().toISOString();
      updateProduct(data)
        .unwrap()
        .then(() => {
          enqueueSnackbar(`update ${name} berhasil`, { variant: "success" });
          dispatch(setSort("updatedAt"));
          navigate(-1);
        })
        .catch((err) => {
          console.log("err", err);
          enqueueSnackbar(`update ${name} gagal`, { variant: "error" });
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
        <Label id="description">description</Label>
        <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Button type="submit" disabled={!canSave} className={"py-2"}>
          {isLoading ? <PiSpinner className="animate-spin inline text-xl" /> : "update"}
        </Button>
      </form>
    </div>
  );
};

export default ReduxRtkProductUpdate;
