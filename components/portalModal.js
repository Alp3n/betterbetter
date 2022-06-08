import React from 'react';
import styled from '@emotion/styled';
import 'wicg-inert';
import Portal from './portal';

const PortalModal = ({ open, onClose, locked, children }) => {
  const [active, setActive] = React.useState(false);
  const backdrop = React.useRef(null);

  React.useEffect(() => {
    const { current } = backdrop;

    const transitionEnd = () => setActive(open);

    const keyHandler = (e) =>
      !locked && [27].indexOf(e.which) >= 0 && onClose();

    const clickHandler = (e) => !locked && e.target === current && onClose();

    if (current) {
      current.addEventListener('transitionend', transitionEnd);
      current.addEventListener('click', clickHandler);
      window.addEventListener('keyup', keyHandler);
    }

    if (open) {
      window.setTimeout(() => {
        document.activeElement.blur();
        setActive(open);
        document.querySelector('#__next').setAttribute('inert', 'true');
        document.body.classList.add('portal-opened');
      }, 10);
    }

    return () => {
      if (current) {
        current.removeEventListener('transitionend', transitionEnd);
        current.removeEventListener('click', clickHandler);
      }
      document.querySelector('#__next').removeAttribute('inert');
      document.body.classList.remove('portal-opened');
      window.removeEventListener('keyup', keyHandler);
    };
  }, [open, locked, onClose]);

  return (
    <React.Fragment>
      {(open || active) && (
        <Portal className='modal-portal'>
          <Backdrop ref={backdrop} className={active && open && 'active'}>
            <Content className='modal-content'>{children}</Content>
          </Backdrop>
        </Portal>
      )}
    </React.Fragment>
  );
};

export default PortalModal;

const Backdrop = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(51, 51, 51, 0.3);
  backdrop-filter: blur(1px);
  opacity: 0;
  transition: all 100ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 200ms;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 1102px) {
    bottom: 0;
    top: 0;
    left: 0;
    transform: none;
    align-items: end;
  }
  & .modal-content {
    transform: translateY(100px);
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
  }

  &.active {
    transition-duration: 250ms;
    transition-delay: 0ms;
    opacity: 1;

    & .modal-content {
      transform: translateY(0);
      opacity: 1;
      transition-delay: 150ms;
      transition-duration: 350ms;
    }
  }
`;

const Content = styled.div`
  position: relative;
  box-sizing: border-box;
  min-height: 50px;
  max-height: 95%;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: white;
  overflow-y: auto;
  padding: 5%;
  @media only screen and (min-width: 1102px) {
    padding: 50px;
    min-height: 90%;
    min-width: 80%;
    max-height: 90%;
    max-width: 90%;
  }
`;
