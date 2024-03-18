import { Link } from "react-router-dom";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { useRef, useState } from "react";

const MysV4Signup = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {};
  return (
    <section className="rounded flex itemc justify-center">
      <div className="w-full mx-3 md:w-2/3 xl:w-1/2 border rounded p-4">
        <form onSubmit={handleSubmit}>
          <Label id="email">email</Label>
          <InputRef ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} />
          <Label id="password">password</Label>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit">signup</Button>
        </form>
        <p>
          Already have an account ?{" "}
          <Link to="../mys-v4-signin" className="text-blue-500">
            Signin
          </Link>
        </p>
      </div>
    </section>
  );
};

export default MysV4Signup;
