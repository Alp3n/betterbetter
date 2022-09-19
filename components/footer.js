import styled from '@emotion/styled';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import Bounded from './bounded';
import Image from './image';
// import { VscMenu, VscClose } from 'react-icons/vsc';

const Footer = ({ footer }) => {
  return (
    <StyledFooter>
      <StyledBlackBar>
        <StyledLogo>
          <Image src={footer.logo.url} alt='' layout='fill' />
        </StyledLogo>
      </StyledBlackBar>
      <StyledBounded>
        {footer.footer.map((item, i) => (
          <PrismicLink key={i} field={item.itemLink} target='_blank'>
            <PrismicRichText field={item.item} />
          </PrismicLink>
        ))}
      </StyledBounded>
      <StyledCredentials>
        <PrismicLink
          href={'https://ilovegrid.com'}
          target='_blank'
          rel='noopener noreferrer'
        >
          <p>Designed by ilovegrid,</p>
        </PrismicLink>
        <PrismicLink
          href={'https://relyit.pl'}
          target='_blank'
          rel='noopener noreferrer'
        >
          <p>&nbsp;made by relyit</p>
        </PrismicLink>
      </StyledCredentials>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  color: #fff;
`;
const StyledBlackBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  height: 150px;
  width: 100%;
  color: white;
`;

const StyledLogo = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  filter: brightness(0) invert(1);
`;

const StyledBounded = styled(Bounded)`
  padding: 50px;
  background-color: #000;
  div {
    display: grid;
    place-content: center;
    place-items: center;
    gap: 1rem;
    text-align: center;
    width: 20ch;
  }

  @media only screen and (min-width: 1102px) {
    div {
      grid-template-columns: repeat(4, auto);
      gap: 4rem;
      place-content: center;
      width: auto;
    }
  }
`;

const StyledCredentials = styled.div`
  display: flex;
  color: black;
  place-content: center;
  padding: 0 2rem;
  p {
    font-size: smaller;
  }
  @media only screen and (min-width: 640px) {
    place-content: end;
  }
`;
