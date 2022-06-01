import { useState } from 'react';
import styled from '@emotion/styled';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import Bounded from './bounded';
import Image from './image';

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
          <Image src={header.logo.url} layout='fill' alt='' />
        </StyledLogo>
        <StyledSocial>
          {header.socialLinks.map((item, i) => (
            <StyledSVG key={i} field={item.link}>
              <Image src={item.icon.url} layout='fill' alt='' />
            </StyledSVG>
          ))}
        </StyledSocial>
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
        </StyledMenuLinks>
        <StyledMenuSocial>
          {header.socialLinks.map((item, i) => (
            <StyledSVG key={i} field={item.link}>
              <Image src={item.icon.url} layout='fill' alt='' />
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
  top: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  z-index: 99;

  > div {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'logo menuButton' 'menu menu';
    align-items: center;
    z-index: 99;
    @media only screen and (min-width: 1103px) {
      grid-template-columns: 1fr 100px 1fr;
      place-items: center;
      grid-template-areas: 'nav logo social';
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
  @media only screen and (min-width: 1103px) {
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
  width: 46px;
  height: 46px;
  margin: 16px 0;
  @media only screen and (min-width: 1103px) {
    width: 70px;
    height: 70px;
    margin: 16px 0;
  }
`;

const StyledSocial = styled.div`
  display: none;
  @media only screen and (min-width: 1103px) {
    display: grid;
    grid-template-columns: repeat(4, auto);
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
    top: -300px;
  }
  &.open {
    animation: slideDown 0.3s ease-in-out forwards;
  }
  &.closed {
    animation: slideUp 0.3s ease-in-out forwards;
  }

  @keyframes slideDown {
    0% {
      top: 0;
      left: 0;
    }
    100% {
      left: 0;
      top: 78px;
    }
  }
  @keyframes slideUp {
    0% {
      top: 78px;
      left: 0;
    }
    100% {
      top: -100%;
      left: 0;
    }
  }

  @media only screen and (min-width: 1102px) {
  }
`;

const StyledMenuLinks = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

const StyledMenuSocial = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
