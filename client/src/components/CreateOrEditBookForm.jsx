import { Button, Form, Stack } from "react-bootstrap";
import useForm from "../hooks/useForm";
import CustomInput from "./CustomInput";
import { useDispatch } from "react-redux";
import { createBookAction, updateBookAction } from "../../redux/bookAction";

const BOOK_FORM_FIELDS = [
  {
    label: "Image Url",
    name: "thumbnail",
    type: "text",
  },
  {
    label: "Title",
    name: "title",
    type: "text",
  },
  {
    label: "ISBN",
    name: "isbn",
    type: "number",
  },
  {
    label: "Author",
    name: "author",
    type: "text",
  },
  {
    label: "Publish Year",
    name: "publish_year",
    type: "month",
  },
  {
    label: "Description",
    name: "description",
    type: "textarea",
  },
];

const CreateOrEditBookForm = (props) => {
  const { setShowModal, initialFormData } = props;

  const isNewRecord = !initialFormData.isbn;

  //get form data and handle on change from  custoom hook
  const { formData, handleOnChange } = useForm(initialFormData);

  const dispatch = useDispatch();

  //handle form submit
  const handleOnSubmit = (e) => {
    e.preventDefault();

    //dispatch an action to create or update  book
    isNewRecord
      ? dispatch(createBookAction(formData))
      : dispatch(updateBookAction(formData));
    console.log(formData);
    setShowModal(false);
  };

  return (
    <Form
      onSubmit={handleOnSubmit}
      className="d-flex flex-column justify-content-between h-100"
    >
      {BOOK_FORM_FIELDS.map((field, index) => {
        const typeName = field.type === "textarea" ? "as" : "type";
        return (
          <CustomInput
            key={index}
            label={field.label}
            handleOnChange={handleOnChange}
            inputAttributes={{
              [typeName]: field.type,
              name: field.name,
              value: formData[field.name],
            }}
          />
        );
      })}
      <Stack direction="horizontal" gap={1} className="p-2 mt-auto">
        <Button variant="outline-success" className="w-100" type="submit">
          {isNewRecord ? "Create" : "Update"}
        </Button>
        <Button
          variant="outline-danger"
          className="w-100"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </Button>
      </Stack>
    </Form>
  );
};

export default CreateOrEditBookForm;
