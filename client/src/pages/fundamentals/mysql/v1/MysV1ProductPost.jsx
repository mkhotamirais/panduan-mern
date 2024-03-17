import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProducts, postProduct } from "../../../../app/features/mysql/mysV1ProductSlice";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { PiSpinner } from "react-icons/pi";

const MysV1ProductPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.mysV1Product);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const canSave = [name, price].every(Boolean);
  const { enqueueSnackbar } = useSnackbar();

  const nameRef = useRef();
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      const data = { name, price };
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
        <Button type="submit" disabled={!canSave} className={"py-2"}>
          {status === "loading" ? <PiSpinner className="animate-spin inline text-xl" /> : "post"}
        </Button>
      </form>
    </div>
  );
};

export default MysV1ProductPost;
