import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { store } from "../../../app/store";
import { dgV2UsersApiSlice } from "../../../app/api/dgApiEndpoint/dgV2UsersApiSlice";
import { dgV2NotesApiSlice } from "../../../app/api/dgApiEndpoint/dgV2NotesApiSlice";
import { dgV2EmployeesApiSlice } from "../../../app/api/dgApiEndpoint/dgV2EmployeesApiSlice";

const Prefecth = () => {
  useEffect(() => {
    // // store.dispatch(dgV2UsersApiSlice.endpoints.getUsers.initiate());
    // // store.dispatch(dgV2NotesApiSlice.endpoints.getNotes.initiate());
    // // store.dispatch(dgV2EmployeesApiSlice.endpoints.getEmployees.initiate());
    // const users = store.dispatch(dgV2UsersApiSlice.endpoints.getUsers.initiate());
    // const notes = store.dispatch(dgV2NotesApiSlice.endpoints.getNotes.initiate());
    // const employee = store.dispatch(dgV2EmployeesApiSlice.endpoints.getEmployees.initiate());
    // return () => {
    //   users.unsubscribe();
    //   notes.unsubscribe();
    //   employee.unsubscribe();
    // };
  }, []);
  return <Outlet />;
};

export default Prefecth;
