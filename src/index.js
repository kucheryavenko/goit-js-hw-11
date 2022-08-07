// import { Notify } from 'notiflix/build/notiflix-notify-aio'; 
import { getImages } from "./js/getImages";
import { getRefs } from "./js/getRefs";
import { addGalleryMarkup } from "./js/galleryMarkup";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = getRefs();
// console.log("Form: ", refs.formEl);
// console.log("Gallery: ", refs.galleryEl);
// console.log("Btn: ", refs.btnLoadMore);


// Запускаем библиотеку SimpleLightbox и выводим 'alt' c задержкой 250 ms
const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250});

async function img() {
    const images = await getImages();
    // console.log(images);
    const markup = addGalleryMarkup(images);
    // console.log(markup);

    refs.galleryEl.insertAdjacentHTML("beforeend", markup);
    lightbox.refresh();
}

img();





