import axios from 'axios';

const API_KEY = '49374339-6c81470c324f76695f53d1c98';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data.hits;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
}
