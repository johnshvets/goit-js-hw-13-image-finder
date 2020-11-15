const API_KEY = '19048518-7cffd49b48c4ae5ad0525e878';
const URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&per_page=12';

export default class ImageApiService {
  constructor(onFetchError) {
    this.searchQuery = '';
    this.page = 1;
    this.onFetchError = onFetchError;
  }

  async fetchImages() {
    try {
      const response = await fetch(
        `${URL}&q=${this.searchQuery}&page=${this.page}&key=${API_KEY}`,
      );

      return response.json();
    } catch {
      this.onFetchError('Something went wrong. Please try again.');
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
