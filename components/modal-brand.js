import { PrismicLink, PrismicRichText } from '@prismicio/react';
import * as prismicH from '@prismicio/helpers';
import styled from '@emotion/styled';
import Image from './image';
import ModalWrapper from './modal-wrapper';
import Youtube from '../public/static/svg/youtube.svg';
import Instagram from '../public/static/svg/instagram.svg';
import Linkedin from '../public/static/svg/linkedin.svg';
import Facebook from '../public/static/svg/facebook.svg';
import Globe from '../public/static/svg/globe.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import IconButton from './icon-button';

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
                <StyledImage>
                  <Image
                    src={item.photo.url}
                    alt={item.photo.alt}
                    layout='intrinsic'
                    width={item.photo.dimensions.width}
                    height={item.photo.dimensions.width}
                    quality={100}
                  />
                </StyledImage>
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
              field={item.data.youtube}
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
              field={item.data.youtube}
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
              field={item.data.youtube}
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
  width: 100%;
`;
const StyledImage = styled.div`
  position: relative;
  background-color: #f0f0f0;
  grid-area: image;
  max-height: 420px;

  span > {
    object-fit: contain;
  }

  @media only screen and (min-width: 1102px) {
    /* height: 300px; */
  }
`;
const StyledPartnerImage = styled(Image)`
  :hover {
    filter: invert(100%);
  }
`;
