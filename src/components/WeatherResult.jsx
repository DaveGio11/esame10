import React from "react";
import { Card, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const WeatherResult = ({ results }) => {
  return (
    <Container>
      {results.map((result, index) => (
        <Card
          key={`${result.city}-${index}`}
          className="text-center mx-auto mb-4 w-50 my-4 bg-light bg-opacity-50 shadow"
        >
          <Card.Body>
            <Card.Title>Risultati per: {result.city}</Card.Title>
            {result.coordinates && (
              <div>
                {result.country && (
                  <Card.Text>
                    <strong>Stato:</strong> {result.country}
                  </Card.Text>
                )}
                <img
                  variant="top"
                  src={`http://openweathermap.org/img/wn/${result.weatherIcon}.png`}
                  alt="Weather Icon"
                  width="100px"
                />
                <Card.Text>
                  <strong>Temperatura:</strong> {result.temperature} °C
                </Card.Text>
                <Card.Text>
                  <strong>Temperatura Percepita:</strong> {result.feelsLike} °C
                </Card.Text>
                <Card.Text>
                  <strong>Temperatura Massima:</strong> {result.tempMax} °C
                </Card.Text>
                <Card.Text>
                  <strong>Temperatura Minima:</strong> {result.tempMin} °C
                </Card.Text>
                <Card.Text>
                  <strong>Umidità:</strong> {result.humidity}%
                </Card.Text>
                <Card.Text>
                  <strong>Velocità del Vento:</strong> {result.windSpeed} m/s
                </Card.Text>
                <Card.Text>
                  <strong>Latitudine:</strong> {result.coordinates.lat}
                </Card.Text>
                <Card.Text>
                  <strong>Longitudine:</strong> {result.coordinates.lon}
                </Card.Text>
                <Link to={`/details/${result.city}`}>
                  <Button variant="primary">Dettagli</Button>
                </Link>
              </div>
            )}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default WeatherResult;
