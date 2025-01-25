import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { FaMapMarkedAlt, FaWallet, FaClock, FaUserCheck } from 'react-icons/fa';

function Hero() {
  return (
    <div className="flex flex-col items-center px-5 md:mx-56 gap-9">
      {/* Title Section */}
      <h1 className="font-extrabold text-4xl md:text-[60px] text-center mt-16 leading-tight">
        <span className="text-[#f56551]"> Discover Your Next Adventure with AI: </span> 
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-base md:text-xl text-gray-500 text-center">
        Your Personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>

      {/* Button */}
      <Link to={'/create-trip'}>
        <Button className="px-6 py-3 text-sm md:text-base">Get Started, It's Free</Button>
      </Link>

      {/* Feature Highlights Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-20 w-full">
        <div className="flex flex-col items-center text-center px-4">
          <FaMapMarkedAlt className="text-[#f56551] text-5xl mb-3" />
          <h3 className="font-semibold text-lg md:text-xl">Tailored Itineraries</h3>
          <p className="text-sm md:text-base text-gray-600">
            Get personalized trip plans that match your preferences and travel goals.
          </p>
        </div>
        <div className="flex flex-col items-center text-center px-4">
          <FaWallet className="text-[#f56551] text-5xl mb-3" />
          <h3 className="font-semibold text-lg md:text-xl">Budget-Friendly</h3>
          <p className="text-sm md:text-base text-gray-600">
            Enjoy trips that are designed to fit your budget without compromise.
          </p>
        </div>
        <div className="flex flex-col items-center text-center px-4">
          <FaClock className="text-[#f56551] text-5xl mb-3" />
          <h3 className="font-semibold text-lg md:text-xl">Save Time</h3>
          <p className="text-sm md:text-base text-gray-600">
            Plan your trips effortlessly with AI doing the heavy lifting for you.
          </p>
        </div>
        <div className="flex flex-col items-center text-center px-4">
          <FaUserCheck className="text-[#f56551] text-5xl mb-3" />
          <h3 className="font-semibold text-lg md:text-xl">Trusted by Travelers</h3>
          <p className="text-sm md:text-base text-gray-600">
            Join a community of satisfied travelers who love their custom trips.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
