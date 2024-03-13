import { PiSpinner } from "react-icons/pi";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSnackbar } from "notistack";
import { usePostProductMutation } from "../../../../app/features/reduxRtk/productApiSlice";
import { v4 as uuidv4 } from "uuid";

const ReduxRtkProductPost = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const canSave = [name, price, description].every(Boolean);
  const { enqueueSnackbar } = useSnackbar();

  const nameRef = useRef();
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const [postProduct, { isLoading }] = usePostProductMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      const data = { id: uuidv4(), name, price, description };
      data.createdAt = new Date().toISOString();
      data.updatedAt = new Date().toISOString();
      postProduct(data)
        .unwrap()
        .then(() => {
          enqueueSnackbar(`post ${name} berhasil`, { variant: "success" });
          navigate(-1);
        })
        .catch((err) => {
          console.log("err", err);
          enqueueSnackbar(`post ${name} gagal`, { variant: "error" });
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
          {isLoading ? <PiSpinner className="animate-spin inline text-xl" /> : "post"}
        </Button>
      </form>
    </div>
  );
};

export default ReduxRtkProductPost;
