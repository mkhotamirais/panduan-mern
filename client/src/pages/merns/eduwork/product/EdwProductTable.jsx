import { useState } from "react";
import { Actions, Badge, TimeAgo } from "../../../../components/Components";
import EdwProductModalDelete from "./EdwProductModalDelete";
import EdwProductModalView from "./EdwProductModalView";
import { useSelector } from "react-redux";

const EdwProductTable = ({ item, i }) => {
  const [showModalDelete, setShowModalDelete] = useState(null);
  const [showModalView, setShowModalView] = useState(null);
  const { cred } = useSelector((state) => state.edwAuth);

  const onClose = () => {
    if (showModalDelete) setShowModalDelete(null);
    if (showModalView) setShowModalView(null);
  };

  return (
    <tr>
      <td>{i + 1}</td>
      <td className="flex justify-center flex-col items-center">
        <figure className="w-24 h-24">
          <img src={item?.imageUrl} alt="image" className="w-full h-full object-contain object-center" />
        </figure>
        <div className="block sm:hidden text-sm capitalize">{item?.name}</div>
      </td>
      <td className="hidden sm:table-cell">{item?.name}</td>
      <td className="hidden md:table-cell">Rp{item?.price?.toLocaleString("id-ID")}</td>
      <td className="hidden lg:table-cell max-w-24">
        {item?.tags?.map((t) => (
          <Badge key={t?._id} item={t} />
        ))}
      </td>
      <td className="hidden lg:table-cell">Rp{item?.description}</td>
      <td className="hidden xl:table-cell">
        <TimeAgo time={item?.createdAt} />
      </td>
      <td className="hidden xl:table-cell">
        <TimeAgo time={item?.updatedAt} />
      </td>
      {cred && (
        <td>
          <Actions
            modalView={() => setShowModalView(item?._id)}
            modalDelete={() => setShowModalDelete(item?._id)}
            id={item?._id}
            className={"border-none"}
          />
          {showModalDelete === item?._id && <EdwProductModalDelete onClose={onClose} item={item} />}
          {showModalView === item?._id && <EdwProductModalView onClose={onClose} item={item} />}
        </td>
      )}
    </tr>
  );
};
EdwProductTable.propTypes;

export default EdwProductTable;
