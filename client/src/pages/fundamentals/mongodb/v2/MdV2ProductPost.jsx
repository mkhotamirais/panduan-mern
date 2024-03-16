import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProducts, postProduct } from "../../../../app/features/mongodb/mdV2ProductSlice";
import { Button, Input, InputRef, Label, Select, Textarea } from "../../../../components/Tags";
import { PiSpinner } from "react-icons/pi";
import { getCategories } from "../../../../app/features/mongodb/mdV2CategorySlice";

const MdV2ProductPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.mdV2Product);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const canSave = [name, price, description, categoryId].every(Boolean);
  const { enqueueSnackbar } = useSnackbar();

  const nameRef = useRef();
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const { data: categories } = useSelector((state) => state.mdV2Category);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      const data = { name, price, description, categoryId };
      console.log(data);
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
        <Label id="categoryId">category</Label>
        <Select id="categoryId" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">select category</option>
          {categories.map((cat) => (
            <option key={cat?._id} value={cat?._id}>
              {cat?.name}
            </option>
          ))}
        </Select>
        <Label id="description">description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Button type="submit" disabled={!canSave} className={"py-2"}>
          {status === "loading" ? <PiSpinner className="animate-spin inline text-xl" /> : "post"}
        </Button>
      </form>
    </div>
  );
};

export default MdV2ProductPost;
