import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createGallery } from './js/render-functions.js';
import { getImage } from './js/pixabay-api.js';

const form = document.querySelector('.form');
const listImage = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let currentPage = 1;
let totalPage = 0;
let query = '';

form.addEventListener('submit', toSearch);
loadMoreBtn.addEventListener('click', toLoadMore);

async function toSearch(event) {
  event.preventDefault();
  listImage.innerHTML = '';
  currentPage = 1;
  query = event.target.elements.query.value.trim();
  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'The search field is empty. Please check your input!',
      position: 'topRight',
    });
    loadMoreBtn.classList.add('is-hidden');
  } else {
    try {
      loader.classList.remove('is-hidden');
      const imagesList = await getImage(query, currentPage);
      totalPage = Math.ceil(imagesList.totalHits / 15);
      if (!imagesList.hits.length) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        loader.classList.add('is-hidden');
      } else {
        const markup = createGallery(imagesList.hits);
        listImage.insertAdjacentHTML('beforeend', markup);
        lightbox.refresh();
        loader.classList.add('is-hidden');
        checkTotalPage();
      }
    } catch (error) {
      console.log(error);
    }
    form.reset();
  }
}

async function toLoadMore() {
  currentPage += 1;
  loader.classList.remove('is-hidden');
  try {
    const imagesList = await getImage(query, currentPage);
    const markup = createGallery(imagesList.hits);
    listImage.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }
  checkTotalPage();
  scrollImg();
  loader.classList.add('is-hidden');
}

function checkTotalPage() {
  if (currentPage >= totalPage) {
    loadMoreBtn.classList.add('is-hidden');
    iziToast.info({
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    loadMoreBtn.classList.remove('is-hidden');
  }
}

function scrollImg() {
  const height = listImage.firstChild.getBoundingClientRect().height;

  scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
