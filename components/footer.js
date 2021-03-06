import styled from '@emotion/styled';
import { PrismicRichText } from '@prismicio/react';
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
          <PrismicRichText key={i} field={item.item} />
        ))}
      </StyledBounded>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer``;
const StyledBlackBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  height: 200px;
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
