import debounce from 'lodash.debounce';
import { error, Stack } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import './sass/main.scss';
import countryCardTpl from './templates/country-card.hbs';
import countriesListTpl from './templates/countries-list.hbs';
import API from './js/fetchCountries';

const cardContainer = document.querySelector('.js-card-container');
const searchForm = document.querySelector('.form-control');


// ------- ищем в массиве нужные страны--------

searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    cardContainer.innerHTML = '';
//   const form = e.currentTarget; меняю на target чтобы дебаунс срабатывал
    const form = e.target;
    const searchQuery = form.value;
    console.log(searchQuery);

    API.fetchCountries(searchQuery)
        .then(renderMarkup)
        .catch(onFetchError)
}

function renderMarkup(countries) {
    console.log(...countries);
    if (countries.length === 1) {
        renderCountryCard(countries);
    }

    if (countries.length >= 2 && countries.length <= 10) {
        // -----через шаблон
        renderCountriesList(countries);
    
    // --------варик без шаблона
    // const markup = countries.map(country => `<li>${country.name}</li>`).join('');
    // cardContainer.innerHTML = markup;
    }
    
    if (countries.length > 10) {
        console.log(`Опасность!!!Слишком много стран ${countries.length} подходит под ваш запрос. Сделайте его более специфичным!!!`);
        getErrorMessage();
    }
}

function onFetchError (errorMassage) {
    console.log('error');
};
function renderCountryCard(countries) {
    const markupCountry = countryCardTpl(...countries);
        cardContainer.innerHTML = markupCountry;
}

function renderCountriesList(countries) {
    const markupList = countriesListTpl(countries);
    cardContainer.innerHTML = markupList;
}

function getErrorMessage() {
     error({
            text: 'Too many matches found. Please enter a more specific query!',
            width: '500px',
            delay: 2000,
            sticker: false,
            icon: false,
            closer: false,
            stack: new Stack({
            dir1: 'down', dir2: 'left',
            firstpos1: 190, firstpos2: 50
        })     
        })
}