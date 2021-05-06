// const BASE_URL = 'htpps://pixabay.com/api/'
// const API_KEY = '19367124-00f5e2cf6611e77bac75c4628';

// function fetchCards() {
//     const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&per_page=12&page=${this.page}`;
//     return fetch(url)
//         .then(response => response.json)
    
//  }

// export default{fetchCards}
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '19367705-6c391461160466e2850694aab';

export default class apiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.renderedImg = 0;
    }

    fetchHits() {
        const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&per_page=12&page=${this.page}`;

        return fetch(url)
            .then(response => response.json())
            .then((data) => {
                this.incrementPage();

                return data;
            });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
        this.renderedImg = 0;
    }

    // Если убрать get и set, тогда везьде обращаемся только к searchQuery, a не query 
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}