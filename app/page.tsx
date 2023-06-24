"use client";

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const TinderCard = dynamic(() => import('react-tinder-card'), { ssr: false });

import { getImages, saveSwipe } from '../support/lambda'

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  .replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, 
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

export default function Page() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [user_uuid, setUserUUID] = useState('')
  
 
  const fetchImages = async () => {
    setLoading(true)
    const response = await getImages(user_uuid);

    const data = response.map((item: any) => ({
        post_id: item.id.S,
        image: item.secure_url.S,
        caption: item.caption.S,
      }))

    setImages(data)
    setLoading(false)
  }

  const setUserHelper = () => {
    const stored = localStorage.getItem('@lup_uuid')
    
    if (!stored) {
      localStorage.setItem('@lup_uuid', uuidv4())
    }

    setUserUUID(localStorage.getItem('@lup_uuid') as string)
  }

  const swipeHandler = async (post_id:string, swipe: string, index: number) => {
    if (index === 0) {
      fetchImages()
    }

    await saveSwipe(post_id, user_uuid, swipe)
  }

  useEffect(() => {
    if (user_uuid) {
      fetchImages()
    }
  }, [user_uuid])

  useEffect(() => {
    setUserHelper()
  }, [])

  if (loading) {
    return "loading..."
  }

  return <div className="h-full relative overflow-hidden w-full">
    {
      !images.length &&
        <div className="bg-cover rounded-lg bg-pink-300 h-full flex flex-col items-center justify-center top-0 left-0 w-full">
          <h3 className="text-pink-500 text-xl font-semibold mb-5 mx-5 text-center">
            Ya te acabaste las opciones.
          </h3>
          <Image src="/icons/sad.svg" alt="" aria-hidden width={100} height={100} />
        </div>
    }
    <div>
      {images.map((dish:any, i: number) => (<TinderCard
        key={dish.post_id}
        onSwipe={(direction: string) => swipeHandler(dish.post_id, direction, i)}
        className="h-full absolute top-0 left-0 w-full rounded-lg overflow-hidden"
      >
        <div
          className="bg-cover h-full flex flex-col items-center justify-end top-0 left-0 w-full"
          style={{ backgroundImage: `url(${dish.image})` }}
        >
          <div className="bg-gradient-to-t from-black to-transparent opacity-50 absolute h-32 bottom-0 w-full"></div>
          <div className="bg-gradient-to-t from-black to-transparent absolute h-5 bottom-0 w-full z-20"></div>
          <p className="overflow-scroll max-h-32 text-white z-10 px-4">{dish.caption}</p>
        </div>
      </TinderCard>))}
    </div>
  </div>
}
