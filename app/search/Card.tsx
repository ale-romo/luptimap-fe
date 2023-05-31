'use client';
import Link from "next/link";
import dynamic from "next/dynamic";
const Swipeable = dynamic(() => import('react-tinder-card'), {
  ssr: false
});

interface Card {
  caption: string;
  image: string;
  cb: Function;
}

const Card = ({caption, image, cb}: Card) => {

  const processSwipe = (direction: string) => {
    cb(direction);
  }

  return <Swipeable
    onCardLeftScreen={processSwipe}
    className="h-full text-white font-bold text-4xl absolute top-0 left-0 w-full"
  >
    <div
      className="bg-cover rounded-lg h-full flex flex-col items-center justify-end top-0 left-0 w-full"
      style={{ backgroundImage: `url(${image})` }}
    >
      <h2 className="m-5 drop-shadow-md">{caption}</h2>
    </div>
  </Swipeable>
}
export default Card;
