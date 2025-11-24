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
    iziToast.warning({ title: 'Warning', message: 'Please enter a search query.', position: 'topRight' });
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
            title: 'No results',
            message: 'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
        });
        return;
    }

    createGallery(data.hits);

    iziToast.success({
        title: 'Success',
        message: `Found ${data.hits.length} images for "${query}"`,
        position: 'topRight',
        timeout: 2000,
    });
    })
    .catch(err => {
        console.error(err);
        iziToast.error({
        title: 'Error',
        message: 'Something went wrong while fetching images. Check console.',
        position: 'topRight',
    });
    })
    .finally(() => {
    hideLoader();
    });
}
