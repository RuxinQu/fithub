import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../utils/queries";
import Auth from "../utils/auth";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useColorScheme } from "@mui/joy/styles";
import { ButtonToggle } from "./ButtonToggle";
import Gravatar from "react-gravatar";

export const Header = () => {
  const { mode, setMode } = useColorScheme("light");
  const { loading, data } = useQuery(GET_USER);
  // keep the question mark
  const userData = data?.user;

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

            {Auth.loggedIn() ? (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/myworkouts"
                  href="/myworkouts"
                  className="profile"
                >
                  My Workouts
                </Nav.Link>

                <Nav.Link
                  className="profile"
                  as={NavLink}
                  to="/login"
                  href="/login"
                  onClick={() => Auth.logout()}
                >
                  Logout
                </Nav.Link>
                <NavDropdown
                  title={
                    <Gravatar
                      email={userData?.email}
                      alt={userData?.username}
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
                  <NavDropdown.Item
                    as={NavLink}
                    to="/login"
                    href="/login"
                    onClick={() => Auth.logout()}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/login" href="/login">
                Login
              </Nav.Link>
            )}
            <ButtonToggle mode={mode} setMode={setMode} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
