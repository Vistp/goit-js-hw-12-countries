import debounce from 'lodash.debounce';
// import errorMessage from 'pnotify'
import './sass/main.scss';
import countryCardTpl from './templates/country-card.hbs';
import countriesListTpl from './templates/countries-list.hbs';

const cardContainer = document.querySelector('.js-card-container');
const searchForm = document.querySelector('.form-control');

// console.log('Это поиск стран');

// -------хочу получить массив всех стран------

function fetchAllCountry() {
    return fetch('https://restcountries.eu/rest/v2/all').then(response => {
    return response.json();
    })
}
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
  e.preventDefault();

//   const form = e.currentTarget; меняю на target чтобы дебаунс срабатывал
    const form = e.target;
    const searchQuery = form.value;
    console.log(searchQuery);
    // console.log(arrCountry);

 fetchCountry(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError)
    // .finally(() => form.reset());  не срабатывает
}


// fetchCountry('eesti')
//     .then(renderCountryCard)
//     .catch(error => {
//         console.log(error);
//     });

function fetchCountry(countryName) {
    return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`).then(response => {
    return response.json();
    })
}

// function renderCountryCard(country) {
//     // ----- делает разметку одной страны
//         const markup = countryCardTpl(...country);
//         cardContainer.innerHTML = markup;
//     }

function renderCountryCard(countries) {
    // ----- в консоль дает массив подходящих стран
        const markup = countriesListTpl(...countries);
    // cardContainer.innerHTML = markup;
    // console.log(markup);
    console.log(...countries);
    // countries.map(country => `<li>${county.name}</li>`).join('');
    // const markup = countries.map(country => `<li>${country.name}</li>`).join('');
    cardContainer.innerHTML = markup;
    // if (country)
    }

function onFetchError (error) {
    console.log('error');
};

// ----------
// проверим варик с покемоном - приходит объект, а в странам приходит массив объектов
// const r = fetch('https://pokeapi.co/api/v2/pokemon/2/').then(response => {
//     // console.log(response.json());
//     return response.json();
// })
//     .then(country => {
//         console.log(country);
//         const markup = countryCardTpl(country);
//         console.log(markup);
//         cardContainer.innerHTML = markup;
//     })
//     .catch(error => {
//         console.log(error);
// })


// --------pnotify

// PNotify.error({
//   title: 'Desktop Error',
//   text: 'Serious error is serious.',
//   modules: new Map([
//     ...PNotify.defaultModules,
//     [PNotifyDesktop, {}]
//   ])
// });