import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { FaMapMarkerAlt, FaClock, FaExternalLinkAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

// Color palette
const colors = {
  terracotta: '#B25E39',
  darkGray: '#473D3A',
  beige: '#F3F3F3'
};

function PlaceCardItem({place}) {

    const [photoUrl, setPhotoUrl] = useState()
    
    useEffect(() => {
      place && GetPlacePhoto();
    }, [place])

    const GetPlacePhoto = async () => {
      const data = {
        textQuery: place.placeName
      }

      const result = await GetPlaceDetails(data).then(resp => {
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
        setPhotoUrl(PhotoUrl)
      })
    }

  return (
    <Link 
      to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName}  
      target="_blank"
      className="block"
    >
      <div 
        className='rounded-xl p-4 flex gap-4 hover:shadow-lg transition-all duration-300 cursor-pointer group'
        style={{ backgroundColor: colors.beige }}
      >
        {/* Image Section */}
        <div className="relative flex-shrink-0 overflow-hidden rounded-xl">
          <img 
            src={photoUrl ? photoUrl : "/placeholder.jpg"} 
            className='w-[120px] h-[120px] object-cover transition-transform duration-300 group-hover:scale-110'
            alt={place?.placeName}
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <FaExternalLinkAlt className="text-white text-2xl" />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            {/* Place Name */}
            <h2 
              className='font-bold text-base md:text-lg mb-2 line-clamp-1 group-hover:underline' 
              style={{ color: colors.darkGray }}
            >
              {place.placeName}
            </h2>
            
            {/* Place Details */}
            <p className='text-sm text-gray-600 line-clamp-2 mb-3'>
              {place.placeDetails}
            </p>
          </div>

          {/* Bottom Info */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            {/* Time Travel */}
            <div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ backgroundColor: 'white' }}
            >
              <FaClock className="text-sm" style={{ color: colors.terracotta }} />
              <span className="text-sm font-medium" style={{ color: colors.darkGray }}>
                {place.timeTravel}
              </span>
            </div>

            {/* Map Button */}
            <div 
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all duration-300 group-hover:scale-105"
              style={{ backgroundColor: colors.terracotta }}
            >
              <FaMapMarkerAlt className="text-sm text-white" />
              <span className="text-sm font-semibold text-white">View Map</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PlaceCardItem