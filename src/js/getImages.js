const KEY_API = '28454528-1e3cb033326c6dab929ab8bef';
const BASE_URL = 'https://pixabay.com/api/';
const axios = require('axios');

export async function getImages() {
  try {
    const url = `${BASE_URL}?key=${KEY_API}&q=photo&image_type=photo&orientation=horizontal&safesearch=true`;
    const response = await axios.get(url);

    return response.data.hits;
  } catch (error) {
    console.error(error);
  }
}