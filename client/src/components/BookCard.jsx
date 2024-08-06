/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const BookCard = (props) => {
  const { book } = props;

  const { _id, title, thumbnail, author } = book;

  return (
    <Card style={{ width: "18rem", height: "28rem" }}>
       <Link to={`/book/${_id}`}>
      <Card.Img variant="top" src={thumbnail} height={250} />
      </Link>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>-{author}</Card.Text>
      </Card.Body>

      <Card.Footer className="text-end">
        <Link to={`/book/${_id}`}>
          <Button variant="primary">View More</Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default BookCard;
