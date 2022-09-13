import React from 'react';
import styled from '@emotion/styled';
import * as prismicH from '@prismicio/helpers';
import { PrismicRichText, PrismicLink } from '@prismicio/react';
import Image from '../../components/image';

const GaleriaWydarzen = ({ slice }) => {
  const dateTransform = (date) => date.split('-').reverse().join('.');
  return (
    <StyledWrapper>
      {slice?.items?.map((item, i) => (
        <StyledItem key={i} order={i} field={item.eventLink} target='_blank'>
          {prismicH.isFilled.image(item.eventImage) && (
            <Image
              src={prismicH.asImageSrc(item.eventImage, {
                w: undefined,
                h: undefined,
              })}
              width={1200}
              height={600}
              alt={item.eventImage.alt}
              layout='responsive'
              quality={100}
            />
          )}
          {item?.eventName ? (
            <PrismicRichText
              field={item.eventName}
              components={{
                heading2: ({ children }) => (
                  <StyledHeading>{children}</StyledHeading>
                ),
              }}
            />
          ) : (
            <h2>Tu powinien być tytuł, sprawdź w CMS!</h2>
          )}
          {item?.eventDate && item?.eventTime ? (
            <StyledDateAndTime>
              <PrismicRichText field={item.eventTime} />
              <p>{dateTransform(item.eventDate)}</p>
            </StyledDateAndTime>
          ) : (
            <p>Tu powinna być czas i data, sprawdź w CMS!</p>
          )}
          {item?.eventDescription ? (
            <PrismicRichText field={item.eventDescription} />
          ) : (
            <p>Tu powinien być opis, sprawdź w CMS!</p>
          )}
        </StyledItem>
      ))}
    </StyledWrapper>
  );
};

export default GaleriaWydarzen;
const StyledWrapper = styled.div`
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: repeat(2, 1fr);
`;
const StyledItem = styled(PrismicLink)`
  display: grid;
  grid-template-columns: 1;
  grid-template-rows: auto;
  gap: 1.5rem;
  grid-column: 1 / -1;
  padding: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid black;
  transition: linear 100ms;
  :hover {
    background-color: black;
    color: white;
    cursor: pointer;
  }
  @media only screen and (min-width: 1102px) {
    ${({ order }) =>
      (order + 1) % 2 === 0 ? 'grid-column: 1' : 'grid-column: 2'};
  }
`;

const StyledHeading = styled.span`
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Gotham Black';
`;

const StyledDateAndTime = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;
