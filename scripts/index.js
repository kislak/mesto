let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container');

let nameInput = formElement.querySelector('.popup__field_name_name');
let titleInput =  formElement.querySelector('.popup__field_name_title');
let name = document.querySelector('.profile__name-text');
let title = document.querySelector('.profile__title');

let closeButton = document.querySelector('.popup__close');

const openForm = () => {
    nameInput.value = name.textContent;
    titleInput.value = title.textContent;
    popup.classList.add('popup_opened');
}

const closeForm = () => {
    popup.classList.remove('popup_opened');
}

const submitForm = (evt) => {
    evt.preventDefault();
    name.textContent = nameInput.value;
    title.textContent = titleInput.value;
    closeForm();
}

formElement.addEventListener('submit', submitForm);
editButton.addEventListener('click', openForm);
closeButton.addEventListener('click', closeForm);

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


const elementTemplate = document.querySelector('#element-template').content;
const elementsList = document.querySelector('.elements__list');

initialCards.forEach((item) => {
    const userElement = elementTemplate.querySelector('.element').cloneNode(true);
    userElement.querySelector('.element__picture').src = item.link;
    userElement.querySelector('.element__picture').alt = item.name;
    userElement.querySelector('.element__title').textContent = item.name;
    elementsList.append(userElement);
})


