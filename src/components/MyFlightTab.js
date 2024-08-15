import React, { useState } from "react";
import FlightCard from "./FlightCard";
import MessagePopup from "./MessagePopup";

const MyFlightsTab = ({ flights, allFlights }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Flights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flights.map(flight => (
          <div key={flight._id}>
            <FlightCard flight={flight} showConnect={false} />
            {allFlights.some(f =>
              f._id !== flight._id &&
              f.flightNumber.toLowerCase() === flight.flightNumber.toLowerCase() &&
              f.departure.toLowerCase() === flight.departure.toLowerCase() &&
              f.arrival.toLowerCase() === flight.arrival.toLowerCase() &&
              f.date === flight.date
            ) && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-6">Matched Flights</h2>
                {allFlights.filter(f =>
                  f._id !== flight._id &&
                  f.flightNumber.toLowerCase() === flight.flightNumber.toLowerCase() &&
                  f.departure.toLowerCase() === flight.departure.toLowerCase() &&
                  f.arrival.toLowerCase() === flight.arrival.toLowerCase() &&
                  f.date === flight.date
                ).map(f => (
                  <FlightCard
                    key={f._id}
                    flight={f}
                    showConnect={true}
                  />
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFlightsTab;
