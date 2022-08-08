const axios = require('axios');

export class NewsApiService {
  
    #KEY_API = '28454528-1e3cb033326c6dab929ab8bef';
    #BASE_URL = 'https://pixabay.com/api/';

    #searchParams = new URLSearchParams({
      image_type: "photo",
      orientation: "horizontal",
      safesearch: "true",
      per_page: 40,
    })
  
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async getSearchQuery() {
    try {
        const url = `${this.#BASE_URL}?key=${this.#KEY_API}&q=${this.searchQuery}&${this.#searchParams}&page=${this.page}`;
        this.page += 1;  
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
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