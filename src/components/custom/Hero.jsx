import React, { useState } from 'react';
import { FaMapMarkedAlt, FaWallet, FaClock, FaUserCheck, FaCompass, FaHeart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Note: In your actual React Router setup, replace this with:
// import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate();
// onClick={() => navigate('/create-trip')}

// Color palette from the image
const colors = {
  cream: '#FFFFFF',
  beige: '#F3F3F3',
  terracotta: '#B25E39',
  darkGray: '#473D3A'
};

function Hero() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Handle navigation to create trip page
  const handleGetStarted = () => {
    // For demo purposes, showing an alert
    // In your actual app, use: navigate('/create-trip')
    alert('Navigating to Create Trip page...');
    console.log('Navigate to /create-trip');
    // window.location.href = '/create-trip'; // Alternative if not using React Router
  };

  const testimonials = [
    {
      name: "Sarah Mitchell",
      location: "New York, USA",
      text: "This AI planner transformed our Italy trip into an unforgettable experience. Every detail was perfect!",
      rating: 5
    },
    {
      name: "David Chen",
      location: "Singapore",
      text: "I saved hours of research time. The personalized itinerary matched my budget and interests perfectly.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      text: "As a solo traveler, having a custom plan gave me confidence. Highly recommend!",
      rating: 5
    }
  ];

  const travelStyles = [
    { title: "Off the Beaten Path", image: "🏔️", desc: "Explore hidden gems away from tourist crowds" },
    { title: "Outdoor Adventure", image: "⛰️", desc: "Thrilling activities in nature's playground" },
    { title: "Cultural & Culinary", image: "🍝", desc: "Immerse in local traditions and flavors" },
    { title: "Relaxation & Wellness", image: "🧘", desc: "Rejuvenate your mind and body" }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="flex flex-col items-center px-5 md:px-20 lg:px-56 gap-9 py-16">
        <h1 className="font-extrabold text-4xl md:text-[60px] text-center mt-8 leading-tight">
          <span style={{ color: colors.terracotta }}>Discover Your Next Adventure with AI:</span>
          <br />
          <span style={{ color: colors.darkGray }}>Personalized Itineraries at Your Fingertips</span>
        </h1>
        <p className="text-base md:text-xl text-gray-600 text-center max-w-3xl">
          Your Personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
        </p>

<Link to="/create-trip">

        <button 
          className="px-8 py-4 text-base md:text-lg font-semibold text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          style={{ backgroundColor: colors.terracotta }}
        >
          Get Started, It's Free
        </button>
</Link>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 w-full">
          {[
            { icon: FaMapMarkedAlt, title: "Tailored Itineraries", desc: "Get personalized trip plans that match your preferences and travel goals." },
            { icon: FaWallet, title: "Budget-Friendly", desc: "Enjoy trips that are designed to fit your budget without compromise." },
            { icon: FaClock, title: "Save Time", desc: "Plan your trips effortlessly with AI doing the heavy lifting for you." },
            { icon: FaUserCheck, title: "Trusted by Travelers", desc: "Join a community of satisfied travelers who love their custom trips." }
          ].map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center px-4 py-6 rounded-lg hover:shadow-lg transition-shadow duration-300" style={{ backgroundColor: colors.beige }}>
              <feature.icon className="text-5xl mb-4" style={{ color: colors.terracotta }} />
              <h3 className="font-semibold text-lg md:text-xl mb-2" style={{ color: colors.darkGray }}>{feature.title}</h3>
              <p className="text-sm md:text-base text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Styles Section */}
      <div className="py-20 px-5 md:px-20 lg:px-56" style={{ backgroundColor: colors.beige }}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: colors.darkGray }}>
            Our Travel Styles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your adventure style and let AI craft the perfect journey for you
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {travelStyles.map((style, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="text-5xl mb-4 text-center">{style.image}</div>
              <h3 className="font-bold text-xl mb-3 text-center" style={{ color: colors.darkGray }}>
                {style.title}
              </h3>
              <p className="text-gray-600 text-center text-sm">{style.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 px-5 md:px-20 lg:px-56">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: colors.darkGray }}>
            How It Works
          </h2>
          <p className="text-lg text-gray-600">Three simple steps to your perfect trip</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { step: "01", title: "Share Your Preferences", desc: "Tell us your destination, budget, travel dates, and interests", icon: FaCompass },
            { step: "02", title: "AI Creates Your Plan", desc: "Our intelligent system crafts a personalized itinerary just for you", icon: FaStar },
            { step: "03", title: "Start Exploring", desc: "Get your detailed trip plan and embark on your adventure", icon: FaHeart }
          ].map((item, idx) => (
            <div key={idx} className="text-center relative">
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                style={{ backgroundColor: colors.terracotta }}
              >
                <item.icon />
              </div>
              <div 
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 text-6xl font-bold opacity-10"
                style={{ color: colors.terracotta }}
              >
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.darkGray }}>
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 px-5 md:px-20 lg:px-56" style={{ backgroundColor: colors.beige }}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: colors.darkGray }}>
            What Travelers Say
          </h2>
          <p className="text-lg text-gray-600">Real experiences from real adventurers</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex justify-center mb-4">
              {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                <FaStar key={i} className="text-2xl mx-1" style={{ color: colors.terracotta }} />
              ))}
            </div>
            <p className="text-xl md:text-2xl text-gray-700 text-center mb-6 italic">
              "{testimonials[activeTestimonial].text}"
            </p>
            <div className="text-center">
              <p className="font-bold text-lg" style={{ color: colors.darkGray }}>
                {testimonials[activeTestimonial].name}
              </p>
              <p className="text-gray-500">{testimonials[activeTestimonial].location}</p>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{ 
                  backgroundColor: activeTestimonial === idx ? colors.terracotta : '#D1D5DB'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-5 md:px-20 lg:px-56">
        <div 
          className="rounded-3xl p-12 md:p-16 text-center shadow-2xl"
          style={{ backgroundColor: colors.darkGray }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Plan Your Dream Trip?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who've discovered smarter, more personalized ways to explore the world
          </p>
          <Link to="/create-trip">

          <button 
            className="px-10 py-5 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            style={{ backgroundColor: colors.terracotta, color: 'white' }}
          >
            Start Planning Now
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
