const editProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfileForm = editProfilePopup.querySelector('.popup__container');
const nameInput = editProfileForm.querySelector('.popup__field_name_name');
const titleInput =  editProfileForm.querySelector('.popup__field_name_title');
const name = document.querySelector('.profile__name-text');
const title = document.querySelector('.profile__title');
const closeProfileButton = editProfilePopup.querySelector('.popup__close');

const openProfileForm = () => {
    nameInput.value = name.textContent;
    titleInput.value = title.textContent;
    editProfilePopup.classList.add('popup_opened');
}

const closeProfileForm = () => {
    editProfilePopup.classList.remove('popup_opened');
}

const submitProfileForm = (evt) => {
    evt.preventDefault();
    name.textContent = nameInput.value;
    title.textContent = titleInput.value;
    closeProfileForm();
}

editProfileButton.addEventListener('click', openProfileForm);
closeProfileButton.addEventListener('click', closeProfileForm);
editProfileForm.addEventListener('submit', submitProfileForm);


const elementTemplate = document.querySelector('#element-template').content;
const elementsList = document.querySelector('.elements__list');
const picturePopup = document.querySelector('.popup_type_image')
const picturePopupImage = picturePopup.querySelector('.popup__image')
const picturePopupImageName = picturePopup.querySelector('.popup__image-name')

const closePictureButton = picturePopup.querySelector('.popup__close');

const closePicture = () => {
    picturePopup.classList.remove('popup_opened');
}

closePictureButton.addEventListener('click', closePicture);

const createCard = (name, link) => {
    const card = elementTemplate.querySelector('.element').cloneNode(true);
    const picture = card.querySelector('.element__picture');
    const title = card.querySelector('.element__title')
    const heart = card.querySelector('.element__heart')
    const deleteButton = card.querySelector('.element__delete-button')

    title.textContent = name;
    picture.src = link;
    picture.alt = name;

    picture.addEventListener('click', function (evt) {
        picturePopupImage.src = link
        picturePopupImage.alt = name;
        picturePopupImageName.textContent = name;
        picturePopup.classList.add('popup_opened');
    });

    heart.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__heart_active')
    });

    deleteButton.addEventListener('click', function (evt) {
        const card = evt.target.closest('.element');
        card.parentNode.removeChild(placeElement);
    });

    return card
}

const addCard = (card) => {
    elementsList.prepend(card);
}

initialCards.reverse().forEach((item) => {
    const card = createCard(item.name, item.link);
    addCard(card)
})

const addPlaceButton = document.querySelector('.profile__add-button');
const addPlacePopup = document.querySelector('.popup_type_add-place');
const addPlaceForm = addPlacePopup.querySelector('.popup__container');
const placeNameInput = addPlaceForm.querySelector('.popup__field_name_name');
const placeLinkInput =  addPlaceForm.querySelector('.popup__field_name_link');
const closeAddPlaceButton = addPlacePopup.querySelector('.popup__close');

const openAddPlaceForm = () => {
    placeNameInput.value = "";
    placeLinkInput.value = "";
    addPlacePopup.classList.add('popup_opened');
}

const closeAddPlaceForm = () => {
    addPlacePopup.classList.remove('popup_opened');
}

const submitPlaceForm = (evt) => {
    evt.preventDefault();
    const card = createCard(placeNameInput.value, placeLinkInput.value);
    addCard(card);
    closeAddPlaceForm();
}

addPlaceButton.addEventListener('click', openAddPlaceForm);
closeAddPlaceButton.addEventListener('click', closeAddPlaceForm);
addPlaceForm.addEventListener('submit', submitPlaceForm);
