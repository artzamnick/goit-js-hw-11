import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'loaders.css/loaders.min.css';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');

if (form) {
    form.addEventListener('submit', onSearchSubmit);
} else {
    console.warn('Search form not found: #search-form');
}

function onSearchSubmit(event) {
    event.preventDefault();
    const query = input ? input.value.trim() : '';

if (!query) {
    iziToast.warning({
        title: 'Увага!',
        message: 'Будь ласка, введіть слово для пошуку.',
        position: 'topRight',
        timeout: 3000,
    });
    return;
}

clearGallery();
showLoader();
getImagesByQuery(query)
    .then(data => {
    if (!data || !Array.isArray(data.hits)) {
        throw new Error('Unexpected response from API');
    }

    if (data.hits.length === 0) {
        iziToast.info({
            title: 'Немає результатів',
            message: 'На жаль, зображення за цим запитом не знайдено. Спробуйте інший запит.',
            position: 'topRight',
            timeout: 4000,
        });
        return;
    }

    createGallery(data.hits);

    iziToast.success({
        title: 'Успіх!',
        message: `Знайдено ${data.hits.length} зображень за запитом "${query}"`,
        position: 'topRight',
        timeout: 3000,
    });
    })
    .catch(err => {
        console.error(err);
    iziToast.error({
        title: 'Помилка!',
        message: 'Не вдалося завантажити зображення. Перевірте підключення до інтернету або спробуйте ще раз.',
        position: 'topRight',
        timeout: 5000,
    });
    })
    .finally(() => {
    hideLoader();
    });
}