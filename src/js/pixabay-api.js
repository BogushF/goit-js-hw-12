import axios from 'axios';

export async function getImage(query, currentPage) {
  const responce = await axios.get(`https://pixabay.com/api/`, {
    params: {
      key: '44023612-008a3c81351fe07b08d2580bd',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: '15',
      page: currentPage,
    },
  });
  return responce.data;
}
