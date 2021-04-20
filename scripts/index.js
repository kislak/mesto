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
