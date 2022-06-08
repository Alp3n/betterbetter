import React from 'react';
import { PrismicRichText } from '@prismicio/react';
import * as prismicH from '@prismicio/helpers';
import Slider from 'react-slick';
import Bounded from '../../components/bounded';
import styled from '@emotion/styled';
import Image from '../../components/image';

const GaleriaBrandow = ({ slice }) => {
  const sliderSettings = {
    className: 'slider variable-width',
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    cssEase: 'linear',

    // lazyLoad: true,
  };
  console.log(slice.items.map((item) => item.image.dimensions.width));
  return (
    <Bounded as='section'>
      {prismicH.isFilled.group(slice.items) ? (
        <StyledSlider {...sliderSettings}>
          {slice.items.map((item, i) => (
            <StyledLogo key={i} style={{ width: item.image.dimensions.width }}>
              <Image src={item.image.url} alt='' layout='fill' />
            </StyledLogo>
          ))}
        </StyledSlider>
      ) : null}
    </Bounded>
  );
};

export default GaleriaBrandow;

const StyledSlider = styled(Slider)`
  /* height: 200px; */
  padding: 50px 0;
  margin: 100px 0;
  /* gap: 100px; */
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

const StyledLogo = styled.div`
  position: relative;
  object-fit: cover;
  height: 50px;
  margin-right: 50px;
  width: ${({ width }) => (width ? `${width}px` : null)};
`;
