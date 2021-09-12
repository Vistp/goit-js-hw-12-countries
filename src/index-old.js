import productCardTpl from './templates/product-card.hbs';
import cards from './menu.json';
import './sass/main.scss';

// создание шаблона и добаление карточек в HTML
const menuEl = document.querySelector('.js-menu');
const menuCards = createMenuCard(cards);
menuEl.insertAdjacentHTML('beforeend', menuCards);
function createMenuCard(cards) {
    return cards.map(productCardTpl).join('');
}

// переключение темы
const checkboxEl = document.querySelector('.theme-switch__toggle');
const bodyEl = document.querySelector('body');
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

bodyEl.classList.add(Theme.LIGHT);

if (localStorage.getItem('theme')) {
    checkboxEl.setAttribute('checked', true);
    console.log('Темная тема после перезагрузки');
    bodyEl.classList.add(Theme.DARK);
}

const onChange = () => {
    // console.log('нажат переключатель');
    bodyEl.classList.toggle(Theme.DARK);

    if (bodyEl.classList.contains(Theme.DARK)) {
        // console.log('темная тема');
        localStorage.setItem('theme', 'dark');
    } else {
        // console.log('светлая тема');
        localStorage.removeItem('theme');
    }    
};
checkboxEl.addEventListener('change', onChange);
