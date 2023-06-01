import Image from 'next/image';
import DishCard from './DishCard';
import Session from './Session';

const getData = async () => {
  const res = await fetch('https://api.luptico.com/.netlify/functions/images');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const Search = async () => {
  const data = await getData();
  const dishes = data.Items.map((item: any) => {
    return {
      postId: item.id,
      image: item.secure_url,
      caption: item.caption,
    }
  });

  return <div className="h-full relative overflow-hidden w-full">
    <div className="bg-cover rounded-lg bg-pink-300 h-full flex flex-col items-center justify-center top-0 left-0 w-full">
      <h3 className="text-pink-500 text-xl font-semibold mb-5 mx-5 text-center">
        Ya te acabaste las opciones.
      </h3>
      <Image src="/icons/sad.svg" alt="" aria-hidden width={100} height={100} />
    </div>
    {dishes.length && dishes.map((dish:any, i: number) => {
      return <DishCard key={i} {...dish} />
    })}
    <Session />
  </div>
}
export default Search;
