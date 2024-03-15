import { Button, Input, Label } from "../../../components/Tags";
import AuthWrapper from "../../../components/AuthWrapper";

const Register = () => {
  return (
    <AuthWrapper title="register">
      <form action="">
        <div className="mb-3">
          <Label id="username">username</Label>
          <Input id="username" />
        </div>
        <div className="mb-3">
          <Label id="email">email</Label>
          <Input id="email" />
        </div>
        <div className="mb-3">
          <Label id="password">password</Label>
          <Input id="password" />
        </div>
        <div className="mb-3">
          <Label id="confPassword">confirm password</Label>
          <Input id="confPassword" />
        </div>
        <Button className={"py-3 w-full"}>Register</Button>
      </form>
    </AuthWrapper>
  );
};

export default Register;
