import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import EdwAddressModalDelete from "./EdwAddressModalDelete";

const EdwAddressList = ({ address }) => {
  const { name, kelurahan: kel, kecamatan: kec, kabupaten: kab, provinsi: prov, detail } = address;
  const [openModalDelete, setOpenModalDelete] = useState(null);

  return (
    <div className="text-gray-700 border rounded p-2 relative">
      <div className="text-gray-500 text-sm">{address?._id}</div>
      <div>name: {name}</div>
      <div className="capitalize">
        Kel. {kel} Kec. {kec} Kab. {kab} Prov. {prov}
      </div>
      <div>detail: {detail}</div>
      <div className="flex absolute top-2 right-2 gap-3">
        <Link to={`update/${address._id}`}>
          <FaEdit className="text-green-500" />
        </Link>
        <button onClick={() => setOpenModalDelete(address?._id)}>
          <FaTrashAlt className="text-red-500" />
        </button>
        {openModalDelete === address?._id && (
          <EdwAddressModalDelete item={address} onClose={() => setOpenModalDelete(null)} />
        )}
      </div>
    </div>
  );
};
EdwAddressList.propTypes;

export default EdwAddressList;
