// DetailsPage.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

const CityDetails = () => {
  const { city } = useParams();
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=b34a8e696ac1487d41c911090a798907`
        );
        const data = await response.json();

        // Estrai le informazioni necessarie dalle previsioni API
        const forecastData = data.list.map((item) => ({
          dateTime: item.dt_txt,
          temperature: item.main.temp,
          weatherIcon: item.weather[0].icon,
        }));

        setForecast(forecastData);
      } catch (error) {
        console.error("Errore nella richiesta di previsioni API:", error);
      }
    };

    fetchForecast();
  }, [city]);

  return (
    <div>
      <h1 className="text-center mt-4">Dettagli per {city}</h1>
      <div className="text-center mx-auto mt-4">
        <Link to="/">
          <Button type="button">Nuova Ricerca</Button>
        </Link>
      </div>

      <h2 className="text-center mt-4">Previsioni per i prossimi giorni:</h2>
      {forecast.map((item, index) => (
        <Card key={index} className="text-center mx-auto mb-4 w-50 my-4">
          <Card.Body>
            <Card.Title>Data e Ora: {item.dateTime}</Card.Title>
            <Card.Text>
              Temperatura: {item.temperature} °C{" "}
              <img src={`http://openweathermap.org/img/wn/${item.weatherIcon}.png`} alt="Weather Icon" width="30px" />
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CityDetails;
