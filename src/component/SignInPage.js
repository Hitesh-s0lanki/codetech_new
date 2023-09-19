import React, { useEffect, useState } from "react";
import CodeTech from "../assets/images/CodeTech.png";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Cookies from "universal-cookie";
import { EmailIcon } from "@chakra-ui/icons";

const cookies = new Cookies();

const SignInPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loginDetails, setLoginDetails] = useState({ Email: "", Password: "" });
  const { authenticateUser, setUser, getAuthUser } = useAuthContext();

  useEffect(() => {
    if (cookies.get("auth") && cookies.get("auth") !== "") {
      const fetch = async () => {
        const user = await getAuthUser(cookies.get("auth"));
        await setUser(user.user);
        navigate("/home");
      };
      fetch();
    }
  }, [navigate, setUser, getAuthUser]);

  const onChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { Email, Password } = loginDetails;
    if (!Email || !Password) {
      createToast("error", "Fill the Complete Details");
    } else {
      try {
        const user = await authenticateUser(Email, Password);
        if (user.user !== "") {
          cookies.set("auth", user.uid);
          await setUser(user.user);
          toast({
            title: "Logged In",
            description: "Successfull",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate("/home");
        } else if (!user.bool) {
          createToast("error", user.error);
        } else {
          createToast("error", "User not present");
        }
      } catch (error) {
        createToast("error", error.message);
      }
    }
  };

  const signInWithGoogle = () => {
    createToast("warning", `This Feature is not there for now`);
  };

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <div
      className="container border-1 p-3 rounded drop-shadow-2xl"
      style={{ width: "400px", background: "#fff", margin: "40px auto" }}
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
          className=" d-flex flex-column"
          onSubmit={handleSubmit}
        >
          <InputGroup className="m-1" size='md'>
            <InputLeftElement pointerEvents="none">
              <EmailIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="email"
              placeholder="Email"
              value={loginDetails.Email}
              onChange={onChange}
              name="Email"
            />
          </InputGroup>
          <InputGroup size="md" className="m-1">
            <Input
              name="Password"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              value={loginDetails.Password}
              onChange={onChange}
              required
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button type="submit" className="btn m-1" colorScheme={"gray"}>
            Login
          </Button>
        </form>
        <div
          className="RedirectText my-2 mx-2 d-flex justify-content-between"
          style={{ color: "gray" }}
        >
          <div
            className="ForgotPassword"
            style={{ cursor: "pointer" }}
            onClick={() => console.log("Forgot Password")}
          >
            Forgot Password?
          </div>
          <div
            className="redirectToSignUp"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/SignUp")}
          >
            Sign Up
          </div>
        </div>
        <div className="Simple Text text-center my-2" style={{ color: "gray" }}>
          Or Sign In With Google
        </div>
        <Button
          margin={2}
          padding={2}
          style={{ textTransform: "none", margin: "auto" }}
          onClick={signInWithGoogle}
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

export default SignInPage;
