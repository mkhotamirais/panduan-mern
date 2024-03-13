import { GithubLia, LinkedInLia } from "./SocialIcons";

const socialsList = [
  { title: "github", icon: <GithubLia />, href: "https://github.com/mkhotamirais" },
  { title: "linkedin", icon: <LinkedInLia />, href: "https://www.linkedin.com/in/mkhotami-tami/" },
];
const Socials = ({ className }) => {
  return (
    <div className={`${className} flex gap-2`}>
      {socialsList.map((sl, i) => (
        <a
          key={i}
          href={sl.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 hover:scale-110 transition-all duration-200"
        >
          {sl.icon}
        </a>
      ))}
    </div>
  );
};
Socials.propTypes;

export default Socials;
