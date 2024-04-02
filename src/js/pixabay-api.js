import axios from 'axios';

const API_KEY = '43075807-09317d918fe027bf1568df9fe';
const baseURL = 'https://pixabay.com/api/';

export async function fetchImages(valueInput, page, perPage) {
  try {
    const response = await axios.get(baseURL, {
      params: {
        key: API_KEY,
        q: valueInput,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}