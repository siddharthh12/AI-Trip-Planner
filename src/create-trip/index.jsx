import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { chatSession } from '@/service/AIModel';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';




function CreateTrip() {
  const [place, setPlace]=useState();
  const [formData, setFormData]=useState([]);
  const [openDialog, setOpenDialog]=useState(false);

  const [loading, setLoading]=useState(false);

  const navigate=useNavigate();

  const handleInputChange=(name,value)=>{
    setFormData({
      ...formData,
      [name]:value
    })
  }

  useEffect(()=>{
    console.log(formData)
  },[formData])

  

  const OnGenerateTrip=async()=>{

    const user=localStorage.getItem('user');
    if(!user)
    {
      setOpenDialog(true)
      return;
    }

    if(formData?.noOdDays>5&&!formData?.location||!formData?.budget||!formData?.traveler)
    {
      toast("Please fill all details")
      return;
    }
    setLoading(true);
    const FINAL_PROMPT=AI_PROMPT
    .replace('{location}',formData?.location?.label)
    .replace('{totalDays}',formData?.noOdDays)
    .replace('{traveler}',formData?.traveler)
    .replace('{budget}',formData?.budget)
    .replace('{totalDays}',formData?.noOdDays)
    
    //above and below console.log is will create promt which then we will pass it to ai model

    // here we are passing the prompt to ai model which we created above
    const result=await chatSession.sendMessage(FINAL_PROMPT)

    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text())
  }

  const SaveAiTrip=async(TripData)=>{
    setLoading(true)
    const user=JSON.parse(localStorage.getItem('user'));
    const docId=Date.now().toString();
    await setDoc(doc(db, "AITrip", docId), {
      userSelection:formData,
      tripData:JSON.parse(TripData),
      userEmail:user?.email,
      id:docId
    });
    setLoading(false);
    navigate('/view-trip/' + docId)
  }

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Login successful:", tokenResponse);
      GetUserProfile(tokenResponse); // Call GetUserProfile with the token response
    },
    onError: (error) => console.error("Login failed:", error),
  });
  
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'application/json',
        },
      })
      .then((response) => {
        console.log("User profile:", response.data); // Log user data
        localStorage.setItem('user', JSON.stringify(response.data));
        setOpenDialog(false);
        OnGenerateTrip(); // Call the function to generate the trip after signing in
      })
      .catch((error) => {
        console.error("Failed to fetch user profile:", error);
      });
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🌴🏕️</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

      <div className='mt-20 flex flex-col gap-10'>
        <div >
        <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
        <GooglePlacesAutocomplete
        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
        selectProps={{
          place,
          onChange:(v)=>{setPlace(v); handleInputChange('location', v)}
        }}
        />
        </div>

        <div>
        <h2 className='text-xl my-3 font-medium'>How many days are you Planning Trip?</h2>
        <Input placeholder={'Ex. 3'} type="number"
        onChange={(e)=>handleInputChange('noOfDays', e.target.value)}
        />
        </div>

      

      <div>
      <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
      <div className='grid grid-cols-3 gap-5 mt-5'>
        {SelectBudgetOptions.map((item,index)=>(
          <div key={index}
          onClick={()=>handleInputChange('budget', item.title)}
          className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
          ${formData?.budget==item.title&&'shadow-lg border-black'}
          `}> 
          <h2 className='text-4xl'>{item.icon}</h2>
          <h2 className='font-bold text-lg'>{item.title}</h2>
          <h2 className='text-sm text-gray-500'>{item.desc}</h2>
           </div>
        ))}
      </div>
      </div>
      
      <div>
      <h2 className='text-xl my-3 font-medium'>Who do you plan to traveling with on your next adventure?</h2>
      <div className='grid grid-cols-3 gap-5 mt-5'>
        {SelectTravelsList.map((item,index)=>(
          <div key={index} 
          onClick={()=>handleInputChange('traveler', item.people)}
          className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
           ${formData?.traveler==item.people&&'shadow-lg border-black'}
          `}> 
          <h2 className='text-4xl'>{item.icon}</h2>
          <h2 className='font-bold text-lg'>{item.title}</h2>
          <h2 className='text-sm text-gray-500'>{item.desc}</h2>
           </div>
        ))}
      </div>
      </div>

      </div>

      <div className='my-10 justify-end flex'>
        <Button disabled={loading} onClick={OnGenerateTrip}>{loading? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/>: 'Generate Trip' }</Button>
      </div>

      <Dialog open={openDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogDescription>
        <img src="/logo.svg"/>
        <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
        <p>Sign In to the App with Google authentication securly</p>

        <Button onClick={login} className="w-full mt-5 flex gap-4 items-center"> <FcGoogle className='h-7 w-7'/> Sign In WIth Google </Button> 
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>


    </div>
  )
}

export default CreateTrip
