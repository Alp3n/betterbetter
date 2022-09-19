// import { useState } from 'react';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import * as prismicH from '@prismicio/helpers';
import styled from '@emotion/styled';
import Image from './image';
import ModalWrapper from './modal-wrapper';
import Youtube from '../public/static/svg/youtube.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Zoom } from 'swiper';

const ModalBrand = ({ setIsOpen, item, nextItem, previouseItem }) => {
  if (!item) return null;

  return (
    <ModalWrapper
      item={item}
      nextItem={nextItem}
      previouseItem={previouseItem}
      setIsOpen={setIsOpen}
    >
      <ModalBody>
        {prismicH.isFilled.group(item.data.photoGallery) ? (
          <StyledGallery
            modules={[Autoplay]}
            slidesPerView='1'
            slidesPerGroup={1}
            speed={1000}
            watchSlidesProgress
            autoplay={{ delay: 3000, disableOnInteraction: true }}
          >
            {item.data.photoGallery.map((item, i) => (
              <SwiperSlide key={i}>
                <Image
                  src={item.photo.url}
                  alt={item.photo.alt}
                  layout='responsive'
                  width={item.photo.dimensions.width}
                  height={item.photo.dimensions.height}
                  quality={100}
                />
              </SwiperSlide>
            ))}
          </StyledGallery>
        ) : (
          <StyledImage>
            <Image
              src={item.data.image.url}
              alt={item.data.image.alt}
              layout='responsive'
              width={item.data.image.dimensions.width}
              height={item.data.image.dimensions.height}
            />
          </StyledImage>
        )}

        <StyledTitle>
          {/* <Image
            src={item.data.logo.url}
            alt={item.data.logo.alt}
            layout='responsive'
            width={item.data.image.dimensions.width}
            height={item.data.image.dimensions.height}
            quality={100}
          /> */}
          <PrismicRichText field={item.data.name} />
        </StyledTitle>
        <StyledDescription field={item.data.description} />

        {prismicH.isFilled.group(item.data.partners) &&
        item.data.partners[0].logo.dimensions ? (
          <StyledPartnersWrapper>
            {item.data.partners.map((partner, i) => (
              <StyledPartner key={i} field={partner.url}>
                <StyledPartnerImage
                  src={partner.logo.url}
                  alt={partner.logo.alt}
                  layout='responsive'
                  width={partner.logo.dimensions.width}
                  height={partner.logo.dimensions.height}
                  quality={100}
                />
              </StyledPartner>
            ))}
          </StyledPartnersWrapper>
        ) : null}
        {prismicH.isFilled.group(item.data.contacts) ? (
          <StyledContacts>
            {item.data.contacts.map((contact, i) => (
              <StyledContact key={i}>
                <StyledContactHeader>
                  <StyledBlackBox />
                  <StyledContactName field={contact.name} />
                </StyledContactHeader>
                <StyledContactInfo>
                  <PrismicRichText field={contact.phone} />
                  <PrismicRichText field={contact.email} />
                </StyledContactInfo>
              </StyledContact>
            ))}
          </StyledContacts>
        ) : null}
        <StyledURLWrapper>
          <StyledURL>
            <StyledBlackBox />
            <PrismicLink
              field={item.data.url}
              target='_blank'
              rel='noopener noreferrer'
            >
              Website
            </PrismicLink>
          </StyledURL>
          {prismicH.isFilled.link(item.data.youtube) && (
            <StyledURL>
              <StyledBlackBox>
                <Youtube width='28' height='28' viewBox='0 0 244 244' />
              </StyledBlackBox>
              <PrismicLink
                field={item.data.youtube}
                target='_blank'
                rel='noopener noreferrer'
              >
                {/* {item.data.url.url} */}
                YouTube
              </PrismicLink>
            </StyledURL>
          )}
        </StyledURLWrapper>
      </ModalBody>
    </ModalWrapper>
  );
};

export default ModalBrand;

const ModalBody = styled.div`
  display: grid;
  grid-template-areas:
    'image'
    'title'
    'description'
    'partners'
    'contacts'
    'url';
  gap: 2rem;
  grid-area: body;
  padding-bottom: 1rem;
  align-content: start;

  @media only screen and (min-width: 1102px) {
    position: relative;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'title image'
      'description image'
      'contacts partners'
      'url partners';
    gap: 1.5rem 3rem;
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

const StyledTitle = styled.div`
  /* height: 100px;
  width: 200px; */
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
  }
`;
const StyledContacts = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
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

  path {
    fill: white;
  }
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

const StyledURLWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  grid-area: url;
`;

const StyledURL = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr;
  align-items: center;
  gap: 1rem;
`;

const StyledPartnersWrapper = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, 100px);
  grid-area: partners;
`;

const StyledPartner = styled(PrismicLink)`
  width: 100px;
  place-self: start;
`;

const StyledGallery = styled(Swiper)`
  grid-area: image;
  /* max-height: 300px; */
  /* max-height: 300px; */
  /* height: 100%; */
  width: 100%;
  /* object-fit: ; */
`;

const StyledPartnerImage = styled(Image)`
  :hover {
    filter: invert(100%);
  }
`;
