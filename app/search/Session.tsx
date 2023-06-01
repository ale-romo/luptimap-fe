'use client'
import {v4 as uuid} from 'uuid';
export const getUserId = () => localStorage.getItem('UUID');;

const Session = () => {
  let userId = getUserId();
  if (!userId) localStorage.setItem('UUID', uuid());
  return <></>;
}

export default Session;
