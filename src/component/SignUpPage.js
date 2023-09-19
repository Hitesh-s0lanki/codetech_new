import React, { useState } from "react";
import CodeTech from "../assets/images/CodeTech.png";
import { Button, useToast } from "@chakra-ui/react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { EmailIcon, StarIcon } from "@chakra-ui/icons";

const SignUpPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    Username: "",
    Password: "",
    Email: "",
    Confirm: "",
  });
  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const createToast = (status, message) => {
    return toast({
      position: "top",
      title: message,
      status: status,
      isClosable: true,
      duration: 2000,
      containerStyle: {
        margin: "70px",
      },
    });
  };

  const { createUserAuthentication, setUser } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { Username, Password, Email } = details;
    if (!Username || !Password || !Email) {
      createToast("error", "Fill the Complete Details");
    } else {
      try {
        const user = await createUserAuthentication(Username, Email, Password);
        if (user.user !== "") {
          await setUser(user);
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate("/");
        } else {
          createToast("error", user.error);
        }
      } catch (error) {
        createToast("error", error.message);
      }
    }
  };

  const signUpWithGoogle = () => {
    createToast("warning", `This Feature is not there for now`);
  };

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <div
      className="container  p-3 rounded border-1 drop-shadow-2xl"
      style={{ width: "400px", background: "#fff", margin: "20px auto" }}
    >
      <div className="container d-flex flex-column">
        <div
          className="logo d-flex flex-column"
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            marginBottom: "35px",
          }}
        >
          <img
            src={CodeTech}
            alt="logo"
            height={80}
            width={100}
            style={{ marginTop: "35px" }}
          />
          <div className="text fw-bold" style={{ fontSize: "30px" }}>
            Code<span className="text-warning">Tech</span>
          </div>
        </div>
        <form
          method="post"
          className="d-flex flex-column"
          onSubmit={handleSubmit}
        >
          <InputGroup className="m-1" size="md">
            <InputLeftElement pointerEvents="none">
              <StarIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Username"
              name="Username"
              value={details.Username}
              onChange={onChange}
              required
            />
          </InputGroup>
          <InputGroup size="md" className="m-1">
            <Input
              name="Password"
              value={details.Password}
              onChange={onChange}
              required
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <InputGroup size="md" className="m-1">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Confirm password"
              value={details.Confirm}
              onChange={onChange}
              name="Confirm"
              required
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <InputGroup className="m-1" size="md">
            <InputLeftElement pointerEvents="none">
              <EmailIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="email"
              placeholder="Email"
              name="Email"
              value={details.Email}
              onChange={onChange}
            />
          </InputGroup>
          <Button type="submit" className="btn m-1" colorScheme="gray">
            Sign Up
          </Button>
        </form>
        <div
          className="RedirectText text-center my-2"
          style={{ color: "gray" }}
        >
          Have an account?
          <span
            style={{ color: "black", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Sign In
          </span>
        </div>
        <div className="Simple Text text-center my-2" style={{ color: "gray" }}>
          Or Sign In With Google
        </div>
        <Button
          margin={2}
          padding={2}
          style={{ textTransform: "none", margin: "auto" }}
          onClick={signUpWithGoogle}
        >
          <img
            width="20px"
            style={{ marginBottom: "3px", marginRight: "5px" }}
            alt="Google sign-in"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          />
          Google
        </Button>
      </div>
    </div>
  );
};

export default SignUpPage;
