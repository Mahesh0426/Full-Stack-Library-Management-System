import { useState } from "react";
import { Button } from "react-bootstrap";
import BooksTable from "../components/BookTable";
import CreateOrEditBookModal from "../components/CreateOrEditBookModal";

const emptyFormData = {
  thumbnail: "",
  title: "",
  author: "",
  publish_year: "",
  isbn: "",
  description: "",
};

const BookPage = () => {
  const [initialFormData, setInitialFormData] = useState(emptyFormData);
  const [showModal, setShowModal] = useState(false);

  //handle create book modal form
  const openCreateBookModal = () => {
    setInitialFormData(emptyFormData);
    setShowModal(true);
  };
  return (
    <>
      {/* button to lanunch create book modakl */}
      <Button variant="success" onClick={openCreateBookModal}>
        Add Book
      </Button>

      {/* table or form  to add book details */}
      <BooksTable
        setShowModal={setShowModal}
        setInitialFormData={setInitialFormData}
      />
      {/* create BooksModal */}
      <CreateOrEditBookModal
        showModal={showModal}
        setShowModal={setShowModal}
        initialFormData={initialFormData}
      />
    </>
  );
};

export default BookPage;
