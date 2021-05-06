import './css/styles.css';
import imageListTpl from './templates/cardList.hbs';
import HitsApiService from './js/api-Key';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

var debounce = require('lodash.debounce');
const hitsApiService = new HitsApiService();

const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryList: document.querySelector('.gallery'),
    input: document.querySelector('.search-input'),
    sentinel: document.querySelector('#sentinel'),
};

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    e.preventDefault();

    hitsApiService.query = e.target.value.trim();
    if(hitsApiService.query.length === 0) {
        
        return clearHitsContainer();
    } 

    hitsApiService.resetPage();
    clearHitsContainer();
    onLoadMore(); 
}

function onLoadMore() {
   hitsApiService.fetchHits().then(galleryRequests);
}

function galleryRequests(data) {
    console.log(data.hits);
           
        if(hitsApiService.renderedImg < data.totalHits) {
            observer.observe(refs.sentinel);
            addHitsMarkup(data.hits);
            hitsApiService.renderedImg += 12;
        }

        if(hitsApiService.renderedImg === data.totalHits) {
            observer.unobserve(refs.sentinel);
            return;
        }

        if(hitsApiService.renderedImg + 12 > data.totalHits) {
            observer.unobserve(refs.sentinel);
        }
    }

function addHitsMarkup(data) {
    refs.galleryList.insertAdjacentHTML('beforeend', imageListTpl(data));
}

function clearHitsContainer() {
 refs.galleryList.innerHTML = '';    
}

const observer = new IntersectionObserver(onEntry, options);


    function onEntry (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && hitsApiService.query !== '') {
                console.log("LOADING...");
                hitsApiService.fetchHits().then(galleryRequests);
            }
        });
    }
    const options = {
        rootMargin: '100px'
    }   

//модалка basicLightbox
refs.galleryList.addEventListener('click', onGalleryElClick);    

function onGalleryElClick(event) {
        if (event.target.nodeName !== 'IMG') {
          return;
        }
        
        const changeModalImage = `<img src=${event.target.dataset.source} alt="icon" />`;
        const instance = basicLightbox.create(changeModalImage);
        instance.show();
 }