import { useState } from 'react';
import styled from '@emotion/styled';
import Modal from 'react-modal';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import Image from './image';

const MyModal = ({ isOpen, onRequestClose, item }) => {
  Modal.setAppElement('#__next');
  console.log(item);
  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      preventScroll={true}
      parentSelector={() => document.querySelector('#__next')}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
      }}
    >
      <ModalBody>
        <StyledImage>
          <Image src={item.image.url} alt='' layout='fill' />
        </StyledImage>
        <StyledTitle field={item.brandName} />
        <StyledDescription field={item.description} />
        <StyledContacts>
          {item.brandContactOnePerson ? (
            <StyledContact>
              <StyledContactHeader>
                <StyledBlackBox />
                <StyledContactName field={item.brandContactOnePerson} />
              </StyledContactHeader>
              <StyledContactInfo>
                <PrismicRichText field={item.brandContactOnePhone} />
                <PrismicRichText field={item.brandContactOneEmail} />
              </StyledContactInfo>
            </StyledContact>
          ) : null}
          {item.brandContactTwoPerson ? (
            <StyledContact>
              <StyledContactHeader>
                <StyledBlackBox />
                <StyledContactName field={item.brandContactTwoPerson} />
              </StyledContactHeader>
              <StyledContactInfo>
                <PrismicRichText field={item.brandContactTwoPhone} />
                <PrismicRichText field={item.brandContactTwoEmail} />
              </StyledContactInfo>
            </StyledContact>
          ) : null}
        </StyledContacts>
        <StyledURL>
          <StyledBlackBox />
          <PrismicLink field={item.url}>ragno.it</PrismicLink>
        </StyledURL>
      </ModalBody>
      <CloseButton onClick={onRequestClose}>X</CloseButton>
    </StyledModal>
  );
};

export default MyModal;

const StyledModal = styled(Modal)`
  position: relative;
  display: grid;
  place-content: center;
  gap: 1rem;
  /* padding: 1rem; */
  @media only screen and (min-width: 1102px) {
    top: 3%;
    padding: 4rem;
    grid-template-columns: 1fr 96px;
  }
`;

const ModalBody = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(500px, 1fr);
  grid-template-areas:
    'image'
    'title'
    'description'
    'contacts'
    'url';
  width: 100%;
  height: 70vh;
  background-color: white;
  padding: 3rem 3rem 3rem 10rem;
  @media only screen and (min-width: 1102px) {
    height: auto;
    grid-template-areas:
      'title image'
      'description image'
      'contacts image'
      'url image';
    gap: 3rem 6rem;
  }
`;

const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 96px;
  background-color: white;
  border: none;
  padding: 3rem;

  :hover {
    color: black;
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

const StyledTitle = styled(PrismicRichText)`
  p {
    font-size: 4rem !important;
  }
  grid-area: title;
`;
const StyledDescription = styled(PrismicRichText)`
  grid-area: description;
`;
const StyledImage = styled.div`
  position: relative;

  background-color: grey;
  width: auto;
  height: 320px;
  grid-area: image;

  @media only screen and (min-width: 1102px) {
    height: 580px;
    grid-template-columns: 1fr 1fr;
  }
`;
const StyledContacts = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-area: contacts;

  @media only screen and (min-width: 1102px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StyledBlackBox = styled.div`
  width: 30px;
  height: 30px;
  background-color: #000;
`;

const StyledContact = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 30px 1fr;
  grid-template-areas:
    'header header'
    '. info';
`;

const StyledContactHeader = styled.div`
  display: grid;
  align-items: center;
  gap: 2rem;
  grid-template-columns: 30px 1fr;
  grid-area: header;
`;

const StyledContactName = styled(PrismicRichText)``;

const StyledContactInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-area: info;
`;

const StyledURL = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr;
  align-items: center;
  gap: 2rem;
  grid-area: url;
`;
