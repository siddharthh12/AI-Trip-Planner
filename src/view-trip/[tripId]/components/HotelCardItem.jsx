import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaStar, FaDollarSign } from 'react-icons/fa';

// Color palette
const colors = {
  terracotta: '#B25E39',
  darkGray: '#473D3A',
  beige: '#F3F3F3'
};

function HotelCardItem({hotel}) {

    const [photoUrl, setPhotoUrl] = useState()
    
    useEffect(() => {
      hotel && GetPlacePhoto();
    }, [hotel])

    const GetPlacePhoto = async () => {
      const data = {
        textQuery: hotel?.hotelName
      }

      const result = await GetPlaceDetails(data).then(resp => {
        console.log(resp.data.places[0].photos[3].name);

        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
        setPhotoUrl(PhotoUrl)
      })
    }

  return (
    <Link 
      to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + "," + hotel?.hotelAddress} 
      target="_blank"
      className="block"
    > 
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
        {/* Hotel Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={photoUrl}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            alt={hotel?.hotelName || "Hotel"}
          />
          {/* Rating Badge */}
          {hotel?.rating && (
            <div 
              className="absolute top-3 right-3 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg"
              style={{ backgroundColor: colors.terracotta }}
            >
              <FaStar className="text-white text-sm" />
              <span className="text-white font-bold text-sm">{hotel.rating}</span>
            </div>
          )}
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        {/* Hotel Details */}
        <div className="p-5">
          {/* Hotel Name */}
          <h2 
            className="font-bold text-lg mb-3 line-clamp-2" 
            style={{ color: colors.darkGray }}
          >
            {hotel?.hotelName || "Hotel Name"}
          </h2>

          {/* Address */}
          <div className="flex items-start gap-2 mb-3">
            <FaMapMarkerAlt 
              className="text-base mt-1 flex-shrink-0" 
              style={{ color: colors.terracotta }} 
            />
            <p className="text-sm text-gray-600 line-clamp-2">
              {hotel?.hotelAddress || "Address not available"}
            </p>
          </div>

          {/* Price Section */}
          <div 
            className="flex items-center justify-between p-3 rounded-xl mt-4"
            style={{ backgroundColor: colors.beige }}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${colors.terracotta}20` }}
              >
                <FaDollarSign 
                  className="text-sm" 
                  style={{ color: colors.terracotta }} 
                />
              </div>
              <div>
                <p className="text-xs text-gray-500">Price</p>
                <p 
                  className="font-bold text-base" 
                  style={{ color: colors.darkGray }}
                >
                  {hotel?.price || "N/A"}
                </p>
              </div>
            </div>

            {/* View Details Arrow */}
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.terracotta }}
            >
              <span className="text-white font-bold">→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HotelCardItem