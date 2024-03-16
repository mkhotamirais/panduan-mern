import { forwardRef } from "react";
import { Link } from "react-router-dom";

export const H1 = ({ children, className }) => (
  <h1 className={`${className} capitalize font-semibold text-2xl leading-loose`}>{children}</h1>
);
H1.propTypes;

export const H2 = ({ children, className }) => (
  <h2 className={`${className} capitalize font-semibold text-xl my-2`}>{children}</h2>
);
H2.propTypes;

export const H3 = ({ children, className }) => <h3 className={`${className} capitalize font-medium`}>{children}</h3>;
H3.propTypes;

export const H4 = ({ children, className }) => (
  <h4 className={`${className} capitalize font-medium mt-2 mb-1`}>&#11166; {children}</h4>
);
H4.propTypes;

export const Pre = ({ children }) => <pre className={`overflow-x-scroll text-xs`}>{children}</pre>;
Pre.propTypes;

export const Par = ({ children = "Par", className }) => <p className={`${className} mb-1 indent-8`}>{children}</p>;
Par.propTypes;

export const Label = ({ children = "Label", id, className }) => (
  <label id={id} className={`${className} leading-relaxed font-medium capitalize text-gray-600`}>
    {children}
  </label>
);
Label.propTypes;

export const Input = ({ type = "text", id, value, onChange, placeholder, autoComplete = "off", className }) => (
  <input
    type={type}
    id={id}
    name={id}
    value={value}
    onChange={onChange}
    autoComplete={autoComplete}
    placeholder={placeholder}
    className={`${className} mb-2 border border-slate-300 focus:outline-blue-300 rounded p-2 w-full`}
  />
);
Input.propTypes;

export const InputRef = forwardRef(
  ({ type = "text", id, value, onChange, placeholder, autoComplete = "off", className }, ref) => (
    <input
      ref={ref}
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      placeholder={placeholder}
      className={`${className} mb-2 border border-slate-300 focus:outline-blue-300 rounded p-2 w-full`}
    />
  )
);
InputRef.propTypes;
InputRef.displayName;

export const Textarea = ({ className, id, value, onChange }) => (
  <textarea
    name={id}
    id={id}
    value={value}
    onChange={onChange}
    className={`${className} mb-2 border border-slate-300 focus:outline-blue-300 rounded p-2 w-full`}
  />
);
Textarea.propTypes;

export const Button = ({ children = "Button", type = "button", disabled, onClick, className }) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`${className} bg-blue-500 w-full sm:w-auto px-2 p-1 sm:px-4 sm:p-2 text-sm sm:text-base text-white rounded hover:opacity-80 disabled:opacity-80`}
  >
    {children}
  </button>
);
Button.propTypes;

export const BtnLink = ({ children = "BtnLink", to, onClick, className }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`${className} bg-blue-500 leading-none p-2 text-white rounded hover:opacity-50 disabled:opacity-50`}
  >
    {children}
  </Link>
);
BtnLink.propTypes;

export const Select = ({ children = "Select", className, id, value, onChange }) => (
  <select
    name={id}
    id={id}
    value={value}
    onChange={onChange}
    className={`${className} border border-slate-300 focus:outline-blue-300  rounded p-2 block mb-2 w-full`}
  >
    {children}
  </select>
);
Select.propTypes;
