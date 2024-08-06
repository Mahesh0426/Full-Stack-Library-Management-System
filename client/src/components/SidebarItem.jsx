import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const SidebarItem = (props) => {
  const { icon, label, path, activeItem, setActiveItem } = props;
  return (
    <Link className="text-decoration-none p-1 me-atuo" to={path}>
      <Button
        variant={activeItem === label ? "info" : "outline-info"}
        onClick={() => setActiveItem(label)}
      >
        {icon} {label}
      </Button>
    </Link>
  );
};

export default SidebarItem;
