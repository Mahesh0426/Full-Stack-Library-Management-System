import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import {
  BsBook,
  BsBoxSeam,
  BsMenuUp,
  BsPerson,
  BsPersonCheck,
} from "react-icons/bs";
import { Outlet } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SidebarItem from "./SidebarItem";
import Header from "./header";
import Footer from "./footer";
import { logoutUserAction } from "../../redux/userAction";
import { useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const { user } = useSelector((state) => state.user);
  const { first_name, last_name } = user || {};

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle logout
  const handleLogout = () => {
    dispatch(logoutUserAction());
    navigate("/");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container fluid className="flex-grow-1 d-flex">
        <Row className="w-100">
          <Col
            xs={3}
            className="vh-100 bg-info-subtle p-2 shadow position-fixed top-0 left-0"
          >
            <Stack className="h-100">
              <Card className="text-center fw-bold">
                <Card.Header>
                  <BsPersonCheck size={100} />
                </Card.Header>

                <Card.Body>{first_name + " " + last_name}</Card.Body>
              </Card>

              {/* Menu Items */}
              <Stack className="my-4">
                <SidebarItem
                  icon={<BsBoxSeam />}
                  label="Dashboard"
                  path="/admin/dashboard"
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
                <SidebarItem
                  icon={<BsBook />}
                  label="Books"
                  path="/admin/books"
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
                <SidebarItem
                  icon={<BsMenuUp />}
                  label="Reviews"
                  path="/admin/reviews"
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
                <SidebarItem
                  icon={<BsPerson />}
                  label="Users"
                  path="/admin/users"
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
              </Stack>
              <div className="mt-auto">
                <Button
                  variant="outline-danger"
                  className="w-100"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </Stack>
          </Col>

          <Col style={{ marginLeft: "25%" }} className="d-flex flex-column">
            <div className="flex-grow-1 pt-4">
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default AdminLayout;
