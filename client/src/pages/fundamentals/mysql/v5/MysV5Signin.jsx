import { Link, useNavigate } from "react-router-dom";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, signin } from "../../../../app/features/mysql/mysV5AuthSlice";
import { PiSpinner } from "react-icons/pi";
import { useSnackbar } from "notistack";

const MysV5Signin = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading } = useSelector((state) => state.mysV5Auth);
  const canSave = [email, password].every(Boolean);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      const data = { email, password };
      dispatch(signin(data))
        .unwrap()
        .then((res) => {
          console.log(res);
          dispatch(reset());
          navigate("/mysql/mys-v5-product");
          enqueueSnackbar(res.message, { variant: "success" });
        })
        .catch((err) => {
          console.log(err);
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
            {isLoading ? <PiSpinner className="animate-spin inline text-xl" /> : "post"}
          </Button>
        </form>
        <p>
          Do not have an account ?{" "}
          <Link to="../mys-v5-signup" className="text-blue-500">
            Signup
          </Link>
        </p>
      </div>
    </section>
  );
};

export default MysV5Signin;
