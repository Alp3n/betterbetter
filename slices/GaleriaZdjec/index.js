import React from 'react';
import { PrismicNextImage } from '@prismicio/next';
import * as prismicH from '@prismicio/helpers';
import styled from '@emotion/styled';
import Image from '../../components/image';

const GaleriaZdjec = ({ slice, context }) => {
  return (
    <ImagesSide
      priceList={context.title[0].text === 'co-working' ? true : false}
    >
      {slice.items.map((item, i) => (
        <ImageWrapper gridArea={item.gridArea} key={i}>
          <PrismicNextImage field={item.image} quality={100} />
        </ImageWrapper>
      ))}
    </ImagesSide>
  );
};

export default GaleriaZdjec;

const ImagesSide = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 45vw);
  gap: 1rem 1rem;
  ${({ priceList }) =>
    priceList
      ? `
      grid-template-columns: 1fr;
      grid-template-rows: 60vh;
        grid-template-areas: 'high'
        'high';`
      : `grid-template-areas: 'small .'
    '. high'
    '. high';`}
  grid-area: gallery;

  margin: 1rem 0 50px 0;

  @media only screen and (min-width: 640px) and (max-width: 1102px) {
    grid-template-columns: repeat(2, 300px);
    grid-template-areas:
      'high high'
      'high high';
  }
  @media only screen and (min-width: 1102px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 300px);

    ${({ priceList }) =>
      priceList
        ? `
        // grid-template-rows: repeat(2, 00px);
        grid-template-areas: 'high high'
        'high high';`
        : `grid-template-areas: 'small .'
    '. high'
    '. high';`}
    display: grid;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  grid-area: ${({ gridArea }) => gridArea};
  width: auto;
  height: auto;
`;
