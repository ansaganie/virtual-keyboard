const MODAL = document.querySelector('.modal');
const BUTTON = document.querySelector('.modal__close-btn');
const BLACKOUT = document.querySelector('.modal__blackout');
const CONTENT = document.querySelector('.modal__content');
const CONTENT_WRAPPER = document.querySelector('.content__wrapper');

const createBigCard = ({
    name,
    img,
    type,
    breed,
    description,
    age,
    inoculations,
    diseases,
    parasites
}) => {
    const div = document.createElement('div');

    div.insertAdjacentHTML("afterbegin", `
        <article class="big-card">
            <div class="big-card__left">
                <img
                    src="${img}"
                    alt="${name}"
                    width="500"
                    height="500"
                >
            </div>
            
            <div class="big-card__right">
                <h2 class="big-card__name">${name}</h2>
                <p class="big-card__breed">${type} - ${breed}</p>
                <p class="big-card__description">${description}</p>
                <ul class="details big-card__details">
                    <li class="details__item">
                    <b>Age: </b> ${age}
                    </li>
                    <li class="details__item">
                    <b>Inoculations: </b> ${inoculations}
                    </li>
                    <li class="details__item">
                    <b>Diseases: </b> ${diseases}
                    </li>
                    <li class="details__item">
                    <b>Parasites: </b> ${parasites}
                    </li>
                </ul>
            </div>
        </article>
    `.trim());

    return div.firstChild;
}

const openModal = () => {
    document.body.classList.add('overflow-hidden');
    MODAL.classList.add('modal--open');
}

const closeModal = () => {
    document.body.classList.remove('overflow-hidden');
    MODAL.classList.remove('modal--open');
}

BUTTON.addEventListener('click', () => {
    closeModal();
});

BLACKOUT.addEventListener('click', () => {
    closeModal();
});

BLACKOUT.addEventListener('mouseover', (evt) => {
    if (evt.target.id === 'modal-blackout') {
        BLACKOUT.classList.add('modal__blackout--hover');
        BUTTON.classList.add('controller--active');
    } else {
        BLACKOUT.classList.remove('modal__blackout--hover');
        BUTTON.classList.remove('controller--active');
    }
});

CONTENT.addEventListener('click', (evt) => {
    evt.stopPropagation();
});

document.addEventListener('modal-open', (evt) => {
    const petId = evt.detail.petId;
    const pet = window.pets.find(({ id }) => id === petId);
    CONTENT_WRAPPER.innerHTML = '';

    if (pet) {
        const contentNode = createBigCard(pet);
        CONTENT_WRAPPER.appendChild(contentNode)

        openModal();
    }
});