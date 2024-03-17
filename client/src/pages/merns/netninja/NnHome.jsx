import { FaYoutube } from "react-icons/fa";
import { ExternalRefBtn } from "../../../components/Components";

const NnHome = () => {
  return (
    <div>
      <h2 className="text-gray-700 font-medium my-2">Referensi</h2>
      <ExternalRefBtn href="#" icon={<FaYoutube />} text="redux rtk" />{" "}
    </div>
  );
};

export default NnHome;
