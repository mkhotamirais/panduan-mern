import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, InputRef, Label, Select, Textarea } from "../../../../components/Tags";
import { PiSpinner } from "react-icons/pi";
import { getProducts, updateProduct } from "../../../../app/features/eduwork/edwProductSlice";
import { FaTrash } from "react-icons/fa";

const EdwProductUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const item = useSelector((state) => state.mdV2Product.data.find((s) => s._id.toString() === id));

  const { status } = useSelector((state) => state.edwProduct);
  const { data: categories } = useSelector((state) => state.edwCategory);
  const { data: tags } = useSelector((state) => state.edwTag);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState([]);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (item) {
      setName(item?.name);
      setPrice(item?.price);
      setCategory(item?.category?.name);
      setDescription(item?.description);
      setTag(item?.tags.map((t) => t.name));
      setImage(item?.imageName);
      setPreview(item?.imageUrl);
    }
  }, [item]);

  useEffect(() => {
    console.log(tag);
  }, [tag]);

  // useEffect(() => {
  //   // console.log(item.tags.map((t) => t.name));
  //   tags.map((t) => {
  //     console.log(item.tags.map((tg) => tg.name).includes(t.name));
  //   });
  // }, [tags]);

  const canSave = [name, price, description, category].every(Boolean) && tag?.length > 0;
  const { enqueueSnackbar } = useSnackbar();

  const nameRef = useRef();
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const renderedCategory =
    categories &&
    categories.map((cat) => (
      <option key={cat?._id} value={cat?.name}>
        {cat?.name}
      </option>
    ));

  const renderedTag =
    tags &&
    tags.map((t) => {
      // console.log(item?.tags.map((t) => t.name).includes(t.name));
      return (
        <div key={t?._id} className="mr-3">
          <input
            type="checkbox"
            id={t?.name}
            defaultChecked={item.tags.map((tg) => tg.name).includes(t.name)}
            name="tag"
            key={t?._id}
            value={t?.name}
            onChange={(e) => {
              if (e.target.checked) {
                setTag((prev) => [...prev, e.target.value]);
              } else setTag((prev) => prev.filter((p) => p !== e.target.value));
            }}
            className="mr-1"
          />
          <label htmlFor={t?.name}>{t?.name}</label>
        </div>
      );
    });

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
      formData.append("id", id);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      tag.map((t) => {
        formData.append("tags[]", t);
      });
      formData.append("image", image);
      console.log(tag);
      console.log(formData.get("id"));
      console.log(formData.get("name"));
      console.log(formData.get("price"));
      console.log(formData.get("description"));
      console.log(formData.get("category"));
      console.log(formData.get("tags"));
      console.log(formData.get("image"));
      // const data = { name, price, description, category, tags: tag };
      // console.log(formData.get("tags"));
      dispatch(updateProduct(formData))
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
        <InputRef ref={nameRef} id="name" value={name} placeholder="name" onChange={(e) => setName(e.target.value)} />
        <Label id="price">price</Label>
        <Input type="number" id="price" value={price} placeholder="price" onChange={(e) => setPrice(e.target.value)} />
        <Label id="description">description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Label id="category">category</Label>
        <Select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">select category</option>
          {renderedCategory}
        </Select>
        <Label>Tags</Label>
        <div className="mb-2">{renderedTag}</div>
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
        ) : null}
        <Button type="submit" disabled={!canSave} className={"py-2"}>
          {status === "loading" ? <PiSpinner className="animate-spin inline text-xl" /> : "update"}
        </Button>
      </form>
    </div>
  );
};

export default EdwProductUpdate;
