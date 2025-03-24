const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '49374339-6c81470c324f76695f53d1c98';

export async function fetchImages(query, page = 1, perPage = 15) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }
  return await response.json();
}
