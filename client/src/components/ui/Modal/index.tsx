import React from 'react';

import './_modal.scss';

export type BackdropProps = {
  onClose: () => void;
};

type ModalOverlayProps = {
  children: JSX.Element;
};

const Backdrop = ({ onClose }: BackdropProps) => {
  return (
    <div
      className='backdrop'
      aria-hidden='true'
      onClick={onClose}
      onKeyDown={onClose}
    />
  );
};

const ModalOverlay = ({ children }: ModalOverlayProps) => {
  return (
    <div className='modal'>
      <div className='content'>{children}</div>
    </div>
  );
};

const Modal = ({ onClose, children }: BackdropProps & ModalOverlayProps) => {
  return (
    <>
      <Backdrop onClose={onClose} />
      <ModalOverlay>{children}</ModalOverlay>
    </>
  );
};

export default Modal;
