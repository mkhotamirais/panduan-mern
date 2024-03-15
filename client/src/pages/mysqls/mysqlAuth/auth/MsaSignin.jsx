import { useEffect, useRef, useState } from "react";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../../../../app/features/mysqlAuth/msaAuthSlice";
import { useSnackbar } from "notistack";

const MsaSignin = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const canSave = [email, password].every(Boolean);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      const data = { email, password };
      dispatch(signin(data))
        .unwrap()
        .then((res) => {
          enqueueSnackbar(res.message, { variant: "success" });
        })
        .catch((err) => {
          enqueueSnackbar(err, { variant: "error" });
        });
    }
  };
  return (
    <section className="rounded flex itemc justify-center">
      <div className="w-full mx-3 md:w-2/3 xl:w-1/2 border rounded p-4">
        <form onSubmit={handleSubmit}>
          <Label id="email">email</Label>
          <InputRef ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} />
          <Label id="password">password</Label>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" disabled={!canSave}>
            signin
          </Button>
        </form>
        <p>
          Do not have an account ?{" "}
          <Link to="../signup" className="text-blue-500">
            Signup
          </Link>
        </p>
      </div>
    </section>
  );
};

export default MsaSignin;
