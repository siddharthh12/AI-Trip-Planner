import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";
import { FaMapMarkerAlt, FaCalendarAlt, FaWallet, FaUsers } from 'react-icons/fa';

// Color palette
const colors = {
  terracotta: '#B25E39',
  darkGray: '#473D3A',
  beige: '#F3F3F3'
};

function InfoSection({ trip }) {

    const locationLabel = trip?.userSelection?.location?.label;
    const noOfDays = trip?.userSelection?.noOfDays || "Not specified";
    const budget = trip?.userSelection?.budget || "Not specified";
    const noOfTraveller = trip?.userSelection?.traveler || "Not specified";

    const [photoUrl, setPhotoUrl] = useState()

    useEffect(() => {
      trip && GetPlacePhoto();
    }, [trip])

    const GetPlacePhoto = async () => {
      const data = {
        textQuery: trip?.userSelection?.location?.label
      }

      const result = await GetPlaceDetails(data).then(resp => {
        console.log(resp.data.places[0].photos[3].name);

        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
        setPhotoUrl(PhotoUrl)
      })
    }
  
    return (
      <div className="mb-10">
        {/* Hero Image with Overlay */}
        <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl mb-8">
          <img 
            src={photoUrl} 
            className="h-full w-full object-cover" 
            alt={locationLabel}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          
          {/* Location Title on Image */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <FaMapMarkerAlt className="text-2xl text-white" />
              </div>
              <h2 className="font-bold text-3xl md:text-4xl text-white drop-shadow-lg">
                {locationLabel}
              </h2>
            </div>
          </div>
        </div>

        {/* Trip Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            
            {/* Trip Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 w-full">
              
              {/* Days */}
              <div 
                className="p-4 rounded-xl flex items-center gap-3"
                style={{ backgroundColor: colors.beige }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${colors.terracotta}20` }}
                >
                  <FaCalendarAlt className="text-xl" style={{ color: colors.terracotta }} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 mb-1">Duration</p>
                  <p className="font-bold text-sm md:text-base truncate" style={{ color: colors.darkGray }}>
                    {noOfDays} {noOfDays === 1 ? 'Day' : 'Days'}
                  </p>
                </div>
              </div>

              {/* Budget */}
              <div 
                className="p-4 rounded-xl flex items-center gap-3"
                style={{ backgroundColor: colors.beige }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${colors.terracotta}20` }}
                >
                  <FaWallet className="text-xl" style={{ color: colors.terracotta }} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 mb-1">Budget</p>
                  <p className="font-bold text-sm md:text-base truncate" style={{ color: colors.darkGray }}>
                    {budget}
                  </p>
                </div>
              </div>

              {/* Travelers */}
              <div 
                className="p-4 rounded-xl flex items-center gap-3"
                style={{ backgroundColor: colors.beige }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${colors.terracotta}20` }}
                >
                  <FaUsers className="text-xl" style={{ color: colors.terracotta }} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 mb-1">Travelers</p>
                  <p className="font-bold text-sm md:text-base truncate" style={{ color: colors.darkGray }}>
                    {noOfTraveller}
                  </p>
                </div>
              </div>

            </div>

            {/* Share Button */}
            <Button 
              className="px-6 py-6 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 whitespace-nowrap"
              style={{ 
                backgroundColor: colors.terracotta,
                color: 'white'
              }}
            >
              <IoIosSend className="text-xl" />
              <span className="hidden sm:inline">Share Trip</span>
            </Button>

          </div>
        </div>
      </div>
    );
  }
  
  export default InfoSection;