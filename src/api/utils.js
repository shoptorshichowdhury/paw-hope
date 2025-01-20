/* upload image and return & return image url */

import axios from "axios";

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);

  //send image to imagebb
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGEBB_API_KEY
    }`,
    formData
  );

  return data.data.display_url;
};

//save user in db
export const saveUser = async (user) => {
  await axios.post(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
    name: user?.displayName,
    email: user?.email,
    image: user?.photoURL,
  });
};
