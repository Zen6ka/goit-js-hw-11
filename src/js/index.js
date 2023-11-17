import { refs } from './refs';
import { fetchPhoto } from './api';
import { createMarkup } from './markup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { lightbox } from './lightbox';

const { searchForm, gallery, btnLoadMore } = refs;

const notiflixParams = {
    position: 'center-center',
    timeout: 3000,
    width: '400px',
    fontSize: '24px'
};

const perPage = 40;
let page = 1;
let keyOfSearchPhoto = '';

btnLoadMore.classList.add('is-hidden');

searchForm.addEventListener('submit', onSubmitForm);

async function onSubmitForm(event) {
    event.preventDefault();

    gallery.innerHTML = '';
    page = 1;
    const { searchQuery } = event.currentTarget.elements;
    keyOfSearchPhoto = searchQuery.value
        .trim()
        .toLowerCase()
        .split(' ')
        .join('+');

    if (keyOfSearchPhoto === '') {
        Notify.info('Enter your request, please!', notiflixParams);
        return;
    }
    event.currentTarget.reset();
    try {
        const data = await fetchPhoto(keyOfSearchPhoto, page, perPage);
                const searchResults = data.hits;
                if (data.totalHits === 0) {
                    Notify.failure('Sorry, there are no images matching your search query. Please try again.', notiflixParams);
                } else {
                    Notify.info(`Hooray! We found ${data.totalHits} images.`, notiflixParams);
                    createMarkup(searchResults);
                    lightbox.refresh();

                };
                if (data.totalHits > perPage) {
                    window.addEventListener('scroll', showLoadMorePage);
                };
    } catch (error) {
        Notify.failure('Oops! Something went wrong! Try reloading the page or make another choice!', notiflixParams);
    };

    btnLoadMore.addEventListener('click', onClickLoadMore);

    // event.currentTarget.reset();
};

async function onClickLoadMore() {
    page += 1;
    try {
        const data = await fetchPhoto(keyOfSearchPhoto, page, perPage);
            const searchResults = data.hits;
            const numberOfPage = Math.ceil(data.totalHits / perPage);
            createMarkup(searchResults);
            if (page === numberOfPage) {
            Notify.info("We're sorry, but you've reached the end of search results.", notiflixParams);
            btnLoadMore.removeEventListener('click', onClickLoadMore);
            window.removeEventListener('scroll', showLoadMorePage);
            };
            lightbox.refresh();
    } catch (error) {
        Notify.failure('Oops! Something went wrong! Try reloading the page or make another choice!', notiflixParams);
    };
};

// function onFetchError() {
//     Notify.failure('Oops! Something went wrong! Try reloading the page or make another choice!', notiflixParams);
// };

function showLoadMorePage() {
    if (checkIfEndOfPage()) {
        onClickLoadMore();
    };
};

function checkIfEndOfPage() {
  return (
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight
  );
}