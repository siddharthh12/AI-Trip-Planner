import React from 'react';
import PlaceCardItem from './PlaceCardItem';

const PlacesToVisit = ({ trip }) => {
  const itinerary = trip?.tripData?.itinerary
    ? Object.entries(trip.tripData.itinerary)
    : [];

  return (
    <div >
      <h2 className="font-bold text-lg ">Places to Visit</h2>
      <div className='grid md:grid-cols-2 gap-5'>
        {itinerary
          .sort(([a], [b]) => {
            const dayA = parseInt(a.replace("day", ""), 10);
            const dayB = parseInt(b.replace("day", ""), 10);
            return dayA - dayB;
          })
          .map(([day, details], index) => (
            <div key={index} className="mb-4">
              {/* Display the day */}
              <h3 className="font-medium text-lg">{day}</h3>

              {/* Display the best time to visit */}
              <h4 className="font-medium text-sm text-orange-500 ml-4">
                Best Time to Visit: {details.bestTimeToVisit}
              </h4>

              {/* Map over the places and pass each place to PlaceCardItem */}
              {details.places?.map((place, placeIndex) => (
                <PlaceCardItem key={placeIndex} place={place} />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
