import { Button, Input, Label } from "../../../components/Tags";
import AuthWrapper from "../../../components/AuthWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../../../features/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && isSuccess) navigate("/");
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <AuthWrapper title="login">
      {isError && <p className="text-red-500">{message}</p>}
      <form onSubmit={Auth}>
        <div className="mb-3">
          <Label id="email">email</Label>
          <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <Label id="password">password</Label>
          <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" className={"py-3 w-full"}>
          {isLoading ? "loading..." : "Login"}
        </Button>
      </form>
    </AuthWrapper>
  );
};

export default Login;
