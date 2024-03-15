import { useDispatch, useSelector } from "react-redux";
import { refresh } from "../../../../app/features/mysqlAuth/msaAuthSlice";
import { useEffect } from "react";
import axios from "axios";

const useRefresh = () => {
  const { decoded, token } = useSelector((state) => state.msaAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (decoded.exp * 5000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5500/mysql-auth/auth/refresh");
        console.log(decoded.exp * 5000);
        console.log(currentDate.getTime());
        config.headers.Authorization = `Bearer ${response.data.data}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return { axiosJWT, token };
};

export default useRefresh;
