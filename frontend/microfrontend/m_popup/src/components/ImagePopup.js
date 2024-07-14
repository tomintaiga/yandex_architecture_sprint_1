import React from 'react';
import { ImagePopupContext } from "../contexts/ImagePopupContext";
import "../index.css";
import "../blocks/popup/_is-opened/popup_is-opened.css";

function ImagePopup({ onClose }) {

  const card = React.useContext(ImagePopupContext);

  React.useEffect(() => {
    console.log("ImagePopup visible?", card ? "true" : "false");
  }, [card]);

  return (
    <div className={`popup popup_type_image ${card ? 'popup_is-opened' : ''}`}>
      <div className="popup__content popup__content_content_image">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img alt={card ? card.name : ''} src={card ? card.link : ''} className="popup__image" />
        <p className="popup__caption">{card ? card.name : ''}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
