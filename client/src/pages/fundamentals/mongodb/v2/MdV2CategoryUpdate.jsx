import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, InputRef, Label } from "../../../../components/Tags";
import { PiSpinner } from "react-icons/pi";
import { getCategories, setSort, updateCategory } from "../../../../app/features/mongodb/mdV2CategorySlice";

const MdV2CategoryUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const item = useSelector((state) => state.mdV2Category.data.find((s) => s._id.toString() === id));

  const { status } = useSelector((state) => state.mdV2Category);
  const [name, setName] = useState("");

  useEffect(() => {
    if (item) {
      setName(item?.name);
    }
  }, [item]);

  const { enqueueSnackbar } = useSnackbar();

  const nameRef = useRef();
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const data = { id, name };
      dispatch(updateCategory(data))
        .unwrap()
        .then((res) => {
          enqueueSnackbar(res.message, { variant: "success" });
          dispatch(getCategories());
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
        <Button type="submit" disabled={!name} className={"py-2"}>
          {status === "loading" ? <PiSpinner className="animate-spin inline text-xl" /> : "update"}
        </Button>
      </form>
    </div>
  );
};

export default MdV2CategoryUpdate;
