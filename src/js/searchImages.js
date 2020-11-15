import API from './../api/apiService';

import refs from './refs';
import imagesCardTpl from './../templates/images.hbs';
import debounce from 'lodash.debounce';

let searchQuery = '';

refs.searchImagesForm.addEventListener(
  'input',
  debounce(onImagesFormSubmit, 500),
);

function onImagesFormSubmit(e) {
  searchQuery = e.target.value;
  refs.imagesGallery.innerHTML = '';

  if (!searchQuery) return;

  API.fetchImages(searchQuery)
    .then(data => data.hits)
    .then(setImagesMarkup);
}

function setImagesMarkup(images) {
  let imagesMarkup = imagesCardTpl(images);

  return refs.imagesGallery.insertAdjacentHTML('beforeend', imagesMarkup);
}
