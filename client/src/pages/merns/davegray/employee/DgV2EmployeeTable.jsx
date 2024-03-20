import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import { useSelector } from "react-redux";
import { selectEmployeeById } from "../../../../app/api/dgApiEndpoint/dgV2EmployeesApiSlice";
import DgV2EmployeeModalDelete from "./DgV2EmployeeModalDelete";
import DgV2EmployeeModalView from "./DgV2EmployeeModalView";

const DgV2EmployeeTable = ({ id, i }) => {
  const item = useSelector((state) => selectEmployeeById(state, id));
  const [showModalDelete, setShowModalDelete] = useState(null);
  const [showModalView, setShowModalView] = useState(null);

  const onClose = () => {
    if (showModalDelete) setShowModalDelete(null);
    if (showModalView) setShowModalView(null);
  };

  return (
    <tr>
      <td>{i + 1}</td>
      <td>{item?.name}</td>
      <td className="hidden sm:table-cell">{item?.age}</td>
      <td className="hidden lg:table-cell">
        <TimeAgo time={item?.createdAt} />
      </td>
      <td className="hidden xl:table-cell">
        <TimeAgo time={item?.updatedAt} />
      </td>
      <td>
        <Actions
          modalView={() => setShowModalView(item?._id)}
          modalDelete={() => setShowModalDelete(item?._id)}
          id={item?._id}
          className={"border-none"}
        />
        {showModalDelete === item?._id && <DgV2EmployeeModalDelete onClose={onClose} item={item} />}
        {showModalView === item?._id && <DgV2EmployeeModalView onClose={onClose} item={item} />}
      </td>
    </tr>
  );
};
DgV2EmployeeTable.propTypes;

export default DgV2EmployeeTable;
