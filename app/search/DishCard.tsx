'use client';
import { useEffect } from 'react';
import dynamic from "next/dynamic";
import { getUserId } from "./Session";
const Swipeable = dynamic(() => import('react-tinder-card'), {
  ssr: false
});

interface Dish {
  postId: string;
  caption: string;
  image: string;
}

const DishCard = ({ postId, caption, image}: Dish) => {

  const processSwipe = (direction: string) => {
    const userId = getUserId();

    console.log(`${direction}, ${userId}, ${postId}`);
  }

  return <Swipeable
    onCardLeftScreen={processSwipe}
    className="h-full absolute top-0 left-0 w-full rounded-lg overflow-hidden"
  >
    <div
      className="bg-cover h-full flex flex-col items-center justify-end top-0 left-0 w-full"
      style={{ backgroundImage: `url(${image})` }}
    >
      <p>{postId}</p>
      <div className="bg-gradient-to-t from-black to-transparent opacity-50 absolute h-32 bottom-0 w-full"></div>
      <div className="bg-gradient-to-t from-black to-transparent absolute h-5 bottom-0 w-full z-20"></div>
      <p className="overflow-scroll max-h-32 text-white z-10 px-4">{caption}</p>
    </div>
  </Swipeable>
}
export default DishCard;
