import styled from '@emotion/styled';
import { PrismicLink, PrismicRichText } from '@prismicio/react';

const Button = ({ label, link, primary }) => {
  return (
    <ButtonBox primary={primary} field={link}>
      <PrismicRichText field={label} />
    </ButtonBox>
  );
};

export default Button;

const ButtonBox = styled(PrismicLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  width: auto;
  grid-area: button;

  ${({ primary }) =>
    primary
      ? `background-color: #000; color: #fff; font-weight:700; font-size: 22px;`
      : `background-color: #fff;`}
  transition: all 0.2s ease-in-out;
  background: linear-gradient(to left, #000 50%, #3d3d3d 50%) right;
  background-size: 200%;
  transition: 0.5s ease-out;

  p {
    text-transform: uppercase;
    margin: 0;
    padding: 6px 60px;
  }

  &:hover {
    background-position: left;
    cursor: pointer;
  }

  @media only screen and (min-width: 640px) {
    width: fit-content;
  }
`;
