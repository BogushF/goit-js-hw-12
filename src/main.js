import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createGallery } from './js/render-functions.js';
import { getImage } from './js/pixabay-api.js';

const form = document.querySelector('.form');
const listImage = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', event => {
  event.preventDefault();
  listImage.innerHTML = '';
  const query = event.target.elements.query.value.trim();

  if (query) {
    loader.classList.remove('is-hidden');
    getImage(query)
      .then(data => {
        if (!data.hits.length) {
          iziToast.error({
            title: 'Error',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
          });
        }
        const markup = createGallery(data.hits);
        listImage.insertAdjacentHTML('afterbegin', markup);
        loader.classList.add('is-hidden');
        lightbox.refresh();
      })
      .catch(error => console.log(error));
  } else {
    iziToast.error({
      title: 'Error',
      message: 'The search field is empty. Please check your input!',
      position: 'topRight',
    });
  }
  form.reset();
});
