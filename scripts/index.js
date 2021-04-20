let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container');

let nameInput = formElement.querySelector('.popup__field_name');
let titleInput =  formElement.querySelector('.popup__field_title');
let name = document.querySelector('.profile__name-text');
let title = document.querySelector('.profile__title');

let closeButton = document.querySelector('.popup__close');

function openForm(evt) {
    evt.preventDefault();
    nameInput.value = name.textContent;
    titleInput.value = title.textContent;
    popup.classList.add('popup_opened')
}
editButton.addEventListener('click', openForm)

function submitForm (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    title.textContent = titleInput.value;
    closeForm();
}
formElement.addEventListener('submit', submitForm);

function closeForm() {
    popup.classList.remove('popup_opened')
}
closeButton.addEventListener('click', closeForm);
