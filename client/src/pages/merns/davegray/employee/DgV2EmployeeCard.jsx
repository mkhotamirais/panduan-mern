import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import DgV2EmployeeModalDelete from "./DgV2EmployeeModalDelete";
import DgV2EmployeeModalView from "./DgV2EmployeeModalView";
import { useSelector } from "react-redux";
import { selectEmployeeById } from "../../../../app/api/dgApiEndpoint/dgV2EmployeesApiSlice";

const DgV2EmployeeCard = ({ id }) => {
  const item = useSelector((state) => selectEmployeeById(state, id));
  const [showModalDelete, setShowModalDelete] = useState(null);
  const [showModalView, setShowModalView] = useState(null);

  const onClose = () => {
    if (showModalDelete) setShowModalDelete(null);
    if (showModalView) setShowModalView(null);
  };

  return (
    <div className="border rounded p-2 text-gray-700 flex flex-col gap-2">
      <div className="text-sm text-gray-500">ID:{item?._id}</div>
      <div>{item?.name}</div>
      <div>{item?.age}</div>
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
      {showModalDelete === item?._id && <DgV2EmployeeModalDelete onClose={onClose} item={item} />}
      {showModalView === item?._id && <DgV2EmployeeModalView onClose={onClose} item={item} />}
    </div>
  );
};
DgV2EmployeeCard.propTypes;

export default DgV2EmployeeCard;
