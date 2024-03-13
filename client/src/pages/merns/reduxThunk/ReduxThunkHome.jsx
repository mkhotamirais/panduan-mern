import { FaGlobe } from "react-icons/fa";
import { ExternalRefBtn } from "../../../components/Components";

const ReduxThunkHome = () => {
  return (
    <div>
      <h2 className="text-gray-700 font-medium my-2">Referensi</h2>
      <div>
        <ExternalRefBtn
          href="https://redux.js.org/tutorials/essentials/part-5-async-logic"
          icon={<FaGlobe />}
          text="redux async"
        />
      </div>
    </div>
  );
};

export default ReduxThunkHome;
