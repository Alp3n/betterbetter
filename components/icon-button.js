import React from 'react';
import styled from '@emotion/styled';
import { PrismicLink } from '@prismicio/react';
import Youtube from '../public/static/svg/youtube.svg';
import Instagram from '../public/static/svg/instagram.svg';
import Linkedin from '../public/static/svg/linkedin.svg';
import Facebook from '../public/static/svg/facebook.svg';

const IconButton = ({ type, field }) => {
  <StyledLink
    field={field}
    target='_blank'
    rel='noopener noreferrer'
    aria-label={type}
  >
    {type === 'youtube' && (
      <Youtube width='28' height='28' viewBox='0 0 244 244' />
    )}
    {type === 'instagram' && (
      <Instagram width='28' height='28' viewBox='0 0 244 244' />
    )}
    {type === 'linkedin' && (
      <Linkedin width='28' height='28' viewBox='0 0 244 244' />
    )}
    {type === 'facebook' && (
      <Facebook width='28' height='28' viewBox='0 0 244 244' />
    )}
  </StyledLink>;
};
export default IconButton;

const StyledLink = styled(PrismicLink)`
  width: 30px;
  height: 30px;
  background-color: #000;

  path {
    fill: white;
  }
`;
