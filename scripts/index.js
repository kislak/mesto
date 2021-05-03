let editProfileButton = document.querySelector('.profile__edit-button');
let editProfilePopup = document.querySelector('.popup_type_edit-profile');
let editProfileForm = editProfilePopup.querySelector('.popup__container');

let nameInput = editProfileForm.querySelector('.popup__field_name_name');
let titleInput =  editProfileForm.querySelector('.popup__field_name_title');
let name = document.querySelector('.profile__name-text');
let title = document.querySelector('.profile__title');
let closeProfileButton = editProfilePopup.querySelector('.popup__close');

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

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


let elementTemplate = document.querySelector('#element-template').content;
let elementsList = document.querySelector('.elements__list');
let picturePopup = document.querySelector('.popup_type_image')
let closePictureButton = picturePopup.querySelector('.popup__close');

const closePicture = () => {
    picturePopup.classList.remove('popup_opened');
}

closePictureButton.addEventListener('click', closePicture);

const addElement = (name, link) => {
    let placeElement = elementTemplate.querySelector('.element').cloneNode(true);

    placeElement.querySelector('.element__picture').src = link;
    placeElement.querySelector('.element__picture').alt = name;
    placeElement.querySelector('.element__title').textContent = name;
    placeElement.querySelector('.element__heart').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__heart_active')
    });
    placeElement.querySelector('.element__delete-button').addEventListener('click', function (evt) {
        let placeElement = evt.target.closest('.element');
        placeElement.parentNode.removeChild(placeElement);
    });

    placeElement.querySelector('.element__picture').addEventListener('click', function (evt) {
        picturePopup.querySelector('.popup__image').src = link
        picturePopup.querySelector('.popup__image').alt = name;
        picturePopup.querySelector('.popup__image-name').textContent = name;
        picturePopup.classList.add('popup_opened');
    });

    elementsList.prepend(placeElement);
}

initialCards.reverse().forEach((item) => {
    addElement(item.name, item.link);
})

let addPlaceButton = document.querySelector('.profile__add-button');
let addPlacePopup = document.querySelector('.popup_type_add-place');
let addPlaceForm = addPlacePopup.querySelector('.popup__container');

let placeNameInput = addPlaceForm.querySelector('.popup__field_name_name');
let placeLinkInput =  addPlaceForm.querySelector('.popup__field_name_link');
let closeAddPlaceButton = addPlacePopup.querySelector('.popup__close');

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
    addElement(placeNameInput.value, placeLinkInput.value);
    closeAddPlaceForm();
}

addPlaceButton.addEventListener('click', openAddPlaceForm);
closeAddPlaceButton.addEventListener('click', closeAddPlaceForm);
addPlaceForm.addEventListener('submit', submitPlaceForm);
