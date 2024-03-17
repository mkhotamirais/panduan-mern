import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts, setSort, updateProduct } from "../../../../app/features/mysql/mysV1ProductSlice";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { PiSpinner } from "react-icons/pi";

const MysV1ProductUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const item = useSelector((state) => state.mysV1Product.data.find((s) => s.id.toString() === id));

  const { status } = useSelector((state) => state.mysV1Product);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (item) {
      setName(item?.name);
      setPrice(item?.price);
    }
  }, [item]);

  const canSave = [name, price].every(Boolean);
  const { enqueueSnackbar } = useSnackbar();

  const nameRef = useRef();
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      const data = { id, name, price };
      dispatch(updateProduct(data))
        .unwrap()
        .then((res) => {
          enqueueSnackbar(res.message, { variant: "success" });
          dispatch(getProducts());
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
        <Label id="price">price</Label>
        <Input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <Button type="submit" disabled={!canSave} className={"py-2"}>
          {status === "loading" ? <PiSpinner className="animate-spin inline text-xl" /> : "update"}
        </Button>
      </form>
    </div>
  );
};

export default MysV1ProductUpdate;
