import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";


function InfoSection({ trip }) {


    const locationLabel = trip?.userSelection?.location?.label ;
    const noOfDays = trip?.userSelection?.noOfDays || "Not specified";
    const budget = trip?.userSelection?.budget || "Not specified";
    const noOfTraveller = trip?.userSelection?.traveler || "Not specified";

    const [photoUrl,setPhotoUrl]=useState()

    useEffect(()=>{
      trip&&GetPlacePhoto();
    },[trip])

    const GetPlacePhoto=async()=>{
      const data={
        textQuery:trip?.userSelection?.location?.label
      }

      const result=await GetPlaceDetails(data).then(resp=>{
        console.log(resp.data.places[0].photos[3].name);

        const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
        setPhotoUrl(PhotoUrl)
      })
    }
  
    return (
      <div>
        <img src={photoUrl} className="h-[340px] w-full object-cover rounded-xl" />

        <div className='flex justify-between items-center'>

        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>Location: {locationLabel}</h2>
          <div className='flex gap-5'>

          <h2 className='p-1 px-3 bg-gray-200 rounded-lg text-gray-500 text-sx md:text-md'>📅 Number of Days: {noOfDays}</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-lg text-gray-500 text-sx md:text-md'>💰 Number of Budget: {budget}</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-lg text-gray-500 text-sx md:text-md'>🥂 Number of Traveller: {noOfTraveller}</h2>
          </div>

        </div>
        <Button><IoIosSend />
        </Button>
        </div>
        
      </div>
    );
  }
  
  export default InfoSection;
  