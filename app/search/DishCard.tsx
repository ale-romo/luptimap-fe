'use client';

import { getUserId } from "./Session";
import Swipeable from 'react-tinder-card';

interface Swipe {
  uuid: string;
  id: string;
  swipe:boolean;
}

async function postJSON(data: Swipe) {
  try {
    const response = await fetch('https://api.luptico.com/.netlify/functions/swipe', {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

interface Dish {
  postId: string;
  caption: string;
  image: string;
}

const DishCard = ({ postId, caption, image}: Dish) => {

  const processSwipe = async (direction: string) => {
    const userId = getUserId();
    if (userId) {
      const data = {
        uuid: userId,
        id: postId,
        swipe: Boolean(direction === 'right')
      }
      const confirm = await postJSON(data);
      console.log(confirm);
    }
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
