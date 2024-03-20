import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { useEffect, useRef, useState } from "react";
import { FaCheck, FaInfoCircle, FaTimes } from "react-icons/fa";
import { selectUserById, useUpdateUserMutation } from "../../../../app/api/dgApiEndpoint/dgV2UsersApiSlice";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,24}/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const DgV2UserUpdate = () => {
  const usernameRef = useRef(null);
  const errRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const item = useSelector((state) => selectUserById(state, id));
  const { enqueueSnackbar } = useSnackbar();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [roles, setRoles] = useState(["employee"]);
  const [active, setActive] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showChangePwd, setShowChangePwd] = useState(false);

  useEffect(() => {
    if (item) {
      setUsername(item?.username);
      setRoles(item?.roles);
      setActive(item?.active);
    }
  }, [item]);
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUsername(USERNAME_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd, matchPwd]);

  const usernameLabel = (username, validUsername) => (
    <Label htmlFor="username">
      Username:
      <span className={validUsername ? "inline-block text-green-500" : "hidden"}>
        <FaCheck />
      </span>
      <span className={validUsername || !username ? "hidden" : "inline-block text-rose-500"}>
        <FaTimes />
      </span>
    </Label>
  );

  const usernameInput = (usernameRef, username, setUsername, validUsername, setUsernameFocus) => (
    <InputRef
      ref={usernameRef}
      id="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="username"
      ariaInvalid={validUsername ? "false" : "true"}
      ariaDescribedby="uidnote"
      onFocus={() => setUsernameFocus(true)}
      onBlur={() => setUsernameFocus(false)}
    />
  );

  const usernameNote = (username, validUsername, usernameFocus) => {
    return (
      <Note id="uidnote" className={username && !validUsername && usernameFocus ? "block" : "hidden"}>
        <FaInfoCircle className="inline-block mr-1" />
        3 to 24 characters <br />
        Must begin weith a letter. <br />
        Letters, numbers, underscores, hyphens allowed.
      </Note>
    );
  };

  const pwdLabel = (pwd, validPwd) => (
    <Label id="password">
      Password:
      <span className={validPwd ? "inline-block text-green-500" : "hidden"}>
        <FaCheck />
      </span>
      <span className={validPwd || !pwd ? "hidden" : "inline-block text-rose-500"}>
        <FaTimes />
      </span>
    </Label>
  );

  const pwdInput = (setPwd, validPwd, setPwdFocus) => {
    return (
      <Input
        type="password"
        id="password"
        onChange={(e) => setPwd(e.target.value)}
        placeholder="********"
        ariaInvalid={validPwd ? "false" : "true"}
        ariaDescribedby="pwdnote"
        onFocus={() => setPwdFocus(true)}
        onBlur={() => setPwdFocus(false)}
        required={showChangePwd}
      />
    );
  };

  const pwdNote = (pwdFocus, validPwd) => {
    return (
      <Note id="pwdnote" className={pwdFocus && !validPwd ? "block" : "hidden"}>
        <FaInfoCircle className="inline-block mr-1" />
        8 to 24 characters <br />
        Must include uppercase and lowercase letters, a number and a special character. <br />
        Allowed special characters: <span aria-label="exclamation mark">!</span>
        <span aria-label="at symbol">@</span>
        <span aria-label="hashtag">#</span>
        <span aria-label="dollar sign">$</span>
        <span aria-label="percent">%</span>
      </Note>
    );
  };

  const confpwdLabel = (validMatch, matchPwd) => {
    return (
      <Label id="confirm_pwd">
        confirm password:
        <span className={validMatch && matchPwd ? "inline-block text-green-500" : "hidden"}>
          <FaCheck />
        </span>
        <span className={validMatch || !matchPwd ? "hidden" : "inline-block text-rose-500"}>
          <FaTimes />
        </span>
      </Label>
    );
  };

  const confPwdInput = (setMatchPwd, validMatch, setMatchFocus) => {
    return (
      <Input
        type="password"
        id="confirm_pwd"
        onChange={(e) => setMatchPwd(e.target.value)}
        placeholder="********"
        ariaInvalid={validMatch ? "false" : "true"}
        ariaDescribedby="confirmnote"
        onFocus={() => setMatchFocus(true)}
        onBlur={() => setMatchFocus(false)}
        required={showChangePwd}
      />
    );
  };

  const confPwdNote = (matchFocus, validMatch) => {
    return (
      <Note id="confirmnote" className={matchFocus && !validMatch ? "block" : "hidden"}>
        <FaInfoCircle className="inline-block mr-1" />
        Must match the first password input field.
      </Note>
    );
  };

  const authErrMsg = (errMsg, errRef) => (
    <p ref={errRef} className={errMsg ? "block border rounded p-1 bg-red-200 text-red-600" : "hidden"} aria-live="assertive">
      {errMsg}
    </p>
  );

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const canSave = [roles?.length, validUsername].every(Boolean) && !isLoading;

  const onRolesChanged = (e) => {
    if (e.target.checked) {
      setRoles((prev) => [...prev, e.target.value]);
    } else {
      setRoles((prev) => prev.filter((p) => p !== e.target.value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      let data;
      if (pwd) data = { id, username, active, roles, password: pwd };
      else data = { id, username, active, roles };
      updateUser(data)
        .unwrap()
        .then((res) => {
          enqueueSnackbar(res?.message, { variant: "success" });
          navigate("/davegray/dg-v2-user");
        })
        .catch((err) => {
          enqueueSnackbar(err, { variant: "error" });
        });
    }
  };

  return (
    <section className="rounded flex itemc justify-center">
      <div className="w-full mx-3 md:w-2/3 xl:w-1/2 border rounded p-4">
        {errMsg && authErrMsg(errMsg, errRef)}
        <form onSubmit={handleSubmit}>
          {usernameLabel(username, validUsername)}
          {usernameInput(usernameRef, username, setUsername, validUsername, setUsernameFocus)}
          {usernameNote(username, validUsername, usernameFocus)}
          <Button onClick={() => setShowChangePwd(!showChangePwd)}>{showChangePwd ? "Hide" : "Show"} change password</Button>
          <div className={`${showChangePwd ? "block" : "hidden invisible"}`}>
            {pwdLabel(pwd, validPwd)}
            {pwdInput(setPwd, validPwd, setPwdFocus)}
            {pwdNote(pwdFocus, validPwd, setPwdFocus)}
            {confpwdLabel(validMatch, matchPwd)}
            {confPwdInput(setMatchPwd, validMatch, setMatchFocus)}
            {confPwdNote(matchFocus, validMatch)}
          </div>
          <Label id="roles">Roles</Label>
          <input type="checkbox" name="roles" value="employee" checked readOnly /> employee <br />
          <input
            type="checkbox"
            checked={roles?.includes("admin")}
            name="roles"
            value="admin"
            onChange={onRolesChanged}
          />{" "}
          admin <br />
          <input
            type="checkbox"
            name="roles"
            checked={roles?.includes("user")}
            value="user"
            onChange={onRolesChanged}
          />{" "}
          user <br />
          <Label>Active</Label>
          <input type="checkbox" checked={active} name="active" onChange={(e) => setActive(e.target.checked)} />
          <label id="active">Active</label>
          <br />
          <Button type="submit" className={"w-full"}>
            {isLoading ? "Loading.." : "Update"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default DgV2UserUpdate;

export const Note = ({ id, children, className }) => (
  <p id={id} className={`${className} text-xs bg-black p-1 rounded text-white my-1`}>
    {children}
  </p>
);
Note.propTypes;
