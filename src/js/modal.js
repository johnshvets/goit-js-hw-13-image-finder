import * as basicLightbox from 'basiclightbox';
import refs from './refs';

refs.gallery.addEventListener('click', onGalleryClick);

function onGalleryClick({ target: { className, dataset } }) {
  if (className !== 'gallery-image') return;

  const instance = basicLightbox.create(`
    <img src=${dataset.url} >
`);

  instance.show();
}
