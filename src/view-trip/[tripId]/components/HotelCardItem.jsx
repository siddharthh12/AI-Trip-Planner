import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



function HotelCardItem({hotel}) {

    const [photoUrl,setPhotoUrl]=useState()
    
        useEffect(()=>{
          hotel&&GetPlacePhoto();
        },[hotel])
    
        const GetPlacePhoto=async()=>{
          const data={
            textQuery:hotel?.hotelName
          }
    
          const result=await GetPlaceDetails(data).then(resp=>{
            console.log(resp.data.places[0].photos[3].name);
    
            const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl)
          })
        }

  return (
    <div>
      <Link to={'https://www.google.com/maps/search/?api=1&query=' +hotel?.hotelName+"," + hotel?.hotelAddress} target="_blank" > 
            <div className="hover:scale-105 transition-all cursor-pointer">
              <img
                src={photoUrl}
                className="rounded-xl w-full h-40 object-cover"
                alt={hotel?.hotelName || "Hotel"}
              />
              <div className="my-2 flex flex-col gap-2">
                <h2 className="font-medium">{hotel?.hotelName || "Hotel Name"}</h2>
                <h2 className="text-xs text-gray-500">
                  📍 {hotel?.hotelAddress || "Address not available"}
                </h2>
                <h2 className="text-sm">💰 {hotel.price || "N/A"}</h2>
                <h2 className="text-sm">⭐ {hotel.rating || "No rating"}</h2>
              </div>
            </div>
            </Link>
    </div>
  )
}

export default HotelCardItem
