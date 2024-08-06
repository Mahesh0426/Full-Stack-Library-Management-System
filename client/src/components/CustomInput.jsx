import { FloatingLabel, Form } from "react-bootstrap";

const CustomInput = (props) => {
  const { label, inputAttributes, handleOnChange } = props;

  return (
    <Form.Group className="mb-3">
      <FloatingLabel className="fw-bold" label={label}>
        {/* <Form.Label className="fw-bold">{label}</Form.Label> */}
        <Form.Control
          {...inputAttributes}
          onChange={(e) => handleOnChange(e)}
        />
      </FloatingLabel>
    </Form.Group>
  );
};

export default CustomInput;
