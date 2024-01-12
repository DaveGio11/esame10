// DetailsPage.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Card, Row, Col } from "react-bootstrap";

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
        const forecastData = data.list.reduce((acc, item) => {
          const date = item.dt_txt.split(" ")[0];

          if (!acc[date]) {
            acc[date] = {
              date,
              forecasts: [],
            };
          }

          acc[date].forecasts.push({
            time: item.dt_txt.split(" ")[1],
            temperature: item.main.temp,
            weatherIcon: item.weather[0].icon,
          });

          return acc;
        }, {});

        setForecast(Object.values(forecastData));
      } catch (error) {
        console.error("Errore nella richiesta di previsioni API:", error);
      }
    };

    fetchForecast();
  }, [city]);

  return (
    <div>
      <h1 className="text-center mt-4">Dettagli per: {city}</h1>
      <div className="text-center mx-auto mt-4 fixed">
        <Link to="/">
          <Button type="button">Nuova Ricerca</Button>
        </Link>
      </div>

      <h2 className="text-center mt-4">Previsioni per i prossimi giorni:</h2>
      {forecast.map((day, index) => (
        <Card key={index} className="text-center mx-auto mb-4 w-25 my-4 bg-light bg-opacity-50 shadow">
          <Card.Body>
            <Card.Title>{day.date}</Card.Title>
            {day.forecasts.map((item, i) => (
              <Card.Text key={i} className="text-info">
                {item.time}: {item.temperature} °C{" "}
                <img src={`http://openweathermap.org/img/wn/${item.weatherIcon}.png`} alt="Weather Icon" width="30px" />
              </Card.Text>
            ))}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CityDetails;
