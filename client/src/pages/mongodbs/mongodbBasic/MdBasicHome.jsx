import { FaYoutube } from "react-icons/fa";
import { ExternalRefBtn } from "../../../components/Components";

const MdBasicHome = () => {
  return (
    <div>
      <h2 className="text-gray-700 font-medium my-2">Referensi</h2>
      <ExternalRefBtn href="https://www.youtube.com/watch?v=Ll_71n60vAM" icon={<FaYoutube />} text="redux rtk" />{" "}
    </div>
  );
};

export default MdBasicHome;
