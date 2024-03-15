import { Link } from "react-router-dom";
import { H1 } from "./Tags";
import { FaHome } from "react-icons/fa";

const AuthWrapper = ({ title, children }) => {
  return (
    <main className="bg-slate-100 min-h-screen flex items-center justify-center px-3">
      <section className="bg-white p-3 rounded-lg w-full md:w-1/2 lg:w-1/3">
        <H1>{title}</H1>
        {children}
        {title === "login" ? (
          <div className="my-3 text-center">
            Do not have an account?{" "}
            <Link to="/register" className="font-medium text-blue-500 hover:underline">
              Register
            </Link>
            <br />
            <Link to="/" className="font-medium text-blue-500 hover:underline inline-flex gap-1 items-center">
              <FaHome className="inline-block" />
              Homepage
            </Link>
          </div>
        ) : (
          <div className="my-3 text-center">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};
AuthWrapper.propTypes;

export default AuthWrapper;
