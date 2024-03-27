import { useSelector } from "react-redux";

const EdwAccount = () => {
  const { cred: user } = useSelector((state) => state.edwAuth);

  let content;
  if (user) {
    content = (
      <div className="border rounded p-2 text-gray-700">
        <div className="text-sm text-gray-500">ID: {user?.user?._id}</div>
        <div>Fullname: {user?.user?.fullName}</div>
        <div>Email: {user?.user?.email}</div>
        <div>Role: {user?.user?.role}</div>
        <div>Created at: {user?.user?.createdAt}</div>
      </div>
    );
  }
  return content;
};

export default EdwAccount;
