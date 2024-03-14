import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers, postUser } from "../../../../app/features/mysqlFiles/msfUserSlice";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { PiSpinner } from "react-icons/pi";
import { FaTrash } from "react-icons/fa";

const MsfUserPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.msfUser);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const nameRef = useRef(null);
  const canSave = [name, image].every(Boolean);
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const onRemovePreview = () => {
    setImage("");
    setPreview("");
  };

  const handleChangeUser = (e) => {
    const files = e.target.files[0];
    setImage(files);
    setPreview(URL.createObjectURL(files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      dispatch(postUser(formData)).then((res) => {
        if (!res.error) {
          setName("");
          setImage("");
          navigate(-1);
          dispatch(getUsers());
        }
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Label id="name">name</Label>
        <InputRef ref={nameRef} id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <Label id="image">Image</Label>
        <Input type="file" onChange={handleChangeUser} />
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

export default MsfUserPost;
