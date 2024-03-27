import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { getUsers } from "../../../../app/features/eduwork/edwUserSlice";

const EdwUserPre = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return <Outlet />;
};

export default EdwUserPre;
