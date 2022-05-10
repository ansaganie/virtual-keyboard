/*------------------- Carousel -----------------------*/
const SLIDER_CONTAINER = document.querySelector('.slider__container');
const LEFT_BUTTON = document.querySelector('.slider__control.slider__back');
const RIGHT_BUTTON = document.querySelector('.slider__control.slider__next');

let cardCount = 3;


//find card count
if (768 <= window.innerWidth && window.innerWidth < 1280) {
    cardCount = 2;
} else if (window.innerWidth < 768) {
    cardCount = 1;
}

let cardIdCount = 0;
let slideIdCount = 0; 
let slideCount = 3;
const pets = shuffle(window.pets).map((pet) => ({ ...pet, id: cardIdCount++ }));
window.pets = pets;
let containerWidth = `calc(100% * ${cardCount})`;
let slideWidth = `calc(100% / ${cardCount})`;

// creates slides consists of elements equal to cardCount
const getRandomSlide = (previous) => {
    if (!previous) {
        return pets.slice(0, cardCount);
    } else {
        const result = [];

        while (result.length !== cardCount) {
            let randomElement = pets[Math.floor(Math.random() * pets.length)];

            let isFound =
                previous.some(({ id }) => id === randomElement.id) ||
                result.some(({ id }) => id === randomElement.id);

            if (!isFound) {
                result.push(randomElement);
            }
        }

        return result;
    }
};

const createCarouselSlide = (id, left, items) => {
    const div = document.createElement('div');

    div.insertAdjacentHTML('afterbegin', `
        <div
            class="carousel-item"
            id="carousel-${id}"
            style="width: ${slideWidth}"
        ></div>
    `.trim());
    div.firstChild.append(...items);

    div.firstChild.style.left = left;

    return div.firstChild;
}

SLIDER_CONTAINER.innerHTML = '';
SLIDER_CONTAINER.style.width = containerWidth;


let initialSlide = getRandomSlide();
let leftSlide = getRandomSlide(initialSlide);
let rightSlide = getRandomSlide(initialSlide);
const SCROLL_STEP = 100 / cardCount;

const slidesNodes = [leftSlide, initialSlide, rightSlide].map((slide) => {
    return createCarouselSlide(slideIdCount++, '', slide.map(element => {
        return createCardElement(element);
    }));
});

SLIDER_CONTAINER.append(...slidesNodes);
SLIDER_CONTAINER.childNodes[0].style.left = `-${SCROLL_STEP}%`;
SLIDER_CONTAINER.childNodes[1].style.left = '0%';
SLIDER_CONTAINER.childNodes[2].style.left = `${SCROLL_STEP}%`;

LEFT_BUTTON.addEventListener('click',() => {
    SLIDER_CONTAINER.childNodes[1].style.left = `${SCROLL_STEP}%`;;
    SLIDER_CONTAINER.childNodes[0].style.left = '0%';
    rightSlide = initialSlide;
    initialSlide = leftSlide;
    leftSlide = getRandomSlide(initialSlide)

    const newSlide = createCarouselSlide(slideIdCount++, `-${SCROLL_STEP}%`,leftSlide.map(element => {
        return createCardElement(element);
    }));

    SLIDER_CONTAINER.prepend(newSlide);
    SLIDER_CONTAINER.removeChild(SLIDER_CONTAINER.childNodes[SLIDER_CONTAINER.childNodes.length - 1]);
});

RIGHT_BUTTON.addEventListener('click',() => {
    SLIDER_CONTAINER.childNodes[1].style.left = `-${SCROLL_STEP}%`;
    SLIDER_CONTAINER.childNodes[2].style.left = '0%';
    leftSlide = initialSlide;
    initialSlide = rightSlide;
    rightSlide = getRandomSlide(initialSlide);

    const newSlide = createCarouselSlide(slideIdCount++, `${SCROLL_STEP}%`, rightSlide.map(element => {
        return createCardElement(element);
    }));

    SLIDER_CONTAINER.removeChild(SLIDER_CONTAINER.childNodes[0]);
    SLIDER_CONTAINER.append(newSlide);
});

