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
        
        const response = await newsApiService.getSearchQuery();

        if (response.totalHits === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        } else if (response.totalHits < newsApiService.per_page) {
            Notify.success(`Hooray! We found ${response.totalHits} images.`);
            appendGalleryMarkup(response);
            refs.btnLoadMore.classList.add('is-hidden');
        } else {
            Notify.success(`Hooray! We found ${response.totalHits} images.`);
            appendGalleryMarkup(response);
            refs.btnLoadMore.classList.remove('is-hidden');
        }

    } catch (error) {
        console.log(error);
    }
}

async function onLoadMore() {
    try {
        const response = await newsApiService.getSearchQuery();
        appendGalleryMarkup(response);
        smoothScrolling();
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

function smoothScrolling() {
    const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
    });
}




