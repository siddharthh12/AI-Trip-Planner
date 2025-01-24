import React from "react";
import { Link } from "react-router-dom";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  return (
    <div className="mt-5">
      <h2 className="font-bold text-xl">Hotel Recommendations</h2>

      <div className="container mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {trip?.tripData?.hotelOptions?.map((hotel, index) => (
            <HotelCardItem hotel={hotel}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hotels;
