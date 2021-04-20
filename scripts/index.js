let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container');

editButton.addEventListener('click', function () {
  let name = document.querySelector('.profile__name-text');
  let title = document.querySelector('.profile__title');
  let nameInput = formElement.querySelector('[name="name"]');
  let titleInput =  formElement.querySelector('[name="title"]');

  nameInput.value = name.textContent;
  titleInput.value = title.textContent;
  popup.classList.toggle('popup_opened')
})

function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameInput = formElement.querySelector('[name="name"]');
    let titleInput =  formElement.querySelector('[name="title"]');
    let name = document.querySelector('.profile__name-text');
    let title = document.querySelector('.profile__title');

    name.textContent = nameInput.value;
    title.textContent = titleInput.value;
    popup.classList.toggle('popup_opened')
}
formElement.addEventListener('submit', formSubmitHandler);

function closeHandler (evt) {
    evt.preventDefault();
    popup.classList.toggle('popup_opened')
}
let closeButton = document.querySelector('.popup__close');
closeButton.addEventListener('click', closeHandler);
