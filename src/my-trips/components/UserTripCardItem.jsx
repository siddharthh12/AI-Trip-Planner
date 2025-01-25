import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        if (trip) GetPlacePhoto();
    }, [trip]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label,
        };

        await GetPlaceDetails(data).then((resp) => {
            if (resp?.data?.places?.[0]?.photos?.[3]?.name) {
                const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
                setPhotoUrl(PhotoUrl);
            }
        });
    };

    return (
        <Link to={'/view-trip/' + trip?.id} className="block">
            <div className="bg-white shadow-md hover:shadow-lg transition-all rounded-lg overflow-hidden">
                {/* Image Container */}
                <div className="h-[200px] md:h-[250px] w-full overflow-hidden">
                    <img
                        src={photoUrl ? photoUrl : "/placeholder.jpg"}
                        className="w-full h-full object-cover"
                        alt={trip?.userSelection?.location?.label || "Trip"}
                    />
                </div>

                {/* Card Content */}
                <div className="p-4 flex flex-col items-start">
                    <h2 className="font-bold text-lg md:text-xl text-gray-800">
                        {trip?.userSelection?.location?.label || "Trip Location"}
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 mt-2">
                        {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default UserTripCardItem;
