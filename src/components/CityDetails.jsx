// DetailsPage.js
import React from "react";
import { useParams } from "react-router-dom";

const CityDetails = () => {
  const { city } = useParams();

  // Puoi implementare il recupero dei dettagli specifici per la città dalla tua API qui

  return (
    <div>
      <h1>Dettagli per {city}</h1>
      {/* Mostra i dettagli specifici della città qui */}
    </div>
  );
};

export default CityDetails;
