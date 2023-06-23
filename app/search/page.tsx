"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import { v4 as uuidv4 } from 'uuid';

import { getImages, saveSwipe } from '../../support/lambda'


export default function Page() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  const user_uuid = localStorage.getItem('@lup_uuid') ? localStorage.getItem('@lup_uuid') as string: uuidv4()
 
  const fetchImages = async () => {
    setLoading(true)
    const response = await getImages(user_uuid);

    const data = response.map((item: any) => ({
        post_id: item.id,
        image: item.secure_url,
        caption: item.caption,
      }))

    setImages(data)
    setLoading(false)
  }

  const swipe = async (post_id:string, direction: string, index: number) => {
    if (index === 0) {
      fetchImages()
    }

    await saveSwipe(post_id, direction, user_uuid)
  }

  useEffect(() => {
    fetchImages()
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
        onSwipe={(direction: string) => swipe(dish.post_id, direction, i)}
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
