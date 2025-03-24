import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  toggleLoadMoreBtn,
  showEndMessage,
  smoothScroll,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

document.querySelector('.form').addEventListener('submit', async event => {
  event.preventDefault();

  currentQuery = event.target['search-text'].value.trim();
  if (!currentQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term',
      position: 'topRight',
    });
    return;
  }

  currentPage = 1;
  showLoader();
  toggleLoadMoreBtn(false);
  clearGallery();

  try {
    const data = await fetchImages(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message: 'No images found for your query',
        position: 'topRight',
      });
      return;
    }

    renderGallery(data.hits);

    if (data.hits.length < totalHits) {
      toggleLoadMoreBtn(true);
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

document.querySelector('.load-more').addEventListener('click', async () => {
  currentPage++;
  showLoader();
  toggleLoadMoreBtn(false);

  try {
    const data = await fetchImages(currentQuery, currentPage);
    renderGallery(data.hits, true);
    smoothScroll();

    if (currentPage * 15 >= totalHits) {
      toggleLoadMoreBtn(false);
      showEndMessage();
    } else {
      toggleLoadMoreBtn(true);
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
