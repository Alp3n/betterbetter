import styled from '@emotion/styled';
import { PrismicRichText } from '@prismicio/react';

const Title = ({ title }) => <PrismicRichText field={title} />;

export default Title;

const H1 = styled.h1`
  font-size: 30px;
  line-height: 30px;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
  grid-area: title;
  @media only screen and (min-width: 640px) {
    font-size: 45px;
    line-height: 45px;
  }
`;
