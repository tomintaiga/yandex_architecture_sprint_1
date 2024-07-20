import React from 'react';
import PopupWithForm from 'm_main/PopupWithForm';
import { EditAvatarPopupContext } from '../contexts/EditAvatarPopupContext';

function EditAvatarPopup({ onUpdateAvatar, onClose }) {
  const inputRef = React.useRef();

  const isOpen = React.useContext(EditAvatarPopupContext);

  React.useEffect(() => {
    console.log("EditAvatarPopup visible?", isOpen)
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} title="Обновить аватар" name="edit-avatar"
    >

      <label className="popup__label">
        <input type="url" name="avatar" id="owner-avatar"
               className="popup__input popup__input_type_description" placeholder="Ссылка на изображение"
               required ref={inputRef} />
        <span className="popup__error" id="owner-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
