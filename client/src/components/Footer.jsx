import Socials from "../../../../panduan-public-apis/src/components/Socials";
import Logo from "./Logo";

const Footer = () => {
  const MernProjectsList = [
    { title: "mern1", href: "#" },
    { title: "mern2", href: "#" },
    { title: "mern3", href: "#" },
  ];

  const FirebaseProjectsList = [
    { title: "fb1", href: "#" },
    { title: "fb2", href: "#" },
    { title: "fb3", href: "#" },
  ];

  const BasicProjectsList = [
    { title: "basic1", href: "#" },
    { title: "basic2", href: "#" },
    { title: "basic3", href: "#" },
  ];

  const HostingProjectsList = [
    { title: "hadinalmusri", href: "https://hadinalmusri.com/" },
    { title: "hadinalmusri2", href: "https://hadinalmusri.com/" },
  ];

  return (
    <footer className="mt-5 border-t bg-gradient-to-t from-blue-100 to-white">
      <div className="pt-5">
        <div className="px-3 py-5 lg:px-16 gap-8 md:gap-16 lg:gap-36 xl:gap-60 flex flex-col items-start md:flex-row justify-between">
          <Logo />
          <div className="w-full flex flex-col sm:flex-row gap-5 justify-between mb-5">
            <FooterLinkList title="MERN Projects" data={MernProjectsList} />
            <FooterLinkList title="Firebase Projects" data={FirebaseProjectsList} />
            <FooterLinkList title="Basic Projects" data={BasicProjectsList} />
            <FooterLinkList title="Hosting Projects" data={HostingProjectsList} />
          </div>
        </div>
        <div className="text-sm px-3 lg:px-16 py-3 text-gray-600 flex flex-col gap-2 sm:flex-row justify-between items-center">
          <div className="order-2 sm:order-1">
            Copyright <sup>&copy;</sup> {new Date().getFullYear()}{" "}
            <a href="https://github.com/mkhotamirais" className="text-blue-600 hover:underline">
              mkhotami
            </a>
          </div>
          <Socials className={"order-1 sm:order-2"} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const FooterLinkList = ({ data, title }) => {
  return (
    <div className="text-gray-500">
      <h4 className="mb-4 font-medium">{title}</h4>
      <div className="flex flex-col gap-2 items-start text-gray-500">
        {data.map((item, i) => (
          <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
};
FooterLinkList.propTypes;
