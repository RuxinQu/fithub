import { NavLink } from "react-router-dom";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import Button from "@mui/joy/Button";
import Gravatar from "react-gravatar";

export const Header = ({ mode, setMode, user, loggedIn, logout }) => {
  return (
    <Navbar
      bg={mode === "light" ? "light" : "dark"}
      variant={mode === "light" ? "light" : "dark"}
      sticky="top"
      expand="lg"
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand href="/">FitHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link as={NavLink} to="/" href="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/workouts" href="/workouts">
              Search
            </Nav.Link>

            {loggedIn ? (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/myworkouts"
                  href="/myworkouts"
                  className="profile"
                >
                  My Workouts
                </Nav.Link>

                <Nav.Link className="profile" onClick={logout}>
                  Logout
                </Nav.Link>
                <NavDropdown
                  title={
                    <Gravatar
                      email={user.email}
                      alt={user.username}
                      style={{ borderRadius: "50%", width: 30, height: 30 }}
                    />
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item
                    as={NavLink}
                    to="/myworkouts"
                    href="/myworkouts"
                  >
                    My Workouts
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/login" href="/login">
                Login
              </Nav.Link>
            )}
            <Button
              variant="outlined"
              onClick={() => {
                setMode(mode === "light" ? "dark" : "light");
              }}
            >
              {mode === "light" ? "Turn dark" : "Turn light"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
