'use client';
import Link from "next/link";
import Image from "next/image";
import Swipeable from 'react-tinder-card';

const processSwipe = (cb: Function) => {
  cb(true);
}

interface Dish {
  id: string;
  place: string;
  location: string;
  image: string;
  cb: Function;
}

const DishCard = ({place, location, image, cb}: Dish) => {
  return <Swipeable
    onCardLeftScreen={() => processSwipe(cb)}
    className="h-full text-white font-bold text-4xl absolute top-0 left-0 w-full"
  >
    <div
      className="bg-cover rounded-lg h-full flex flex-col items-center justify-end top-0 left-0 w-full"
      style={{ backgroundImage: `url(${image})` }}
    >
      <Link href={location} target="_blank" className="flex flex-row gap-x-2">
        <Image src="/icons/location.svg" alt="location" width={40} height={40} />
        <h2 className="m-5 drop-shadow-md">{place}</h2>
      </Link>
    </div>
  </Swipeable>
}
export default DishCard;
