import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '49374339-6c81470c324f76695f53d1c98';

export async function fetchImages(query, page = 1, perPage = 15) {
  try {
    const params = {
      key: API_KEY,
      q: encodeURIComponent(query),
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: perPage,
    };

    const response = await axios.get(BASE_URL, { params });

    if (response.status !== 200) {
      throw new Error(`Failed to fetch images. Status: ${response.status}`);
    }

    if (!response.data.hits) {
      throw new Error('Invalid API response structure');
    }

    return response.data;
  } catch (error) {
    throw new Error(`Error fetching images: ${error.message}`);
  }
}
