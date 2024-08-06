import { Link, useParams } from "react-router-dom";

import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Image,
  Row,
  Stack,
} from "react-bootstrap";
import BookDescriptionAndReviewTab from "../components/BookDescriptionAndReviewTab";
import { useDispatch, useSelector } from "react-redux";
import { getBookAction } from "../../redux/bookAction";
import { useEffect, useState } from "react";
import BorrowBookModal from "../components/BorrowModal";
import { format } from "date-fns";

const BookDetailPage = () => {
  // get the book id from params
  const { _id } = useParams();

  // get Book details from api by dispatcing action
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookAction(_id));
  }, [dispatch, _id]);

  const { book } = useSelector((state) => state.book);
  const { user } = useSelector((state) => state.user);

  const isBookAvailable = book.status === "available";
  const isAuthenticated = user._id;

  // State to control modal
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Container className="my-2">
        <Row>
          <Col xs={4}>
            <Image src={book.thumbnail} thumbnail />
          </Col>

          <Col xs={8}>
            <Stack gap={1}>
              <div className="fw-bold h1">{book.title}</div>
              <div className="fst-italic">By {book.author}</div>
              <div>Publish Year: {book.publish_year}</div>
              <div>
                <Badge bg="warning">ISBN: {book.isbn}</Badge>
              </div>

              {!isBookAvailable && book.due_date && (
                <Alert variant="danger">
                  Not Available, Available from:{" "}
                  {format(new Date(book.due_date), "MMMM d, yyyy", "")}
                </Alert>
              )}

              {isBookAvailable && isAuthenticated && (
                <Button
                  variant="outline-primary"
                  onClick={() => setShowModal(true)}
                >
                  Borrow Book
                </Button>
              )}

              {isBookAvailable && !isAuthenticated && (
                <Link to="/auth" state={{ from: `/book/${_id}` }}>
                  <Button variant="outline-danger">Login To Borrow Book</Button>
                </Link>
              )}
            </Stack>
          </Col>
        </Row>

        <Row className="mt-4">
          <BookDescriptionAndReviewTab book={book} />
        </Row>

        <BorrowBookModal showModal={showModal} setShowModal={setShowModal} />
      </Container>
    </>
  );
};

export default BookDetailPage;
