const createCardElement = (pet) => {
    const div = document.createElement('div');

    div.insertAdjacentHTML("afterbegin", `
        <article class="card slider__card" id="card-${pet.id}">
            <img 
                class="card__image"
                src="${pet.img}"
                alt="${pet.name}"
                width="270"
                height="270"
            >
            <h4 class="card__name">${pet.name}</h4>
            <button class="card__button">Learn more</button>
        </article>
    `.trim());

    div.firstChild.addEventListener('click', () => {
        const modalEvent = new CustomEvent('modal-open', {
            detail: { petId: pet.id }
        })

        console.log(pet);

        document.dispatchEvent(modalEvent);
    });

    return div.firstChild;
}