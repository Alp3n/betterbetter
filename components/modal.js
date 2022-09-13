// import { useState } from 'react';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import * as prismicH from '@prismicio/helpers';
import styled from '@emotion/styled';
import Image from './image';

const MyModal = ({ setIsOpen, item, nextItem, previouseItem }) => {
  if (!item) return null;
  //TODO FIX THIS SHIT LIKE NTOBETA OR JUST DIALOG
  return (
    <ModalBody>
      <StyledImage>
        <Image
          src={item.data.image.url}
          alt=''
          layout='responsive'
          width={item.data.image.dimensions.width}
          height={item.data.image.dimensions.height}
        />
      </StyledImage>
      <StyledTitle>
        <PrismicRichText field={item.data.name} />
      </StyledTitle>
      <StyledDescription field={item.data.description} />
      <StyledContacts>
        {prismicH.isFilled.group(item.data.contacts)
          ? item.data.contacts.map((contact) => (
              <StyledContact key={contact.name}>
                <StyledContactHeader>
                  <StyledBlackBox />
                  <StyledContactName field={contact.name} />
                </StyledContactHeader>
                <StyledContactInfo>
                  <PrismicRichText field={contact.phone} />
                  <PrismicRichText field={contact.email} />
                </StyledContactInfo>
              </StyledContact>
            ))
          : null}
      </StyledContacts>
      <StyledURL>
        <StyledBlackBox />
        <PrismicLink
          field={item.data.url}
          target='_blank'
          rel='noopener noreferrer'
        >
          WEBSITE
        </PrismicLink>
      </StyledURL>
      <ButtonsWrapper>
        <ArrowButton
          onClick={() => previouseItem()}
          color={'black'}
        >{`<`}</ArrowButton>
        <ArrowButton
          onClick={() => nextItem()}
          color={'white'}
        >{`>`}</ArrowButton>
        <CloseButton onClick={() => setIsOpen(false)}>x</CloseButton>
      </ButtonsWrapper>
    </ModalBody>
  );
};

export default MyModal;

const ModalBody = styled.div`
  display: grid;
  grid-template-areas:
    'image'
    'title'
    'description'
    'contacts'
    'url';
  gap: 2rem;
  @media only screen and (min-width: 1102px) {
    position: relative;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'title image'
      'description image'
      'contacts image'
      'url image';
    gap: 3rem 6rem;
  }
`;

const ButtonsWrapper = styled.div`
  position: sticky;
  display: grid;
  grid-template-columns: 1fr 1fr 60px;
  width: 100%;
  bottom: 0;
  right: 0;
  box-shadow: 0 2px 10px rgb(0 0 0 / 0.2);

  @media only screen and (min-width: 1102px) {
    position: fixed;
    grid-template-columns: 60px 60px 60px;
    width: 180px;
    left: 50%;
    margin-left: -90px;
    bottom: 1rem;
    /* height: 1px; */
  }
`;
const ArrowButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  width: 100%;
  height: 100%;
  ${({ color }) =>
    color === 'black'
      ? 'background-color: black; color: white;'
      : 'background-color: white; color: black;'};
  @media only screen and (min-width: 1102px) {
    width: 60px;
    padding: 8px;

    :hover {
      cursor: pointer;
      background-color: #b1b1b1;
    }
  }
`;
const CloseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background-color: black;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  border: none;

  :hover {
    background-color: #b1b1b1;
    cursor: pointer;
  }
  @media only screen and (min-width: 1102px) {
    position: relative;
    width: 100%;
    /* padding: 3rem; */
  }
`;

const StyledTitle = styled.span`
  > p {
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: bold;
  }
  grid-area: title;
`;
const StyledDescription = styled(PrismicRichText)`
  grid-area: description;
`;
const StyledImage = styled.div`
  position: relative;
  /* background-color: grey; */
  grid-area: image;

  > span {
    object-fit: contain;
  }

  @media only screen and (min-width: 1102px) {
    height: 100%;
    grid-template-columns: 1fr 1fr;
  }
`;
const StyledContacts = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-area: contacts;
  gap: 2rem;
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
  gap: 1rem;
  grid-template-columns: 30px 1fr;
  grid-template-areas:
    'header header'
    'info info';
`;

const StyledContactHeader = styled.div`
  display: grid;
  align-items: center;
  gap: 1rem;
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
  gap: 1rem;
  grid-area: url;
`;
