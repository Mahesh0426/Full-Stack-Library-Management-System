import { useState } from "react";
import { createUser } from "../../axios/useraxios";
import useForm from "../hooks/useForm";
import CustomInput from "./CustomInput";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const initialFormData = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  password: "",
  confirm_password: "",
};

const SignupForm = (props) => {
  const { setIsLoginForm } = props;
  const [IsLoading, SetIsLoading] = useState(false);

  //call custom hook useForm hook
  const useFormPayload = useForm(initialFormData);
  const { formData, handleOnChange } = useFormPayload; // destructure
  const { first_name, last_name, password, email, phone } = formData;
  //handle on submit
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    SetIsLoading(true);
    //call axios
    const result = await createUser({
      first_name,
      last_name,
      email,
      phone,
      password,
    });

    if (result.status === "error") {
      SetIsLoading(false);
      return toast.error(result.message);
    }
    SetIsLoading(false);
    toast.success(result.message);
    //once a user is created ,we display a login form
    setIsLoginForm(true);
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <h2 className="text-center mb-4">Create an Account</h2>

      <Row>
        <Col>
          <CustomInput
            label="First Name"
            handleOnChange={handleOnChange}
            inputAttributes={{
              type: "text",
              name: "first_name",
              value: formData.first_name,
              placeholder: "Enter your first name",
              required: true,
            }}
          />
        </Col>

        <Col>
          <CustomInput
            label="Last Name"
            handleOnChange={handleOnChange}
            inputAttributes={{
              type: "text",
              name: "last_name",
              value: formData.last_name,
              placeholder: "Enter your last name",
              required: true,
            }}
          />
        </Col>
      </Row>

      <CustomInput
        label="Phone"
        handleOnChange={handleOnChange}
        inputAttributes={{
          type: "tel",
          name: "phone",
          value: formData.phone,
          placeholder: "Enter your Phone number",
          required: true,
        }}
      />

      <CustomInput
        label="Email"
        handleOnChange={handleOnChange}
        inputAttributes={{
          type: "email",
          name: "email",
          value: formData.email,
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
          value: formData.password,
          placeholder: "Enter a Password",
          required: true,
        }}
      />

      <CustomInput
        label="Confirm Password"
        handleOnChange={handleOnChange}
        inputAttributes={{
          type: "password",
          name: "confirm_password",
          value: formData.confirm_password,
          placeholder: "Enter Password",
          required: true,
        }}
      />

      <Button variant="primary" type="submit" disabled={IsLoading}>
        {IsLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          "Sign up"
        )}
      </Button>
    </Form>
  );
};

export default SignupForm;
