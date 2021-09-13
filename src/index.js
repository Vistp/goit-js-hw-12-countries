import debounce from 'lodash.debounce';
import { error, Stack } from '@pnotify/core';
import './sass/main.scss';
import countryCardTpl from './templates/country-card.hbs';
import countriesListTpl from './templates/countries-list.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import API from './js/fetchCountries';

const cardContainer = document.querySelector('.js-card-container');
const searchForm = document.querySelector('.form-control');

// console.log('Это поиск стран');

// -------хочу получить массив всех стран------

// function fetchAllCountry() {
//     return fetch('https://restcountries.eu/rest/v2/all').then(response => {
//     return response.json();
//     })
// }
// fetchAllCountry()
//     .then(response => {
//         // console.log(response); //массив объектов
//         // console.log(...response); //норм не массив объектов, а просто объекты стран
//         const arrCountry = [...response]; // массив объектов
//         console.log(arrCountry);
//         return arrCountry;
//     })
//     .catch(error => {
//         console.log(error);
//     });  


// ------- ищем в массиве нужные страны--------

searchForm.addEventListener('input', debounce(onSearch, 1000));

function onSearch(e) {
//   e.preventDefault();

cardContainer.innerHTML = '';
//   const form = e.currentTarget; меняю на target чтобы дебаунс срабатывал
    const form = e.target;
    const searchQuery = form.value;
    console.log(searchQuery);
    // console.log(arrCountry);

    API.fetchCountries(searchQuery)
        .then(renderCountryCard)
        .catch(onFetchError)
        // .finally(() => form.reset());  //не срабатывает
        // .finally(() => searchForm.reset());
}

// function fetchCountry(countryName) {
//     return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`).then(response => {
//     return response.json();
//     })
// }

function renderCountryCard(countries) {
    console.log(...countries);
    if (countries.length === 1) {
        const markupCountry = countryCardTpl(...countries);
        cardContainer.innerHTML = markupCountry;
        // searchForm.reset();
        // тоже не срабатывает 
    }

    if (countries.length >= 2 && countries.length <= 10) {
    // ----- в консоль дает массив подходящих стран
        // -----через шаблон
        const markup = countriesListTpl(countries);
        cardContainer.innerHTML = markup;
    // console.log(markup);
    
    // --------варик без шаблона
    // const markup = countries.map(country => `<li>${country.name}</li>`).join('');
    // cardContainer.innerHTML = markup;
    }
    
    if (countries.length > 10) {
        console.log(`Опасность!!!Слишком много стран ${countries.length} подходит под ваш запрос. Сделайте его более специфичным!!!`);
        // getErrorMessage();
        // cardContainer.innerHTML = '';
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
}


function onFetchError (errorMassage) {
    console.log('error');
};
