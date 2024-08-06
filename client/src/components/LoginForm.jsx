import { Button, Form, Spinner } from "react-bootstrap";
import CustomInput from "./CustomInput";
import { toast } from "react-toastify";
import { loginUser } from "../../axios/useraxios";
import useForm from "../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { autoLoginAction, getUserAction } from "../../redux/userAction";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const initialFormData = {
  email: "",
  password: "",
};

const LoginForm = () => {
  // custom hook
  const { formData, handleOnChange } = useForm(initialFormData);
  const { email, password } = formData; // destructure

  const [IsLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // handle on submit
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // call axios to hit login endpoint
    const result = await loginUser(formData);
    setIsLoading(false);
    // console.log(result);

    if (result.error) {
      setIsLoading(false);
      return toast.error(result.message);
    }

    // if Success
    //Store accessJwt in session Storge
    // Store refresh in local storage
    sessionStorage.setItem("accessJWT", result.data.accessJWT);
    localStorage.setItem("refreshJWT", result.data.refreshJWT);

    // now get the user info
    // dispatch an action
    setIsLoading(false);
    dispatch(getUserAction());
  };

  //Logic to redirect user once logged in
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    //if logged in, redirect to required route
    if (user?._id) {
      navigate("/admin");
    }

    //if not logged in , try auto login
    if (!user?._id) {
      dispatch(autoLoginAction());
    }
  }, [user?._id, navigate, dispatch]);

  return (
    <Form onSubmit={(e) => handleOnSubmit(e)}>
      <CustomInput
        label="Email"
        handleOnChange={handleOnChange}
        inputAttributes={{
          type: "email",
          name: "email",
          value: email,
          placeholder: "Enter your Email",
          required: true,
        }}
      />

      <CustomInput
        label="Password"
        handleOnChange={handleOnChange}
        inputAttributes={{
          type: "password",
          name: "password",
          value: password,
          placeholder: "Enter a Password",
          required: true,
        }}
      />

      <Button variant="primary" type="submit" disabled={IsLoading}>
        {IsLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          "Login"
        )}
      </Button>
    </Form>
  );
};

export default LoginForm;
