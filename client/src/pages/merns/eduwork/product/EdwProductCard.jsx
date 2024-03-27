import { useEffect, useState } from "react";
import { Actions, Badge, TimeAgo } from "../../../../components/Components";
import EdwProductModalDelete from "./EdwProductModalDelete";
import EdwProductModalView from "./EdwProductModalView";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../../../app/features/eduwork/edwCartSlice";

const EdwProductCard = ({ item }) => {
  const [showModalDelete, setShowModalDelete] = useState(null);
  const [showModalView, setShowModalView] = useState(null);
  const { carts } = useSelector((state) => state.edwCart);
  const { cred: user } = useSelector((state) => state.edwAuth);
  const dispatch = useDispatch();

  const onClose = () => {
    if (showModalDelete) setShowModalDelete(null);
    if (showModalView) setShowModalView(null);
  };

  const handleCart = () => {
    const result = [...carts, item];
    dispatch(updateCart({ data: result, token: user?.signed }))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(carts);
  }, [carts]);

  return (
    <div className="border rounded p-2 text-gray-700 flex flex-col gap-2 relative">
      <button onClick={handleCart} className="absolute right-2 top-2">
        <FaCartPlus />
      </button>
      <div className="text-sm text-gray-500">ID:{item?._id}</div>
      <div className="bg-gray-100 p-2 rounded">
        <figure className="size-32 w-full">
          <img src={item?.imageUrl} alt="" className="w-full h-full object-contain object-center" />
        </figure>
      </div>
      <div>{item?.name}</div>
      <div>{item?.price}</div>
      <div>{item?.description}</div>
      <div className="capitalize">Category: {item?.category?.name}</div>
      <div>
        Tags:{" "}
        {item?.tags?.map((t) => (
          <Badge key={t?._id} item={t} />
        ))}
      </div>
      <div>
        <div className="flex flex-col text-sm">
          <TimeAgo time={item?.createdAt} />
          <TimeAgo time={item?.updatedAt} />
        </div>
      </div>
      <Actions
        modalView={() => setShowModalView(item?._id)}
        modalDelete={() => setShowModalDelete(item?._id)}
        id={item?._id}
      />
      {showModalDelete === item?._id && <EdwProductModalDelete onClose={onClose} item={item} />}
      {showModalView === item?._id && <EdwProductModalView onClose={onClose} item={item} />}
    </div>
  );
};
EdwProductCard.propTypes;

export default EdwProductCard;
