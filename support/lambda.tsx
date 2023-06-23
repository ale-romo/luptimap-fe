export const getImages = async (user_uuid:string) => {
  const response = await fetch(`/.netlify/functions/images?user_uuid=${user_uuid}`);

  const images = await response.json()
  
  return images.Items
}

export const saveSwipe = async (post_id:string, direction: string, user_uuid:string) => {
  await fetch('/.netlify/functions/swipe', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post_id,
      direction,
      user_uuid
    }),
  });
}
