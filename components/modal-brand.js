import React, { useState, useEffect } from 'react';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import * as prismicH from '@prismicio/helpers';
import styled from '@emotion/styled';
import Image from './image';
import ModalWrapper from './modal-wrapper';
import Youtube from '../public/static/svg/youtube.svg';
import Instagram from '../public/static/svg/instagram.svg';
import Linkedin from '../public/static/svg/linkedin.svg';
import Facebook from '../public/static/svg/facebook.svg';
import Globe from '../public/static/svg/globe.svg';
import ArrowOut from '../public/static/svg/arrows-out.svg';
import ArrowIn from '../public/static/svg/arrows-in.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
const ModalBrand = ({
  setIsOpen,
  item,
  nextItem,
  previouseItem,
  firstItem,
  lastItem,
}) => {
  const [open, setOpen] = useState(false);
  const [smallSwiper, setSmallSwiper] = useState();

  useEffect(() => {
    setTimeout(() => {
      smallSwiper?.autoplay?.start();
    }, 100);
  }, [smallSwiper]);

  if (!item) return null;
  return (
    <ModalWrapper
      item={item}
      nextItem={nextItem}
      previouseItem={previouseItem}
      setIsOpen={setIsOpen}
      firstItem={firstItem}
      lastItem={lastItem}
    >
      {!open ? (
        <ModalBody>
          {prismicH.isFilled.group(item.data.photoGallery) && (
            <StyledSmallGallery
              modules={[Autoplay]}
              slidesPerView={1}
              speed={1000}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                loop: true,
              }}
              centeredSlides
              onBeforeInit={(swiper) => {
                setSmallSwiper(swiper);
              }}
            >
              <StyledBigSliderButton onClick={() => setOpen(true)}>
                <ArrowOut width='32' height='32' viewBox='0 0 242 244' />
              </StyledBigSliderButton>
              {item.data.photoGallery.map((item, i) => (
                <SwiperSlide key={i}>
                  <StyledImage>
                    <PrismicNextImage
                      field={item.photo}
                      layout='fill'
                      objectFit='contain'
                      quality={100}
                    />
                  </StyledImage>
                </SwiperSlide>
              ))}
            </StyledSmallGallery>
          )}
          <StyledTitle>
            <PrismicRichText field={item.data.name} />
          </StyledTitle>
          <StyledDescriptionWrapper>
            <StyledDescription field={item.data.description} />
          </StyledDescriptionWrapper>

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
            <StyledURL
              field={item.data.url}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='website'
            >
              <StyledBlackBox>
                <Globe width='28' height='28' viewBox='0 0 242 244' />
              </StyledBlackBox>
            </StyledURL>

            {prismicH.isFilled.link(item.data.youtube) && (
              <StyledURL
                field={item.data.youtube}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='youtube'
              >
                <StyledBlackBox>
                  <Youtube width='28' height='28' viewBox='0 0 242 244' />
                </StyledBlackBox>
              </StyledURL>
            )}
            {prismicH.isFilled.link(item.data.instagram) && (
              <StyledURL
                field={item.data.instagram}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='instagram'
              >
                <StyledBlackBox>
                  <Instagram width='28' height='28' viewBox='0 0 242 244' />
                </StyledBlackBox>
              </StyledURL>
            )}
            {prismicH.isFilled.link(item.data.facebook) && (
              <StyledURL
                field={item.data.facebook}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='facebook'
              >
                <StyledBlackBox>
                  <Facebook width='28' height='28' viewBox='0 0 242 244' />
                </StyledBlackBox>
              </StyledURL>
            )}
            {prismicH.isFilled.link(item.data.linkedin) && (
              <StyledURL
                field={item.data.linkedin}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='linkedin'
              >
                <StyledBlackBox>
                  <Linkedin width='28' height='28' viewBox='0 0 242 244' />
                </StyledBlackBox>
              </StyledURL>
            )}
          </StyledURLWrapper>
        </ModalBody>
      ) : (
        <StyledBigSliderWrapper>
          <StyledTitle>
            <PrismicRichText field={item.data.name} />
          </StyledTitle>
          {prismicH.isFilled.group(item.data.photoGallery) && (
            <StyledBigGallery
              modules={[Autoplay, Navigation]}
              navigation
              slidesPerView='1'
              centeredSlides={true}
              speed={1000}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
                loop: true,
              }}
            >
              <StyledBigSliderButton onClick={() => setOpen((prev) => false)}>
                <ArrowIn width='32' height='32' viewBox='0 0 242 244' />
              </StyledBigSliderButton>
              {item.data.photoGallery.map((item, i) => (
                <SwiperSlide key={i}>
                  <StyledBigSliderImage>
                    <PrismicNextImage
                      field={item.photo}
                      quality={100}
                      layout='fill'
                      objectFit='contain'
                    />
                  </StyledBigSliderImage>
                </SwiperSlide>
              ))}
            </StyledBigGallery>
          )}
        </StyledBigSliderWrapper>
      )}
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
  padding-bottom: 5rem;
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
    padding-bottom: 1rem;
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

const StyledDescriptionWrapper = styled.div`
  grid-area: description;
  display: grid;
  grid-template-columns: 1fr;
  /* overflow-y: none; */
  /* height: 260px; */

  @media only screen and (min-width: 640px) {
    overflow-y: auto;
    height: 260px;
  }
`;
const StyledDescription = styled(PrismicRichText)`
  grid-area: description;
`;

const StyledContacts = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, auto);
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
    '. info';
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
  grid-auto-flow: column;
  grid-area: url;
  place-content: start;
  gap: 1rem;
`;

const StyledURL = styled(PrismicLink)`
  /* display: grid; */
  align-items: center;
  gap: 1rem;
`;

const StyledPartnersWrapper = styled.div`
  display: grid;
  gap: 0 2rem;
  grid-template-columns: repeat(auto-fit, 100px);
  grid-area: partners;
`;

const StyledPartner = styled(PrismicLink)`
  width: 100px;
  place-self: start;
`;

const StyledSmallGallery = styled(Swiper)`
  grid-area: image;
  width: 100%;
`;

const StyledBigGallery = styled(Swiper)`
  grid-area: image;
  width: 100%;
`;
const StyledImage = styled.div`
  position: relative;
  grid-area: image;
  height: 300px;
  max-height: 420px;
  width: 100%;

  span > {
    /* object-fit: contain; */
  }

  @media only screen and (min-width: 1102px) {
    max-height: 420px;
    height: 100%;
  }
`;
const StyledPartnerImage = styled(Image)`
  :hover {
    filter: invert(100%);
  }
`;

const StyledBigSliderWrapper = styled.div`
  display: grid;
  grid-template-areas:
    'title'
    'image';
  gap: 2rem;
  grid-area: body;
  padding-bottom: 5rem;
  align-content: start;

  @media only screen and (min-width: 1102px) {
    position: relative;
    grid-template-columns: 1fr;
    grid-template-areas:
      'title'
      'image';
    gap: 1.5rem 3rem;
    padding-bottom: 1rem;
  }
`;

const StyledBigSliderImage = styled.div`
  position: relative;
  /* width: 40vw; */
  /* width: 300px; */
  height: 600px;
`;

const StyledBigSliderButton = styled.button`
  @media only screen and (max-width: 640px) {
    display: none;
  }

  position: absolute;
  bottom: 0;
  right: 0;
  display: grid;
  place-items: center;
  place-content: center;
  width: 46px;
  height: 46px;
  border: none;
  background: #000;
  z-index: 99;

  path {
    fill: #fff;
  }

  :hover {
    cursor: pointer;
    background-color: #b1b1b1;

    path {
      fill: #000;
    }
  }
`;
