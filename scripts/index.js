const editProfileButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit-profile');
const profileForm = profilePopup.querySelector('.popup__container');
const profileNameField = profileForm.querySelector('.popup__field_name_name');
const profileTitleField =  profileForm.querySelector('.popup__field_name_title');
const profileName = document.querySelector('.profile__name-text');
const profileTitle = document.querySelector('.profile__title');
const closeProfilePopupButton = profilePopup.querySelector('.popup__close');

const openPopup = (popup) => popup.classList.add('popup_opened') ;
const closePopup = (popup) => popup.classList.remove('popup_opened');

const openProfilePopup = () => {
    profileNameField.value = profileName.textContent;
    profileTitleField.value = profileTitle.textContent;
    openPopup(profilePopup);
}

const submitProfile = (evt) => {
    evt.preventDefault();
    profileName.textContent = profileNameField.value;
    profileTitle.textContent = profileTitleField.value;
    closePopup(profilePopup);
}

editProfileButton.addEventListener('click', openProfilePopup);
closeProfilePopupButton.addEventListener('click', () =>  { closePopup(profilePopup) });
profileForm.addEventListener('submit', submitProfile);

const elementTemplate = document.querySelector('#element-template').content;
const elementsList = document.querySelector('.elements__list');
const picturePopup = document.querySelector('.popup_type_image')
const picturePopupImage = picturePopup.querySelector('.popup__image')
const picturePopupImageName = picturePopup.querySelector('.popup__image-name')
const closePicturePopupButton = picturePopup.querySelector('.popup__close');

closePicturePopupButton.addEventListener('click', () => closePopup(picturePopup));

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
        evt.target.closest('.element').remove();
    });

    return card
}

const addCard = (card) => elementsList.prepend(card);

initialCards.reverse().forEach((item) => {
    const card = createCard(item.name, item.link);
    addCard(card)
})

const addPlaceButton = document.querySelector('.profile__add-button');
const placePopup = document.querySelector('.popup_type_add-place');
const placeForm = placePopup.querySelector('.popup__container');
const placeNameInput = placeForm.querySelector('.popup__field_name_name');
const placeLinkInput =  placeForm.querySelector('.popup__field_name_link');

const openPlaceForm = () => {
    placeNameInput.value = "";
    placeLinkInput.value = "";
    openPopup(placePopup)
}
addPlaceButton.addEventListener('click', openPlaceForm);

const submitPlaceForm = (evt) => {
    evt.preventDefault();
    const card = createCard(placeNameInput.value, placeLinkInput.value);
    addCard(card);
    closePopup(placePopup)
}
placeForm.addEventListener('submit', submitPlaceForm);

const closePlacePopupButton = placePopup.querySelector('.popup__close');
closePlacePopupButton.addEventListener('click', () => closePopup(placePopup));
