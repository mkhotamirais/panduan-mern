import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from "react-icons/si";

const Logo = ({ className }) => {
  return (
    <div className={`${className}`}>
      <a href="/" className="flex flex-col items-center relative">
        <div className="flex gap-[0.1rem]">
          <SiMongodb className="text-green-600" />
          <SiExpress />
          <SiReact className="text-blue-600" />
          <SiNodedotjs className="text-green-800" />
        </div>
        <div className="font-medium text-gray-500">MERN</div>
        <div className="absolute top-1/2 -translate-y-1/2 text-4xl text-[rgba(34,139,34,.2)]">
          <SiNodedotjs />
        </div>
      </a>
    </div>
  );
};
Logo.propTypes;

export default Logo;
