import React from 'react';
import SuccessIcon from '../images/success-icon.svg';
import ErrorIcon from '../images/error-icon.svg';
import { InfoTooltipContext } from '../contexts/InfoTooltipContext';

function InfoTooltip({ onClose, status }) {
  const isOpen = React.useContext(InfoTooltipContext);

  React.useEffect(() => {
    console.log("InfoTooltip visible?", isOpen)
  }, [isOpen]);

  const icon = status === 'success' ? SuccessIcon : ErrorIcon
  const text = status === 'success' ? "Вы успешно зарегистрировались" :
    "Что-то пошло не так! Попробуйте ещё раз."
  return (
    <div className={`popup ${isOpen && 'popup_is-opened'}`}>
      <div className="popup__content">
        <form className="popup__form" noValidate>
          <button type="button" className="popup__close" onClick={onClose}></button>
          <div>
            <img className="popup__icon" src={icon} alt="" />
            <p className="popup__status-message">{text}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InfoTooltip;

