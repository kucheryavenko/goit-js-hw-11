// import { getImages } from "./js/getImages";
import { NewsApiService } from "./js/newsService"
import { getRefs } from "./js/getRefs";
import { generateMarkup } from "./js/galleryMarkup";
import { Notify } from 'notiflix/build/notiflix-notify-aio'; 
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = getRefs();
const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });
const newsApiService = new NewsApiService();

refs.formEl.addEventListener('submit', onSubmit);
refs.btnLoadMore.addEventListener('click', onLoadMore);


async function onSubmit(evt) {
    evt.preventDefault();

    clearGalleryMarkup();
    newsApiService.query = evt.currentTarget.elements.searchQuery.value;
    newsApiService.resetPage();
    try {
        refs.btnLoadMore.classList.add('is-hidden');

        const response = await newsApiService.getSearchQuery();
        console.log(response);

        if (response.totalHits === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        } 
        Notify.success(`Hooray! We found ${response.totalHits} images.`);
        appendGalleryMarkup(response);
        refs.btnLoadMore.classList.remove('is-hidden');
    } catch (error) {
        console.log(error);
    }
}

async function onLoadMore() {
    try {
        const response = await newsApiService.getSearchQuery();
        appendGalleryMarkup(response);
    } catch (error) {
        Notify.info("We're sorry, but you've reached the end of search results.");
        refs.btnLoadMore.classList.add('is-hidden');
    }
}

function appendGalleryMarkup(response) {
    refs.galleryEl.insertAdjacentHTML("beforeend", generateMarkup(response));
    lightbox.refresh();
}

function clearGalleryMarkup() {
    refs.galleryEl.innerHTML = '';
}

// async function renderGalleryMarkup() {
//     try {
//         const response = await newsApiService.getSearchQuery();
//         const markup = addGalleryMarkup(response);

//         refs.galleryEl.insertAdjacentHTML("beforeend", markup);
//         lightbox.refresh();
//     } catch (error) {
//         console.log(error);
//     }
// }

// ********
// refs.formEl.addEventListener('submit', handleSubmit);
// refs.btnLoadMore.addEventListener('click', onLoadMore);

// function handleSubmit(evt) {
//     evt.preventDefault();
//     const searchQuery = evt.currentTarget.elements.searchQuery.value;
//     return renderGalleryMarkup(searchQuery);
// }

// function onLoadMore() {
//     console.log('hi');
// }

// async function renderGalleryMarkup(query) {
//     const response = await getImages(query);
//     const markup = addGalleryMarkup(response);

//     refs.galleryEl.insertAdjacentHTML("beforeend", markup);
//     lightbox.refresh();
// }
// ********




