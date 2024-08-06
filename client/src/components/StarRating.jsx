import { Stack } from "react-bootstrap";
import { BsStar } from "react-icons/bs";

const StarRating = (props) => {
  const { rating } = props;
  return (
    <Stack direction="horizontal" gap={1}>
      {[1, 2, 3, 4, 5].map((value) => (
        <BsStar
          key={value}
          style={{ cursor: "pointer" }}
          fill={rating >= value ? "orange" : ""}
        />
      ))}
    </Stack>
  );
};

export default StarRating;
