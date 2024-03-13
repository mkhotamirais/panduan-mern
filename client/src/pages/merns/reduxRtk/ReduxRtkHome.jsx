import { FaGlobe } from "react-icons/fa";
import { ExternalRefBtn } from "../../../components/Components";

const ReduxRtkHome = () => {
  return (
    <div>
      <h2 className="text-gray-700 font-medium my-2">Referensi</h2>
      <ExternalRefBtn
        href="https://redux.js.org/tutorials/essentials/part-5-async-logic"
        icon={<FaGlobe />}
        text="redux rtk"
      />{" "}
    </div>
  );
};

export default ReduxRtkHome;
