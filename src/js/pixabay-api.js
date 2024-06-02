export function getImage(query) {
  const API_KEY = '44023612-008a3c81351fe07b08d2580bd';
  const BASE_URL = 'https://pixabay.com/api/';
  const parameters = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_typ: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 20,
  });
  return fetch(`${BASE_URL}?${parameters}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
