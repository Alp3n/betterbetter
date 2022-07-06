import React, { useState } from 'react';
import { PrismicRichText } from '@prismicio/react';
import * as prismicH from '@prismicio/helpers';
import styled from '@emotion/styled';
import Bounded from '../../components/bounded';
import Button from '../../components/button';
import Image from '../../components/image';
import Modal from '../../components/modal';
import PortalModal from '../../components/portalModal';

const PodgladStrony = ({ slice, context }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const nextItem = () => {
    let currentItem = context.indexOf(selectedItem);
    if (currentItem === context.length - 1) return;
    setSelectedItem(context[currentItem + 1]);
  };

  const previouseItem = () => {
    let currentItem = context.indexOf(selectedItem);
    if (currentItem === 0) return;
    setSelectedItem(context[currentItem - 1]);
  };

  return (
    <>
      <Bounded
        as='section'
        margin={slice.primary.title[0].text === 'Showroom' ? false : true}
        id={slice.primary.number}
      >
        <Grid variation={slice.primary.number}>
          <ImagesSide variation={slice.primary.number}>
            <SmallImage>
              <Image
                src={prismicH.asImageSrc(slice.primary.imageSmall, {
                  w: undefined,
                  h: undefined,
                })}
                alt=''
                layout='fill'
                quality={85}
              />
            </SmallImage>
            <BigImage>
              <Image
                src={prismicH.asImageSrc(slice.primary.imageBig, {
                  w: undefined,
                  h: undefined,
                })}
                alt=''
                layout='fill'
                quality={85}
              />
            </BigImage>
            <Number variation={slice.primary.number}>
              {slice.primary.number}
            </Number>
          </ImagesSide>
          <DescriptionSide variation={slice.primary.number}>
            <PrismicRichText field={slice.primary.title} />
            <StyledDescirption variation={slice.primary.number}>
              <PrismicRichText field={slice.primary.description} />
            </StyledDescirption>
            <Button
              primary='true'
              label={slice.primary.buttonLabel}
              link={slice.primary.buttonLink}
            />
          </DescriptionSide>
          {slice.variation === 'withBrands' ? (
            <BrandsList>
              {prismicH.isFilled.group(context)
                ? context.map((item) => (
                    <React.Fragment key={item.uid}>
                      <BrandItem onClick={() => openModal(item)}>
                        <PrismicRichText field={item.data.name} />
                        <BrandArrow>&#62;</BrandArrow>
                      </BrandItem>
                    </React.Fragment>
                  ))
                : null}
            </BrandsList>
          ) : null}
        </Grid>
      </Bounded>
      {slice.variation === 'withBrands' ? (
        <PortalModal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          <Modal
            setIsOpen={setModalIsOpen}
            item={selectedItem}
            nextItem={nextItem}
            previouseItem={previouseItem}
          />
        </PortalModal>
      ) : null}
    </>
  );
};

export default PodgladStrony;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  grid-template-areas:
    'descriptionSide'
    'imagesSide'
    'brandsList';
  @media only screen and (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
    ${({ variation }) =>
      variation === 1
        ? `grid-template-areas: 
        'imagesSide descriptionSide' 
        'brandsList brandsList';`
        : null}

    ${({ variation }) =>
      variation === 2
        ? `grid-template-columns: auto 1fr;
        grid-template-areas: 'descriptionSide imagesSide';`
        : null}

    ${({ variation }) =>
      variation === 3
        ? `grid-template-areas: 'imagesSide descriptionSide';`
        : null}
    gap: 3rem;
  }

  @media only screen and (min-width: 1240px) {
    ${({ variation }) =>
      variation === 1
        ? `grid-template-areas: 
        'imagesSide descriptionSide' 
        'imagesSide brandsList';`
        : null}
  }
`;
const ImagesSide = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 200px);
  grid-template-rows: repeat(2, 200px);
  gap: 1rem;
  ${({ variation }) =>
    variation === 1
      ? `grid-template-areas: 'smallImage bigImage'
    '. bigImage';`
      : null}
  ${({ variation }) =>
    variation === 2
      ? `
      grid-template-columns: 250px 200px;
      grid-template-rows: 150px 200px;  
      grid-template-areas: 
        'bigImage .'
        'bigImage smallImage';`
      : null}
  ${({ variation }) =>
    variation === 3
      ? `grid-template-areas: 
          'bigImage .'
          'bigImage smallImage';`
      : null}
  grid-area: imagesSide;
  overflow-x: scroll;
  ${({ variation }) => (variation === 1 ? `margin-bottom: 2rem;` : null)}

  @media only screen and (min-width: 640px) {
    ${({ variation }) => (variation === 1 ? `margin-bottom: 0;` : null)}
    grid-template-columns: repeat(2, 200px);
    grid-template-rows: repeat(2, 200px);
    ${({ variation }) =>
      variation === 1
        ? `grid-template-areas: 'smallImage bigImage'
    'number bigImage';`
        : null}
    ${({ variation }) =>
      variation === 2
        ? `
        grid-template-columns: 200px 150px 150px;
      grid-template-rows: 75px 200px 200px; 
    grid-template-areas: 
    'number bigImage bigImage'
    'number bigImage bigImage'
    'smallImage bigImage bigImage';`
        : null}
  ${({ variation }) =>
      variation === 3
        ? `grid-template-areas: 'bigImage number'
    'bigImage smallImage ';`
        : null}
    overflow-x: unset;
  }
  @media only screen and (min-width: 1102px) {
    grid-template-columns: repeat(2, 300px);
    grid-template-rows: repeat(2, 300px);
    ${({ variation }) =>
      variation === 1
        ? `grid-template-areas: 'smallImage bigImage'
    'number bigImage';`
        : null}
    ${({ variation }) =>
      variation === 2
        ? `
      grid-template-columns: 300px 300px 300px;
      grid-template-rows: 150px 300px 300px;  
    grid-template-areas: 
    'number bigImage bigImage'
    'number bigImage bigImage'
    'smallImage bigImage bigImage';`
        : null}
  ${({ variation }) =>
      variation === 3
        ? `grid-template-areas: 'bigImage number'
    'bigImage smallImage ';`
        : null}
    overflow-x: unset;
  }
`;

const DescriptionSide = styled.div`
  display: grid;
  grid-template-areas:
    'title'
    'description'
    'button';
  grid-template-rows: auto auto auto 1fr;
  gap: 2rem;
  grid-area: descriptionSide;

  @media only screen and (min-width: 640px) {
    gap: 3rem;
  }
`;

const SmallImage = styled.div`
  position: relative;
  grid-area: smallImage;
  width: auto;
  height: auto;
  /* @media only screen and (min-width: 640px) {
    width: auto;
    height: auto;
  } */
`;

const BigImage = styled.div`
  position: relative;
  grid-area: bigImage;
  width: auto;
  height: auto;
  /* @media only screen and (min-width: 640px) {
    width: auto;
    height: auto;
  } */
`;

const Number = styled.p`
  display: none;
  font-family: 'Heebo';
  @media only screen and (min-width: 640px) {
    display: block;
    font-size: 12rem;
    font-weight: 700;
    line-height: 7.5rem;
    place-items: end end;
    grid-area: number;
    place-self: end end;
    ${({ variation }) =>
      variation === 3 ? `place-self: start start;` : null}/* ${({
      variation,
    }) =>
      variation === 2
        ? `position: absolute; right: 3rem; bottom: 2rem; grid-area: unset;`
        : null} */
  }
`;

const BrandsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  grid-area: brandsList;
  @media only screen and (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: row;
    gap: 1rem 2rem;
    align-items: stretch;
  }
`;

const BrandItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 34px;
  width: 100%;
  padding-left: 8px;
  background: linear-gradient(to left, transparent 50%, #3d3d3d 50%) right;
  background-size: 200%;
  transition: 0.5s ease-out;
  color: black;
  > p {
    font-size: 15px;
  }

  &:hover {
    color: white;
    background-position: left;
    cursor: pointer;
  }

  &:not(:hover) {
    transition: 0.3s ease-in 0.2s;
    background-position: right;
  }

  @media only screen and (max-width: 1540px) {
    height: auto;
  }
`;

const BrandArrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 100%;
  color: #fff;
  font-weight: 900;
  font-size: 1.8rem;
  background-color: #000;
  background: linear-gradient(to left, black 50%, #3d3d3d 50%) right;
  background-size: 200%;
  transition: 0.3s ease-in;
  &:hover {
    transition: 0.3s ease-in 0.2s;
    background-position: left;
  }

  &:not(:hover) {
    transition: 0.3s ease-in 0;
    background-position: right;
  }
`;

const StyledDescirption = styled.div`
  @media screen and (min-width: 640px) {
    ${({ variation }) => (variation === 1 ? `width: 26ch;` : null)}
    ${({ variation }) => (variation === 2 ? `width: 26ch;` : null)}
    ${({ variation }) => (variation === 3 ? `width: 30ch;` : null)}
  }
`;
