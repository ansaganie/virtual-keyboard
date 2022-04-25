
const CATALOG = document.querySelector('.pets__catalog');
const FIRST_PAGE_BTN = document.querySelector('#first-page-btn');
const PREV_PAGE_BTN = document.querySelector('#prev-page-btn');
const CURRENT_PAGE_BTN = document.querySelector('#current-page-btn');
const NEXT_PAGE_BTN = document.querySelector('#next-page-btn');
const LAST_PAGE_BTN = document.querySelector('#last-page-btn');

let cardIdCount = 0;
let cardCount = 8;

//find card count
if (768 <= window.innerWidth && window.innerWidth < 1280) {
    cardCount = 6;
} else if (window.innerWidth < 768) {
    cardCount = 3;
}

//generate pets and calculate pages
const pets = new Array(6)
    .fill(window.pets)
    .flat()
    .map((pet) => ({ ...pet, id: cardIdCount++ }));
window.pets = pets;
const pages = []; 
let currentPageNumber = 1;

let index = 0;

while ((cardCount * index) < pets.length) {
    const start = index * cardCount;
    const slice = pets.slice(start, start + cardCount);
    pages.push(shuffle(slice));
    index++;
}

const checkButtons = () => {
    if (currentPageNumber === 1) {
        FIRST_PAGE_BTN.disabled = true;
        PREV_PAGE_BTN.disabled = true;
    } else {
        FIRST_PAGE_BTN.disabled = false;
        PREV_PAGE_BTN.disabled = false;
    }

    if (currentPageNumber === pages.length) {
        LAST_PAGE_BTN.disabled = true;
        NEXT_PAGE_BTN.disabled = true;
    } else {
        LAST_PAGE_BTN.disabled = false;
        NEXT_PAGE_BTN.disabled = false;
    }

    CURRENT_PAGE_BTN.textContent = currentPageNumber;
}

const renderCatalog = () => {
    const data = pages[currentPageNumber - 1];
    const cards = data.map((pet) => createCardElement(pet))
    CATALOG.innerHTML = '';
    CATALOG.append(...cards);
    checkButtons();
}

FIRST_PAGE_BTN.addEventListener('click', () => {
    currentPageNumber = 1;
    renderCatalog()
});

PREV_PAGE_BTN.addEventListener('click', () => {
    currentPageNumber--;
    renderCatalog()
});

NEXT_PAGE_BTN.addEventListener('click', () => {
    currentPageNumber++;
    renderCatalog()
});

LAST_PAGE_BTN.addEventListener('click', () => {
    currentPageNumber = pages.length;
    renderCatalog()
});

checkButtons();
renderCatalog();