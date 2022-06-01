import styled from '@emotion/styled';
import { PrismicRichText } from '@prismicio/react';
{
  /* <PWrapper width={width}>
    <P>{description}</P>
  </PWrapper> */
}
const Description = ({ description, width }) => (
  <PrismicRichText field={description} />
);

export default Description;

const PWrapper = styled.div`
  @media only screen and (min-width: 640px) {
    ${({ width }) => (width ? `width: ${width}` : `width: auto;`)}
  }
`;

const P = styled.p`
  grid-area: description;
`;
