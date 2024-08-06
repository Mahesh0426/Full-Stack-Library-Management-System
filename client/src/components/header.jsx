import { Button, Col, Dropdown, Form, Nav, Navbar, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUserAction } from "../../redux/userAction";
import { useState } from "react";
import { getBookAction } from "../../redux/bookAction";

const Header = () => {
  const {
    user: { _id, first_name, last_name, role },
  } = useSelector((state) => state.user);

  const { books } = useSelector((state) => state.book);

  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUserAction());
    navigate("/");
  };

  //handle on  search submit  to search books
  const handleOnSearchSubmit = (e) => {
    e.preventDefault();
    if (search) {
      // Dispatch action to fetch books based on the search term
      dispatch(getBookAction(search));

      // Find a matching book
      const BookFound = books.find((book) => {
        const title = book.title.toLowerCase();
        return title.includes(search);
      });
      if (BookFound) {
        navigate(`/book/${BookFound._id}`);
      }
      setSearch("");
    }
  };

  return (
    <Navbar expand="lg" className="bg-info-subtle px-4 align-items-center">
      <Link to="/" className="fw-bold text-dark text-decoration-none">
        <Navbar.Brand>LMS</Navbar.Brand>
      </Link>
      {role !== "admin" && (
        <Form inline onSubmit={handleOnSearchSubmit}>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by book Title"
                className=" mr-sm-2"
              />
            </Col>
            <Col xs="auto">
              <Button type="submit">search</Button>
            </Col>
          </Row>
        </Form>
      )}

      <Navbar.Toggle />

      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <Nav>
          <Nav.Item>
            {!_id && (
              <Link
                to="/auth"
                className="btn btn-outline-danger fw-bold text-dark text-decoration-none"
              >
                Sign Up
              </Link>
            )}

            {_id && (
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-autoclose-true"
                  className="bg-transparent text-dark fw-bold border-2 border-primary"
                >
                  {first_name + " " + last_name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {role === "student" && (
                    <Dropdown.Item className="fw-bold">
                      <Link
                        to="/borrows"
                        className="text-decoration-none text-dark"
                      >
                        Borrow History
                      </Link>
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item className="fw-bold">Profile</Dropdown.Item>
                  {role === "student" && (
                    <Dropdown.Item>
                      <Button
                        variant="outline-danger"
                        className="w-100"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
