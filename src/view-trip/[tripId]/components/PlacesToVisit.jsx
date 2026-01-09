import React from 'react';
import PlaceCardItem from './PlaceCardItem';
import { FaMapMarkedAlt, FaClock, FaCalendarDay } from 'react-icons/fa';

// Color palette
const colors = {
  terracotta: '#B25E39',
  darkGray: '#473D3A',
  beige: '#F3F3F3'
};

const PlacesToVisit = ({ trip }) => {
  const itinerary = trip?.tripData?.itinerary
    ? Object.entries(trip.tripData.itinerary)
    : [];

  return (
    <div className="my-10">
      {/* Section Header */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${colors.terracotta}20` }}
          >
            <FaMapMarkedAlt className="text-2xl" style={{ color: colors.terracotta }} />
          </div>
          <div>
            <h2 className="font-bold text-2xl md:text-3xl" style={{ color: colors.darkGray }}>
              Places to Visit
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Explore {itinerary.length} day{itinerary.length !== 1 ? 's' : ''} of amazing destinations
            </p>
          </div>
        </div>
      </div>

      {/* Itinerary Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {itinerary
          .sort(([a], [b]) => {
            const dayA = parseInt(a.replace("day", ""), 10);
            const dayB = parseInt(b.replace("day", ""), 10);
            return dayA - dayB;
          })
          .map(([day, details], index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md p-6">
              {/* Day Header */}
              <div className="mb-5">
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg"
                    style={{ backgroundColor: colors.terracotta }}
                  >
                    {index + 1}
                  </div>
                  <h3 
                    className="font-bold text-xl capitalize" 
                    style={{ color: colors.darkGray }}
                  >
                    {day.replace('day', 'Day ')}
                  </h3>
                </div>

                {/* Best Time to Visit */}
                <div 
                  className="flex items-center gap-2 p-3 rounded-xl"
                  style={{ backgroundColor: colors.beige }}
                >
                  <FaClock className="text-base" style={{ color: colors.terracotta }} />
                  <div>
                    <p className="text-xs text-gray-500">Best Time to Visit</p>
                    <p className="font-semibold text-sm" style={{ color: colors.darkGray }}>
                      {details.bestTimeToVisit}
                    </p>
                  </div>
                </div>
              </div>

              {/* Places List */}
              <div className="space-y-4">
                {details.places?.map((place, placeIndex) => (
                  <PlaceCardItem key={placeIndex} place={place} />
                ))}
              </div>

              {/* Places Count Badge */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <FaMapMarkedAlt style={{ color: colors.terracotta }} />
                  <span>
                    {details.places?.length || 0} place{details.places?.length !== 1 ? 's' : ''} to explore
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Empty State */}
      {itinerary.length === 0 && (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <div 
            className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4"
            style={{ backgroundColor: `${colors.terracotta}20` }}
          >
            <FaMapMarkedAlt className="text-4xl" style={{ color: colors.terracotta }} />
          </div>
          <h3 className="font-bold text-xl mb-2" style={{ color: colors.darkGray }}>
            No places added yet
          </h3>
          <p className="text-gray-600">
            Your itinerary will appear here once generated
          </p>
        </div>
      )}
    </div>
  );
};

export default PlacesToVisit;