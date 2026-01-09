import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';
import { db } from '@/service/firebaseConfig';
import { FaPlane, FaRoute } from 'react-icons/fa';

// Color palette
const colors = {
  terracotta: '#B25E39',
  darkGray: '#473D3A',
  beige: '#F3F3F3'
};

function MyTrips() {
    const navigate = useNavigate();

    const [userTrips, setUserTrips] = useState([])

    useEffect(() => {
        GetUserTrips();
    }, [])

    /**
     * used to get all user trips
     * @returns 
     */

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/');
            return;
        }
        const q = query(collection(db, 'AITrip'), where('userEmail', '==', user?.email))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setUserTrips(prevVal => [...prevVal, doc.data()])
        });
    }

    return (
        <div className='min-h-screen' style={{ backgroundColor: colors.beige }}>
            <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 py-10'>
                
                {/* Header Section */}
                <div className='bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-10'>
                    <div className='flex items-center gap-4 mb-4'>
                        <div 
                            className='w-16 h-16 rounded-full flex items-center justify-center'
                            style={{ backgroundColor: `${colors.terracotta}20` }}
                        >
                            <FaRoute className='text-3xl' style={{ color: colors.terracotta }} />
                        </div>
                        <div>
                            <h2 className='font-bold text-3xl md:text-5xl' style={{ color: colors.darkGray }}>
                                My Trips
                            </h2>
                            <p className='text-gray-600 mt-1'>
                                {userTrips?.length > 0 
                                    ? `You have ${userTrips.length} trip${userTrips.length > 1 ? 's' : ''} planned` 
                                    : 'Start planning your first adventure'}
                            </p>
                        </div>
                    </div>

                    {/* Stats Section */}
                    {userTrips?.length > 0 && (
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 p-6 rounded-2xl' style={{ backgroundColor: colors.beige }}>
                            <div className='text-center'>
                                <div className='text-3xl font-bold' style={{ color: colors.terracotta }}>
                                    {userTrips.length}
                                </div>
                                <div className='text-sm text-gray-600 mt-1'>Total Trips</div>
                            </div>
                            <div className='text-center'>
                                <div className='text-3xl font-bold' style={{ color: colors.terracotta }}>
                                    {userTrips.reduce((acc, trip) => acc + (parseInt(trip.userSelection?.noOfDays) || 0), 0)}
                                </div>
                                <div className='text-sm text-gray-600 mt-1'>Days Planned</div>
                            </div>
                            <div className='text-center col-span-2 md:col-span-1'>
                                <div className='text-3xl font-bold' style={{ color: colors.terracotta }}>
                                    {new Set(userTrips.map(trip => trip.userSelection?.location?.label)).size}
                                </div>
                                <div className='text-sm text-gray-600 mt-1'>Destinations</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Trips Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {userTrips?.length > 0 ? userTrips.map((trip, index) => (
                        <UserTripCardItem trip={trip} key={index} />
                    ))
                    : [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div 
                            key={index} 
                            className='h-[280px] w-full rounded-2xl animate-pulse shadow-md'
                            style={{ backgroundColor: '#E5E7EB' }}
                        >
                            {/* Skeleton Card */}
                            <div className='p-6 h-full flex flex-col justify-between'>
                                <div>
                                    <div className='h-6 bg-gray-300 rounded-lg mb-3 w-3/4'></div>
                                    <div className='h-4 bg-gray-300 rounded-lg mb-2 w-full'></div>
                                    <div className='h-4 bg-gray-300 rounded-lg w-2/3'></div>
                                </div>
                                <div className='space-y-2'>
                                    <div className='h-4 bg-gray-300 rounded-lg w-1/2'></div>
                                    <div className='h-10 bg-gray-300 rounded-lg w-full'></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State - Only shows when loading is complete and no trips exist */}
                {userTrips?.length === 0 && (
                    <div className='bg-white rounded-3xl shadow-lg p-12 text-center mt-10'>
                        <div 
                            className='w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6'
                            style={{ backgroundColor: `${colors.terracotta}20` }}
                        >
                            <FaPlane className='text-5xl' style={{ color: colors.terracotta }} />
                        </div>
                        <h3 className='font-bold text-2xl mb-3' style={{ color: colors.darkGray }}>
                            No trips yet
                        </h3>
                        <p className='text-gray-600 mb-6 max-w-md mx-auto'>
                            Start planning your first adventure and create unforgettable memories!
                        </p>
                        <button 
                            onClick={() => navigate('/create-trip')}
                            className='px-8 py-4 text-lg font-semibold text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
                            style={{ backgroundColor: colors.terracotta }}
                        >
                            Plan Your First Trip
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyTrips