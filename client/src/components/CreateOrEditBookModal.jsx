import { Offcanvas } from "react-bootstrap";
import CreateOrEditBookForm from "./CreateOrEditBookForm";

const CreateOrEditBookModal = (props) => {
  const { showModal, setShowModal, initialFormData } = props;

  // new record dosent have same isbn
  const isNewRecord = !initialFormData.isbn;
  return (
    <Offcanvas
      show={showModal}
      onHide={() => setShowModal(false)}
      placement="end"
      backdrop="static"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {isNewRecord ? "Create Book" : "Update Book"}
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {/* form to create or edit a book  */}
        <CreateOrEditBookForm
          initialFormData={initialFormData}
          setShowModal={setShowModal}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CreateOrEditBookModal;
