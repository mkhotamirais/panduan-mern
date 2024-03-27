import { Link, useNavigate } from "react-router-dom";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { useEffect, useRef, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { signup } from "../../../../app/features/eduwork/edwAuthSlice";

const EdwSignup = () => {
  const emailRef = useRef();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const canSave = [email, password].every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confPassword) {
      enqueueSnackbar("konfirmasi password salah", { variant: "error" });
    } else {
      if (canSave) {
        const data = { email, fullName: username, password };
        dispatch(signup(data))
          .unwrap()
          .then((res) => {
            navigate("/eduwork/edw-signin");
            enqueueSnackbar(res?.message, { variant: "success" });
          })
          .catch((err) => {
            console.log(err);
            enqueueSnackbar(err?.message, { variant: "error" });
          });
      }
    }
  };
  return (
    <section className="rounded flex itemc justify-center">
      <div className="w-full mx-3 md:w-2/3 xl:w-1/2 border rounded p-4">
        <form onSubmit={handleSubmit}>
          <Label id="email">email</Label>
          <InputRef ref={emailRef} placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Label id="username">username</Label>
          <Input id="username" value={username} placeholder="username" onChange={(e) => setUsername(e.target.value)} />
          <Label id="password">password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Label id="password">confirm password</Label>
          <Input
            id="password"
            type="password"
            value={confPassword}
            placeholder="********"
            onChange={(e) => setConfPassword(e.target.value)}
          />
          <Button type="submit">signup</Button>
        </form>
        <p>
          Do not have an account ?{" "}
          <Link to="../nn-v1-signin" className="text-blue-500">
            Signin
          </Link>
        </p>
      </div>
    </section>
  );
};

export default EdwSignup;
