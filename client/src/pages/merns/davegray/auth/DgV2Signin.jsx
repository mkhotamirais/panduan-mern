import { Link, useNavigate } from "react-router-dom";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { useEffect, useRef, useState } from "react";
import { useSigninMutation } from "../../../../app/api/dgApiEndpoint/dgV2AuthApiSlice";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../../app/features/davegray/dgV2AuthSlice";

const DgV2Signin = () => {
  const usernameRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [signin, { isLoading }] = useSigninMutation();
  const canSave = [username, password].every(Boolean);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      const data = { username, password };
      signin(data)
        .unwrap()
        .then((res) => {
          enqueueSnackbar(res?.message, { variant: "success" });
          dispatch(setCredentials());
          navigate("/davegray/dg-v2-note");
        })
        .catch((err) => {
          enqueueSnackbar(err?.data, { variant: "error" });
        });
    }
  };
  return (
    <section className="rounded flex itemc justify-center">
      <div className="w-full mx-3 md:w-2/3 xl:w-1/2 border rounded p-4">
        <form onSubmit={handleSubmit}>
          <Label id="username">username</Label>
          <InputRef
            ref={usernameRef}
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Label id="password">password</Label>
          <Input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" disabled={!canSave}>
            {isLoading ? "loading" : "signin"}
          </Button>
        </form>
        <p>
          Do not have an account ?{" "}
          <Link to="../dg-v2-signup" className="text-blue-500">
            Signup
          </Link>
        </p>
      </div>
    </section>
  );
};

export default DgV2Signin;
