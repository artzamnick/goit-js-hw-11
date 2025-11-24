import { getImagesByQuery } from './js/pixabay-api.js'; 
import { createGallery, clearGallery } from './js/render-functions.js'; 
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const loader = document.querySelector('.loader');
const galleryRef = document.querySelector('.gallery');

if (!form || !input || !loader || !galleryRef) {
console.error('Required DOM elements not found:', {
    form: !!form,
    input: !!input,
    loader: !!loader,
    gallery: !!galleryRef,
});
}

function showLoader() {
loader.classList.remove('is-hidden');
}
function hideLoader() {
loader.classList.add('is-hidden');
}

function renderGalleryFallback(images) {
const markup = images
    .map(img => {
    return `
<li class="gallery__item">
<a href="${img.largeImageURL}">
    <img class="photo-card__img" src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
</a>
<div class="info">
    <p><b>Likes</b><br>${img.likes}</p>
    <p><b>Views</b><br>${img.views}</p>
    <p><b>Comments</b><br>${img.comments}</p>
    <p><b>Downloads</b><br>${img.downloads}</p>
</div>
</li>`;
    })
    .join('');
    galleryRef.insertAdjacentHTML('beforeend', markup);

try {
    if (window.SimpleLightboxInstance) {
        window.SimpleLightboxInstance.refresh();
    } else {
        window.SimpleLightboxInstance = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
    });
    }
} catch (err) {
    console.warn('SimpleLightbox init warning:', err);
}
}

form.addEventListener('submit', onSearchSubmit);
function onSearchSubmit(evt) {
evt.preventDefault();
const query = input.value.trim();

if (!query) {
    iziToast.warning({
        title: 'Увага',
        message: 'Введіть слово для пошуку.',
        position: 'topRight',
        timeout: 3000,
    });
    return;
    }

galleryRef.innerHTML = '';
showLoader();
getImagesByQuery(query)
    .then(data => {
    if (!data || !Array.isArray(data.hits)) {
        throw new Error('Неправильна відповідь від API');
    }
        if (data.hits.length === 0) {
        iziToast.info({
            title: 'Нічого не знайдено',
            message: 'Спробуйте інше ключове слово.',
            position: 'topRight',
            timeout: 4000,
        });
        return;
    }

    if (typeof createGallery === 'function') {
        createGallery(data.hits);
    } else {
        renderGalleryFallback(data.hits);
    }

    iziToast.success({
        title: 'Знайдено',
        message: `Знайдено ${data.hits.length} зображень для "${query}"`,
        position: 'topRight',
        timeout: 2500,
    });
    })
    .catch(err => {
    console.error('Fetch/images error:', err);
    iziToast.error({
        title: 'Помилка',
        message:
        'Не вдалося отримати зображення. Перевірте інтернет або ключ API й спробуйте ще раз.',
        position: 'topRight',
        timeout: 5000,
    });
    })
    .finally(() => {
    hideLoader();
    });
}
