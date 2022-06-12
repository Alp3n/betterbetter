import React from 'react';
import styled from '@emotion/styled';
import Image from '../../components/image';
import * as prismicH from '@prismicio/helpers';
import { PrismicRichText } from '@prismicio/react';
import Bounded from '../../components/bounded';

const PelnaSzerokosc = ({ slice }) => {
  const backgroundImage = slice.primary.image;
  return (
    <StyledSection>
      {prismicH.isFilled.image(backgroundImage) && (
        <StyledImage
          src={prismicH.asImageSrc(backgroundImage, {
            w: undefined,
            h: undefined,
          })}
          alt=''
          layout='fill'
          quality={85}
        />
      )}
      <StyledHeader>
        <StyledLine />
        <StyledBoundedHeader>
          <PrismicRichText field={slice.primary.description} />
        </StyledBoundedHeader>
      </StyledHeader>

      <StyledBoundedBody>
        <StyledBody>
          {slice.items.map((item) => (
            <StyledItem key={item.uid} href={`#${item.number[0].text}`}>
              <PrismicRichText field={item.number} />
              <PrismicRichText field={item.room} />
            </StyledItem>
          ))}
        </StyledBody>
      </StyledBoundedBody>
    </StyledSection>
  );
};

export default PelnaSzerokosc;

const StyledSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  place-content: space-between;
  height: 80vh;
  padding: 2rem 0;
  color: white;
  margin-bottom: 100px;
  @media only screen and (min-width: 640px) {
    place-content: flex-start;
    padding: 3rem 0;
    height: 700px;
    margin-bottom: 150px;
  }
  @media only screen and (min-width: 1712px) {
    height: 780px;
  }
`;

const StyledImage = styled(Image)`
  position: relative;
  object-fit: cover;
  pointer-events: none;
  user-select: none;
  z-index: -1;
`;

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 80% 1fr;
  align-items: center;
  @media only screen and (min-width: 640px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const StyledBoundedHeader = styled(Bounded)`
  position: relative;
  color: white;
  text-align: center;
  font-size: 1.2rem;
`;

const StyledLine = styled.div`
  border-top: 1px white solid;
  width: auto;
`;

const StyledBoundedBody = styled(Bounded)`
  position: relative;
  margin-left: 10%;
  @media only screen and (min-width: 640px) {
    margin-top: 200px;
    /* justify-items: space-between; */
  }
`;

const StyledBody = styled.div`
  @media only screen and (max-width: 640px) {
    grid-column: 2 / 2;
  }
  display: grid;
  gap: 2rem;

  div:nth-of-type(1) {
    opacity: 0;
    animation: fadein 1s ease-out forwards;
  }
  div:nth-of-type(2) {
    opacity: 0;
    animation: fadein 1s ease-out 0.5s forwards;
  }
  div:nth-of-type(3) {
    opacity: 0;
    animation: fadein 1s ease-out 1s forwards;
  }

  @media only screen and (min-width: 640px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rem;
  }
`;

const StyledItem = styled.a`
  display: grid;
  grid-template-columns: auto 1fr;
  flex-direction: row;
  align-items: baseline;
  transition: all 0.2s ease-in-out;
  text-transform: uppercase;
  user-select: none;
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }

  > h2 {
    font-size: 1.6rem;
    font-weight: 900;
  }

  > p {
    font-size: 5rem;
    font-weight: 900;
    margin-right: 1rem;
  }

  @keyframes fadein {
    0% {
      display: none;
      opacity: 0;
    }
    1% {
      display: block;
      opacity: 0;
    }
    100% {
      display: block;
      opacity: 1;
    }
  }

  @media only screen and (min-width: 640px) {
    grid-template-columns: 1fr;
    grid-template-rows: 10rem 10rem;
    align-items: baseline;
    > h2 {
      font-size: 2rem;
    }

    > p {
      font-family: 'Heebo';
      margin-left: none;
      font-size: 13rem;
      font-weight: 900;
      display: inline-block;
    }
  }
`;
