import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllReviewsAction } from "../../redux/reviewAction";
import StarRating from "./StarRating.jsx";

const BookDescriptionAndReviewTab = (props) => {
  const { book } = props;
  const { _id } = useParams();

  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.review);

  // Fetch reviews when the component mounts
  useEffect(() => {
    dispatch(getAllReviewsAction(_id));
  }, [dispatch, _id]);

  // console.log("Reviews from Redux state:", reviews);

  // Filter approved reviews
  const approvedReviews = reviews.filter(
    (review) => review.status === "approved"
  );

  return (
    <Tabs defaultActiveKey="description" id="book-details-tab" className="mb-3">
      <Tab eventKey="description" title="Description">
        {book.description}
      </Tab>
      <Tab eventKey="reviews" title="Reviews">
        {approvedReviews.length > 0 ? (
          approvedReviews.map((review) => (
            <div key={review._id} className="my-2">
              <StarRating rating={review.rating} />
              <h5>{review.user_name}</h5>
              <p>{review.message}</p>
            </div>
          ))
        ) : (
          <p>No reviews available for this book.</p>
        )}
      </Tab>
    </Tabs>
  );
};

export default BookDescriptionAndReviewTab;
