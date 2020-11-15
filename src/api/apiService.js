import onFetchError from '../js/errorHandler';

const API_KEY = '19048518-7cffd49b48c4ae5ad0525e878';
const URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&per_page=12`;

const fetchImages = async searchQuery => {
  try {
    const path = getPath(searchQuery);
    const response = await fetch(path);

    return response.json();
  } catch {
    onFetchError('Something went wrong. Please try again.');
  }
};

function getPath(searchQuery, page = 1) {
  return `${URL}&q=${searchQuery}&page=${page}&key=${API_KEY}`;
}

export default { fetchImages, getPath };
