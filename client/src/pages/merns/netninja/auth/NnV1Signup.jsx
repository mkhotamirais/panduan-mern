import { Link } from "react-router-dom";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { useEffect, useRef, useState } from "react";
import useNnV1Signup from "../hooks/useNnV1Signup";

const NnV1Signup = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading } = useNnV1Signup();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
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
            signup
          </Button>
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

export default NnV1Signup;
