import React from 'react';
import { PrismicRichText } from '@prismicio/react';
import * as prismicH from '@prismicio/helpers';
import styled from '@emotion/styled';
import Image from '../../components/image';

const GaleriaZdjec = ({ slice }) => {
  //TODO FIX SLIDING GALLERY
  return (
    <ImagesSide>
      {slice.items.map((item, i) => (
        <ImageWrapper gridArea={item.gridArea} key={i}>
          <Image
            src={prismicH.asImageSrc(item.image, {
              w: undefined,
              h: undefined,
            })}
            alt=''
            layout='fill'
            quality={85}
          />
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
  grid-template-areas:
    'small high'
    '. high';
  grid-area: gallery;
  /* overflow-x: scroll; */
  margin: 1rem 0 50px 0;

  @media only screen and (min-width: 640px) {
    grid-template-columns: repeat(2, 300px);
    grid-template-rows: repeat(2, 300px);
    grid-template-areas:
      'small high'
      '. high';
    overflow-x: unset;
    display: none;
  }
  @media only screen and (min-width: 1102px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 300px);
    grid-template-areas:
      'small .'
      '. high'
      '. high';
    display: grid;
  }
`;

const SmallImage = styled.div`
  position: relative;
  grid-area: smallImage;
  width: auto;
  height: auto;
`;

const BigImage = styled.div`
  position: relative;
  grid-area: bigImage;
  width: auto;
  height: auto;
`;

const ImageWrapper = styled.div`
  position: relative;
  grid-area: ${({ gridArea }) => gridArea};
  width: auto;
  height: auto;
`;
