'use client';
import {useState } from 'react';
import Image from 'next/image';
import DishCard from './DishCard';

const initialDishes = [
  {
    id: '1',
    place: 'Luptico',
    location: 'https://www.google.com/maps/place/Luptico/@32.0283518,-116.6329344,17z/data=!4m14!1m7!3m6!1s0x80d8ef67deb1d7c5:0x6d974c150ea65365!2sLuptico!8m2!3d32.0283518!4d-116.6329344!16s%2Fg%2F11s764rb3d!3m5!1s0x80d8ef67deb1d7c5:0x6d974c150ea65365!8m2!3d32.0283518!4d-116.6329344!16s%2Fg%2F11s764rb3d?hl=en',
    description: 'Comidita rica',
    image: 'https://www.comedera.com/wp-content/uploads/2022/08/Ceviche-de-camarones-ecuatoriano-shutterstock_1997166494.jpg',
  },
  {
    id: '2',
    place: 'Luptico2',
    location: 'https://www.google.com/maps/place/Luptico/@32.0283518,-116.6329344,17z/data=!4m14!1m7!3m6!1s0x80d8ef67deb1d7c5:0x6d974c150ea65365!2sLuptico!8m2!3d32.0283518!4d-116.6329344!16s%2Fg%2F11s764rb3d!3m5!1s0x80d8ef67deb1d7c5:0x6d974c150ea65365!8m2!3d32.0283518!4d-116.6329344!16s%2Fg%2F11s764rb3d?hl=en',
    description: 'Comidita rica',
    image: 'https://www.comedera.com/wp-content/uploads/2022/08/Ceviche-de-camarones-ecuatoriano-shutterstock_1997166494.jpg',
  },
  {
    id: '3',
    place: 'Luptico3',
    location: 'https://www.google.com/maps/place/Luptico/@32.0283518,-116.6329344,17z/data=!4m14!1m7!3m6!1s0x80d8ef67deb1d7c5:0x6d974c150ea65365!2sLuptico!8m2!3d32.0283518!4d-116.6329344!16s%2Fg%2F11s764rb3d!3m5!1s0x80d8ef67deb1d7c5:0x6d974c150ea65365!8m2!3d32.0283518!4d-116.6329344!16s%2Fg%2F11s764rb3d?hl=en',
    description: 'Comidita rica',
    image: 'https://www.comedera.com/wp-content/uploads/2022/08/Ceviche-de-camarones-ecuatoriano-shutterstock_1997166494.jpg',
  },
];

const Search = () => {
  const [dishes, setDishes] = useState(initialDishes.reverse());

  const getMoreDishes = () => {
    // const moreDishes = [
    //   {
    //     id: '4',
    //     place: 'Luptico3',
    //     location: 'https://www.google.com/maps/place/Luptico/@32.0283518,-116.6329344,17z/data=!4m14!1m7!3m6!1s0x80d8ef67deb1d7c5:0x6d974c150ea65365!2sLuptico!8m2!3d32.0283518!4d-116.6329344!16s%2Fg%2F11s764rb3d!3m5!1s0x80d8ef67deb1d7c5:0x6d974c150ea65365!8m2!3d32.0283518!4d-116.6329344!16s%2Fg%2F11s764rb3d?hl=en',
    //     description: 'Comidita rica',
    //     image: 'https://www.comedera.com/wp-content/uploads/2022/08/Ceviche-de-camarones-ecuatoriano-shutterstock_1997166494.jpg',
    //   },
    //   {
    //     id: '5',
    //     place: 'Luptico4',
    //     location: 'https://www.google.com/maps/place/Luptico/@32.0283518,-116.6329344,17z/data=!4m14!1m7!3m6!1s0x80d8ef67deb1d7c5:0x6d974c150ea65365!2sLuptico!8m2!3d32.0283518!4d-116.6329344!16s%2Fg%2F11s764rb3d!3m5!1s0x80d8ef67deb1d7c5:0x6d974c150ea65365!8m2!3d32.0283518!4d-116.6329344!16s%2Fg%2F11s764rb3d?hl=en',
    //     description: 'Comidita rica',
    //     image: 'https://www.comedera.com/wp-content/uploads/2022/08/Ceviche-de-camarones-ecuatoriano-shutterstock_1997166494.jpg',
    //   },
    // ];
    // setDishes([...dishes, ...moreDishes]);
    // console.log(dishes);
  }

  const updateDishes = (direction: string) => {
    console.log(direction)
    // dishes.pop();
    // if (dishes.length < 2) getMoreDishes();
  };

  return <div className="h-full relative overflow-hidden w-full">
    <div className="bg-cover rounded-lg bg-pink-300 h-full flex flex-col items-center justify-center top-0 left-0 w-full">
      <h3 className="text-pink-500 text-xl font-semibold mb-5 mx-5 text-center">
        Ya te acabaste las opciones.
      </h3>
      <Image src="/icons/sad.svg" alt="" aria-hidden width={100} height={100} />
    </div>
    {dishes.length && dishes.map((dish, i) => {
      return <DishCard key={i} {...dish} cb={updateDishes}/>
    })}
  </div>
}
export default Search;
