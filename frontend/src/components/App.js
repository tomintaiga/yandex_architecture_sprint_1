import React from 'react';
import { Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header";
import Main from "m_list/Main";
import Footer from "./Footer";
import PopupWithForm from "m_popup/PopupWithForm";
import ImagePopup from "m_popup/ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "m_popup/EditProfilePopup";
import EditAvatarPopup from "m_popup/EditAvatarPopup";
import AddPlacePopup from "m_popup/AddPlacePopup";
import Register from "m_register/Register";
import Login from "m_register/Login";
import InfoTooltip from "m_popup/InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import api from "api";
import * as auth from "auth";
import { AddPlacePopupContext } from "m_popup/AddPlacePopupContext";
import { EditAvatarPopupContext } from "m_popup/EditAvatarPopupContext";
import { EditProfilePopupContext } from "m_popup/EditProfilePopupContext";
import { ImagePopupContext } from "m_popup/ImagePopupContext";
import { InfoTooltipContext } from "m_popup/InfoTooltipContext";


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
  const [currentUser, setCurrentUser] = React.useState({});

  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //В компоненты добавлены новые стейт-переменные: email — в компонент App
  const [email, setEmail] = React.useState("");

  const history = useHistory();

  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
      .getAppInfo()
      .then(([cardData, userData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [history]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    console.log("Popup: open edit profile");
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    console.log("Popup: open add place");
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    console.log("Popup: open edit avatar");
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard(null);
    console.log("Popup: close all popup");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    console.log("Popup: select card", card);
  }

  function handleUpdateUser(userUpdate) {
    api
      .setUserInfo(userUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarUpdate) {
    api
      .setUserAvatar(avatarUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((newCardFull) => {
        setCards([newCardFull, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function onRegister({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        setTooltipStatus("success");
        setIsInfoToolTipOpen(true);
        history.push("/signin");
      })
      .catch((err) => {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
        // TODO: Need to show user some errors
        console.log("Can't register: ", err);
      });
  }

  function onLogin({ email, password }) {
    auth
      .login(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        setEmail(email);
        history.push("/");
      })
      .catch((err) => {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
        // TODO: Need to show user some errors
        console.log("Can't login: ", err)
      });
  }

  function onSignOut() {
    // при вызове обработчика onSignOut происходит удаление jwt
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    history.push("/signin");
  }

  return (
    // В компонент App внедрён контекст через CurrentUserContext.Provider
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header email={email} onSignOut={onSignOut} />
        <Switch>
          {/*Роут / защищён HOC-компонентом ProtectedRoute*/}
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={isLoggedIn}
          />
          {/*Роут /signup и /signin не является защищёнными, т.е оборачивать их в HOC ProtectedRoute не нужно.*/}
          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogin={onLogin} />
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopupContext.Provider value={isEditProfilePopupOpen}>
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
          />
        </EditProfilePopupContext.Provider>
        <AddPlacePopupContext.Provider value={isAddPlacePopupOpen}>
          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
          />
        </AddPlacePopupContext.Provider>
        <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
        <EditAvatarPopupContext.Provider value={isEditAvatarPopupOpen}>
          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllPopups}
          />
        </EditAvatarPopupContext.Provider>
        <ImagePopupContext.Provider value={selectedCard}>
          <ImagePopup onClose={closeAllPopups} />
        </ImagePopupContext.Provider>
        <InfoTooltipContext.Provider value={isInfoToolTipOpen}>
          <InfoTooltip
            onClose={closeAllPopups}
            status={tooltipStatus}
          />
        </InfoTooltipContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
