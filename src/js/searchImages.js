import ImageApiService from './../api/apiService';
import refs from './refs';
import imagesCardTpl from './../templates/images.hbs';
import debounce from 'lodash.debounce';
import onFetchError from '../js/errorHandler';

const imageApiService = new ImageApiService(onFetchError);

refs.searchImagesForm.addEventListener(
  'input',
  debounce(onImagesFormChange, 500),
);

function onImagesFormChange(e) {
  imageApiService.query = e.target.value;

  if (imageApiService.query === '') return;

  imageApiService.resetPage();
  clearGallery();

  getImages();
}

function setImagesMarkup(images) {
  const imagesMarkup = imagesCardTpl(images);

  refs.imagesGallery.insertAdjacentHTML('beforeend', imagesMarkup);
}

function getImages() {
  imageApiService
    .fetchImages()
    .then(data => data.hits)
    .then(images => {
      setImagesMarkup(images);
      imageApiService.incrementPage();
    });
}

function clearGallery() {
  refs.imagesGallery.innerHTML = '';
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (
      entry.isIntersecting &&
      imageApiService.query !== '' &&
      imageApiService.page !== 1
    ) {
      getImages();
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '200px',
});

observer.observe(refs.sentinel);
