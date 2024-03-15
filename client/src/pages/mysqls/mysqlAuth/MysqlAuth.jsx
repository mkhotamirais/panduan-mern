import { Outlet } from "react-router-dom";
import { Breadcrumb, Menus } from "../../../components/Components";
import { H1 } from "../../../components/Tags";

const menus = ["home", "product", "user", "signin"];

const MysqlAuth = () => {
  return (
    <section id="msa">
      <H1>mysql auth</H1>
      <Breadcrumb />
      <Menus menus={menus} />
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default MysqlAuth;

// *** jangan dihapus dari codermedia ***
// useEffect(() => {
//   refreshToken();
// }, []);

// const refreshToken = () => {
//   axios
//     .get(url)
//     .then((res) => {
//       setToken(res.data.accessToken);
//       const decoded = jwtDecode(res.data.accessToken);
//       setName(decoded.name);
//       setExpire(decoded.exp);
//     })
//     .catch((err) => {
//       if (err.response) {
//         navigate("/");
//       }
//     });
// };

// const axiosJWT = axios.create();
// axiosJWT.interceptors.request.use(
//   async (config) => {
//     const currentDate = new Date();
//     if (expire * 1000 < currentDate.getTime()) {
//       const response = await axios.get("http://localhost:3000/users/refresh");
//       config.headers.Authorization = `Bearer ${response.data.accessToken}`;
//       setToken(response.data.accessToken);
//       const decoded = jwtDecode(response.data.accessToken);
//       setName(decoded.name);
//       setExpire(decoded.exp);
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// const getUsers = () => {
//   axiosJWT.get(urlUsers, { headers: { Authorization: `Bearer ${token}` } }).then((res) => setUsers(res.data));
// };
