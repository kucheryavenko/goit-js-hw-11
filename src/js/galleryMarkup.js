export function addGalleryMarkup(item) {
    return item.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
                    <a class="photo-link" href="${largeImageURL}">
                        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                    </a>
                    <div class="info">
                        <p class="info-item">
                        <b class="info-value">Likes</b>${likes}
                        </p>
                        <p class="info-item">
                        <b class="info-value">Views</b>${views}
                        </p>
                        <p class="info-item">
                        <b class="info-value">Comments</b>${comments}
                        </p>
                        <p class="info-item">
                        <b class="info-value">Downloads</b>${downloads}
                        </p>
                    </div>
                </div>`
    }).join('');
}