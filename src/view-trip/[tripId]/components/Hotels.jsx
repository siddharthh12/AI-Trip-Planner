import React from "react";
import { Link } from "react-router-dom";
import HotelCardItem from "./HotelCardItem";
import { FaHotel, FaMapMarkedAlt } from "react-icons/fa";

function Hotels({ trip }) {
  // Color palette
const colors = {
  terracotta: '#B25E39',
  darkGray: '#473D3A',
  beige: '#F3F3F3'
};

  return (
    <div className="mt-5">

 <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

<div className="flex items-center gap-3 mb-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${colors.terracotta}20` }}
          >
            <FaHotel className="text-2xl" style={{ color: colors.terracotta }} />
          </div>
          <div>
            <h2 className="font-bold text-2xl md:text-3xl" style={{ color: colors.darkGray }}>
              Hotel Recommendations
            </h2>
           
          </div>
        </div>
 </div>


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
