const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector('#card-template').content;
 
const openEditedPopup = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup-profile");
const popupButtonClose = document.querySelector(".popup__close");
const submitButton = document.querySelector(".popup__button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const userNameInput = document.querySelector(".popup__input_type_name");
const profileAboutInput = document.querySelector(".popup__input_type_about");
const inputsElement = document.querySelector('.popup__inputs');
 
const addButton = document.querySelector('.profile__add-button');
const newPlace = document.querySelector('.popup_card-add')
const popupClose = document.querySelector(".popup__close_card-add");
const nameInput = document.querySelector('.popup__input_name');
const urlInput = document.querySelector('.popup__input_url');
const formsElement = document.querySelector('.popup__forms');
 
const popupZoomImage = document.querySelector(".popup_zoom-image");
const imageCloseButton = popupZoomImage.querySelector('.popup__close_zoom-image');
const imgElement = popupZoomImage.querySelector('.popup__image');
const captionElement = popupZoomImage.querySelector('.popup__caption');

const initialCards = [
  {
    name: 'Москва',
    link: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1949&q=80'
  },
  {
    name: 'Севастополь',
    link: 'https://images.unsplash.com/photo-1660817322651-d57a2d019590?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3174&q=80'
  },
  {
    name: 'Казань',
    link: 'https://images.unsplash.com/photo-1504615458222-979e04d69a27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3576&q=80'
  },
  {
    name: 'Ялта',
    link: 'https://images.unsplash.com/photo-1624571149875-59a402116d88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3463&q=80'
  },
  {
    name: 'Ставрополь',
    link: 'https://images.unsplash.com/photo-1660492038981-583048b6e5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1610045129185-a421e70e755f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1617&q=80'
  },
];

const cards = initialCards.reverse();

const openPopup = (popup) => {
  popupProfile.classList.add('popup_opened');
}; 

openEditedPopup.addEventListener('click', function() {
  openPopup(popupProfile);
  userNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
});

const closePopup = (popup) => {
  popupProfile.classList.remove("popup_opened")
};

const toggleLikeButton = (likeButton) => () => {
  likeButton.classList.toggle('elements__like-button_active');
}

const toggleTrashActive = (cardElement) => () => {
  cardElement.remove();
}
 
const openImagePopup = (name, link) => () => {
  imgElement.src = link;
  imgElement.alt = name;
 
  captionElement.textContent = name;
 
  popupZoomImage.classList.add("popup_opened");
}
 
const closeImagePopup = () => {
  popupZoomImage.classList.remove("popup_opened");
}
 
function editinProfileName(evt) {
  evt.preventDefault();
 
  profileName.textContent = userNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
 
  closePopup();
}
 
const toggleOpenPopupNewPlace = () => {
	newPlace.classList.toggle('popup_opened');
}
 
const handlerOpenAddButtonClick = () => {
	toggleOpenPopupNewPlace();
}
 
const handlerCloseAddButtonClick = () => {
	toggleOpenPopupNewPlace();
}
 
const addCard = (evt) => {
	evt.preventDefault();
 
	renderCard({
		name: nameInput.value,
		link: urlInput.value,
	  });
 
	  evt.target.reset();
	  toggleOpenPopupNewPlace();
}

function createCard({name, link,}) {
  const cardElement = cardTemplate.querySelector(".elements__card").cloneNode(true);
  const trashButton = cardElement.querySelector('.elements__trash');
  const likeButton = cardElement.querySelector('.elements__like-button');
  const cardImage = cardElement.querySelector(".elements__image");
  const cardTitle = cardElement.querySelector(".elements__title");
 
  cardTitle.textContent = name;
  cardImage.src = link;
 
  trashButton.addEventListener('click', toggleTrashActive(cardElement));
  likeButton.addEventListener('click', toggleLikeButton(likeButton));
  cardImage.addEventListener('click', openImagePopup(name, link));
  return cardElement;
}

function renderCard({ name, link }) {
  cardsContainer.prepend(createCard({name, link}));
}
 
function render() {
  cards.forEach(renderCard);
}
 
openEditedPopup.addEventListener("click", openPopup);
popupButtonClose.addEventListener("click", closePopup);
inputsElement.addEventListener("submit", editinProfileName);
 
addButton.addEventListener('click', handlerOpenAddButtonClick);
popupClose.addEventListener('click', handlerCloseAddButtonClick);
formsElement.addEventListener('submit', addCard);
 
imageCloseButton.addEventListener('click', closeImagePopup);
 
render();