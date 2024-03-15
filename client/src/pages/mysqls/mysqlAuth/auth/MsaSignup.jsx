import { useRef, useState } from "react";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { Link } from "react-router-dom";

const MsaSignup = () => {
  const usernameRef = useRef();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  return (
    <section className="rounded flex itemc justify-center">
      <div className="w-full mx-3 md:w-2/3 xl:w-1/2 border rounded p-4">
        <form action="">
          <Label id="username">username</Label>
          <InputRef ref={usernameRef} value={username} onChange={(e) => setUsername(e.target.value)} />
          <Label id="email">email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Label id="password">password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Label id="confPassword">confirm password</Label>
          <Input type="password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
          <Button type="submit">signin</Button>
        </form>
        <p>
          Already have an account ?{" "}
          <Link to="../signin" className="text-blue-500">
            Signin
          </Link>
        </p>
      </div>
    </section>
  );
};

export default MsaSignup;
