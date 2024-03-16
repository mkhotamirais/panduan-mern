import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProducts, postProduct } from "../../../../app/features/mongodb/mdV3ProductSlice";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { FaTrash } from "react-icons/fa";
import { PiSpinner } from "react-icons/pi";
import { useSnackbar } from "notistack";

const MdV3ProductPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.mdV3Product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const nameRef = useRef(null);
  const canSave = [name, price].every(Boolean);
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const onRemovePreview = () => {
    setImage("");
    setPreview("");
  };

  const handleChangeProduct = (e) => {
    const files = e.target.files[0];
    setImage(files);
    setPreview(URL.createObjectURL(files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("image", image);
      dispatch(postProduct(formData))
        .unwrap()
        .then((res) => {
          setName("");
          setImage("");
          dispatch(getProducts());
          enqueueSnackbar(res?.message, { variant: "success" });
          navigate(-1);
        })
        .catch((err) => {
          console.log(err);
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
        <InputRef type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <Label id="image">Image</Label>
        <Input type="file" onChange={handleChangeProduct} />
        {preview ? (
          <div className="relative w-48 h-48 my-2 border p-1 rounded overflow-hidden group">
            <button
              onClick={onRemovePreview}
              className="hidden group-hover:flex items-center justify-center bg-[rgba(0,0,0,.5)] p-3 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <FaTrash className="text-red-500 inline-block" />
            </button>
            <img src={preview} width={200} alt="image preview" className="object-contain object-center w-full h-full" />
          </div>
        ) : null}{" "}
        <Button type="submit" disabled={!canSave} className={"py-2"}>
          {status === "loading" ? <PiSpinner className="animate-spin inline text-xl" /> : "post"}
        </Button>
      </form>
    </div>
  );
};

export default MdV3ProductPost;
