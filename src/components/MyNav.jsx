import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";

const MyNav = ({ onCitySubmit }) => {
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState(null);

  const handleCitySubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b34a8e696ac1487d41c911090a798907`
      );
      const data = await response.json();

      const { coord } = data;
      setCoordinates(coord);

      onCitySubmit(city);
    } catch (error) {
      console.error("Error in API request:", error);
    }
  };

  return (
    <Navbar bg="body-tertiary" expand="lg">
      <Container>
        <Navbar.Brand className="align-content-center">
          <img
            src="https://play-lh.googleusercontent.com/ZHqqECG5kcUSCC20UFEzCpWNEyYLs5CS2ED6RqQVK0_UWgnQq4YiC9llsoWnIyoLNDLI"
            alt="logo-meteo"
            width="30"
          />{" "}
          <span>Pippo Meteo</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll></Nav>
          <Form onSubmit={handleCitySubmit} className="d-flex">
            <FormControl
              type="text"
              placeholder="Inserisci una città"
              className="me-2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Button variant="outline-success" type="submit">
              Cerca
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;
