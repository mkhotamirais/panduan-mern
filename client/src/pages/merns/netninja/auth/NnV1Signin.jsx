import { Link } from "react-router-dom";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { useEffect, useRef, useState } from "react";
import useNnV1Signin from "../hooks/useNnV1Signin";

const NnV1Signin = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin, isLoading, error } = useNnV1Signin();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(email, password);
  };
  return (
    <section className="rounded flex itemc justify-center">
      <div className="w-full mx-3 md:w-2/3 xl:w-1/2 border rounded p-4">
        <form onSubmit={handleSubmit}>
          <Label id="email">email</Label>
          <InputRef ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} />
          <Label id="password">password</Label>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" disabled={isLoading}>
            signin
          </Button>
        </form>
        <p>
          Do not have an account ?{" "}
          <Link to="../nn-v1-signup" className="text-blue-500">
            Signup
          </Link>
        </p>
      </div>
    </section>
  );
};

export default NnV1Signin;
