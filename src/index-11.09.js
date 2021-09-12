
// import cards from './menu.json';
import debounce from 'lodash.debounce';
import './sass/main.scss';
import countryCardTpl from './templates/country-card.hbs';

const cardContainer = document.querySelector('.js-card-container');
const searchForm = document.querySelector('.form-control');

console.log('Это поиск стран');

// searchForm.addEventListener('input', onSearch);
searchForm.addEventListener('input', debounce(onSearch, 1000));

// function onSearch(e) {
//   e.preventDefault();

//   const form = e.currentTarget;
//   const searchQuery = form.elements.query.value;

//  fetchCountry(searchQuery)
//     .then(renderCountryCard)
//     .catch(error => {
//         console.log(error);
//     });
// }

function onSearch(e) {
  e.preventDefault();

//   const form = e.currentTarget; меняю на target чтобы дебаунс срабатывал
    const form = e.target;
    const searchQuery = form.value;
    console.log(searchQuery);

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

function renderCountryCard(country) {
        const markup = countryCardTpl(...country);
        // console.log(markup);
        cardContainer.innerHTML = markup;
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
