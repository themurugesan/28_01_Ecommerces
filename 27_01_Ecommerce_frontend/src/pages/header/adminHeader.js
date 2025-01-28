import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./adminHeader.css";

const AdminHeader = () => {  // Changed the component name to uppercase
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Navbar bg={token ? "primary" : "dark"} variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="">
            <strong>{token ? "Logged-In" : "Not-LoggedIn"}</strong>
          </Navbar.Brand>
          <Nav className="ml-auto">
            {token ? (
              <>
                <Nav.Link as={Link} to="/adminproduct" className="nav-link">
                  Product
                </Nav.Link>
                <Nav.Link as={Link} to="/admindashboard" className="nav-link">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/" className="nav-link" onClick={handleLogout}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/admin" className="nav-link">
                  Admin Login
                </Nav.Link>
                <Nav.Link as={Link} to="/adminsignup" className="nav-link">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminHeader;  // Export the corrected component name
