import { Link, useNavigate } from "react-router-dom";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { signinn } from "../../../../app/features/eduwork/edwAuthSlice";
import { enqueueSnackbar } from "notistack";

const EdwSignin = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const canSave = [email, password].every(Boolean);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      const data = { email, password };
      dispatch(signinn(data))
        .unwrap()
        .then((res) => {
          enqueueSnackbar(`login ${res?.user?.email} success`, { variant: "success" });
          // window.location.href = "/eduwork/edw-product";
          navigate("/eduwork/edw-product");
        })
        .catch((err) => {
          console.log("err", err);
          enqueueSnackbar(err, { variant: "error" });
        });
    }
  };
  return (
    <section className="rounded flex itemc justify-center">
      <div className="w-full mx-3 md:w-2/3 xl:w-1/2 border rounded p-4">
        <form onSubmit={handleSubmit}>
          <Label id="email">email</Label>
          <InputRef type="email" ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} />
          <Label id="password">password</Label>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit">signin</Button>
        </form>
        <p>
          Do not have an account ?{" "}
          <Link to="../edw-signup" className="text-blue-500">
            Signup
          </Link>
        </p>
      </div>
    </section>
  );
};

export default EdwSignin;
