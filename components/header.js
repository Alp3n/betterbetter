import { useState } from 'react';
import styled from '@emotion/styled';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import Bounded from './bounded';
import Image from './image';
import Mail from '../public/static/svg/mail.svg';
import Facebook from '../public/static/svg/facebook.svg';
import Instagram from '../public/static/svg/instagram.svg';
import Linkedin from '../public/static/svg/linkedin.svg';
import Location from '../public/static/svg/location.svg';

export default function Header({ header }) {
  const [isOpen, setOpen] = useState('initial');
  const handleMenu = () => {
    if (isOpen === 'initial') setOpen('open');
    if (isOpen === 'open') setOpen('closed');
    if (isOpen === 'closed') setOpen('open');
  };

  return (
    <>
      <StyledBounded as='header'>
        <StyledNav>
          {header.menuLinks.map((item, i) => (
            <StyledLink field={item.link} key={i}>
              <PrismicRichText field={item.label} />
            </StyledLink>
          ))}
        </StyledNav>
        <StyledLogo field={header.homeLink}>
          <Image src={header.logo.url} layout='fill' alt={header.logo.alt} />
        </StyledLogo>
        <StyledRightSide>
          <StyledLink field={header.eventsLink} myarea='events'>
            <PrismicRichText field={header.eventsLabel} />
          </StyledLink>
          <StyledSocial>
            {header.socialLinks.map((item, i) => (
              <StyledSVG key={i} field={item.link} target='_blank'>
                {item.label === 'location' && <Location />}
                {item.label === 'mail' && <Mail />}
                {item.label === 'instagram' && <Instagram />}
                {item.label === 'linkedin' && <Linkedin />}
                {item.label === 'facebook' && <Facebook />}
              </StyledSVG>
            ))}
          </StyledSocial>
        </StyledRightSide>

        <MenuButton onClick={handleMenu} className={isOpen}>
          <span />
          <span />
          <span />
          <span />
        </MenuButton>
      </StyledBounded>

      <StyledMenu className={isOpen}>
        <StyledMenuLinks>
          {header.menuLinks.map((item, i) => (
            <StyledLink field={item.link} key={i} onClick={handleMenu}>
              <PrismicRichText field={item.label} />
            </StyledLink>
          ))}
          <StyledLink field={header.eventsLink} onClick={handleMenu}>
            <PrismicRichText field={header.eventsLabel} />
          </StyledLink>
        </StyledMenuLinks>
        <StyledMenuSocial>
          {header.socialLinks.map((item, i) => (
            <StyledSVG key={i} field={item.link} target='_blank'>
              {item.label === 'location' && <Location />}
              {item.label === 'mail' && <Mail />}
              {item.label === 'instagram' && <Instagram />}
              {item.label === 'linkedin' && <Linkedin />}
              {item.label === 'facebook' && <Facebook />}
            </StyledSVG>
          ))}
        </StyledMenuSocial>
      </StyledMenu>
    </>
  );
}

// 1016px mobile header
const StyledBounded = styled(Bounded)`
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  z-index: 2;
  > div {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'logo menuButton' 'menu menu';
    align-items: center;
    z-index: 99;
    @media only screen and (min-width: 1102px) {
      grid-template-columns: 1fr 100px 1fr;
      place-items: center;
      grid-template-areas: 'nav logo rightSide';
    }
  }
`;

/* const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 100px 1fr;
  place-items: center;
  grid-template-areas: 'nav logo social';
`; */

const StyledNav = styled.nav`
  display: none;
  @media only screen and (min-width: 1102px) {
    display: grid;
    grid-template-columns: repeat(3, auto);
    place-self: center start;
    /* width: 80%; */
    grid-area: nav;
    gap: 30px;
  }
`;

const StyledLink = styled(PrismicLink)`
  width: fit-content;
  font-weight: bold;
  position: relative;
  display: inline-block;
  ${({ myarea }) => (myarea ? `grid-area: ${myarea};` : null)}
  p {
    font-family: 'Gotham Black';
  }

  @media only screen and (min-width: 1102px) {
    padding: 12px 10px;
    ::after {
      content: '';
      background-color: black;
      height: 1px;
      position: absolute;
      bottom: 0;
      transition: 0.16s all 0.025s;
    }

    ::after {
      left: 100%;
      right: 0;
    }

    :hover ~ ::after {
      left: 0;
      right: 100%;
    }

    :hover::after {
      /* color: grey; */
      left: 0;
      right: 0;
    }
  }
`;

const StyledLogo = styled(PrismicLink)`
  position: relative;
  grid-area: logo;
  width: 36px;
  height: 36px;
  margin: 8px 0;
  @media only screen and (min-width: 1102px) {
    width: 70px;
    height: 70px;
    margin: 16px 0;
  }
`;

const StyledRightSide = styled.div`
  display: none;
  @media only screen and (min-width: 1102px) {
    display: grid;
    grid-template-columns: repeat(2, auto);
    place-content: end;
    align-items: center;
    gap: 10%;
    width: 100%;
    grid-area: rightSide;
    grid-template-areas: 'events social';
  }
`;

const StyledSocial = styled.div`
  display: none;
  @media only screen and (min-width: 1102px) {
    display: grid;
    grid-template-columns: repeat(5, auto);
    place-content: end;
    gap: 2rem;
    width: 100%;
    grid-area: social;
  }
`;

const StyledSVG = styled(PrismicLink)`
  position: relative;
  width: 25px;
  height: 25px;

  :hover {
    transform: scale(1.1);
  }
`;

const MenuButton = styled.div`
  position: relative;
  width: 34px;
  height: 34px;
  grid-area: menuButton;
  justify-self: end;
  top: 8px;
  cursor: pointer;

  &:active {
    background-color: transparent;
  }
  &:focus {
    background-color: transparent;
  }

  span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: black;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
  }

  span:nth-of-type(1) {
    top: 0px;
  }

  span:nth-of-type(2),
  span:nth-of-type(3) {
    top: 8px;
  }

  span:nth-of-type(4) {
    top: 16px;
  }

  &.open span:nth-of-type(1) {
    top: 8px;
    width: 0%;
    left: 50%;
  }

  &.open span:nth-of-type(2) {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  &.open span:nth-of-type(3) {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  &.open span:nth-of-type(4) {
    top: 8px;
    width: 0%;
    left: 50%;
  }

  @media only screen and (min-width: 1102px) {
    display: none;
  }
`;

const StyledMenu = styled.nav`
  position: fixed;
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  background-color: #fff;
  border-top: 1px solid #f5f5f5;
  padding: 15px 5%;
  /* left: -100%;
  top: -1000px; */
  width: 100%;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  z-index: 1;

  &.initial {
    top: -600px;
  }
  &.open {
    animation: slideDown 0.3s ease-in-out forwards;
  }
  &.closed {
    animation: slideUp 0.3s ease-in-out forwards;
  }

  @keyframes slideDown {
    0% {
      top: -40%;
      left: 0;
    }
    100% {
      left: 0;
      top: 52px;
    }
  }
  @keyframes slideUp {
    0% {
      top: 52px;
      left: 0;
    }
    100% {
      top: -100%;
      left: 0;
    }
  }

  @media only screen and (min-width: 1102px) {
    display: none;
  }
`;

const StyledMenuLinks = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

const StyledMenuSocial = styled.div`
  display: flex;
  gap: 1.5rem;
`;
