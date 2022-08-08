const axios = require('axios');
const KEY_API = '28454528-1e3cb033326c6dab929ab8bef';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImages(searchQuery) {
  try {
    const url = `${BASE_URL}?key=${KEY_API}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}