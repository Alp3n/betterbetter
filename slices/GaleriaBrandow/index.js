import React from 'react';
import * as prismicH from '@prismicio/helpers';
import { Swiper, SwiperSlide } from 'swiper/react';
import Bounded from '../../components/bounded';
import styled from '@emotion/styled';
import Image from '../../components/image';
import { Autoplay } from 'swiper';

const GaleriaBrandow = ({ slice }) => {
  return (
    <StyledBounded as='section'>
      {prismicH.isFilled.group(slice.items) ? (
        <StyledSlider>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={100}
            slidesPerView='auto'
            slidesPerGroup={4}
            speed={1000}
            watchSlidesProgress
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            //TODO Check this shit breakpoints
            breakpoints={{
              // when window width is >= 320px
              320: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 10,
                // centeredSlides: true,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 2,
                spaceBetween: 40,
              },
              1224: {
                slidesPerView: 5,
                slidesPerGroup: 2,
                spaceBetween: 40,
              },
              1512: {
                slidesPerView: 5,
                slidesPerGroup: 3,
                spaceBetween: 40,
              },
            }}
          >
            {slice.items.map((item, i) => (
              <SwiperSlide
                key={i}
                style={{ width: item.image.dimensions.width }}
              >
                <StyledLogo>
                  <Image src={item.image.url} alt='' layout='fill' />
                </StyledLogo>
              </SwiperSlide>
            ))}
          </Swiper>
        </StyledSlider>
      ) : null}
    </StyledBounded>
  );
};

export default GaleriaBrandow;

const StyledBounded = styled(Bounded)`
  /* height: 200px; */
`;

const StyledSlider = styled.div`
  padding: 25px 0;
  margin: 50px 0;

  border-top: 1px solid black;
  border-bottom: 1px solid black;
  @media screen and (min-width: 640px) {
    padding: 50px 0;
    margin: 100px 0;
  }
`;

const StyledLogo = styled.div`
  position: relative;
  object-fit: cover;
  height: 50px;
  width: 100px;
  @media screen and (min-width: 640px) {
    height: 100px;
    width: 200px;
  }
`;
