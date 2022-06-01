import React from 'react';
import styled from '@emotion/styled';
import { PrismicRichText } from '@prismicio/react';
import * as prismicH from '@prismicio/helpers';
import * as prismicR from '@prismicio/richtext';

const SekcjaTekst = ({ slice }) => (
  <StyledWrapper>
    {slice.items.map((item, i) => (
      <div key={i}>
        {prismicH.isFilled.richText(item.title) ? (
          <PrismicRichText field={item.title} />
        ) : null}
        {prismicH.isFilled.richText(item.description) ? (
          <PrismicRichText field={item.description} />
        ) : null}
      </div>
    ))}
  </StyledWrapper>
);

export default SekcjaTekst;

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  place-content: start;
  gap: 60px;
  /* margin-bottom: 50px; */
  grid-area: texts;
  h3 {
    margin-bottom: 20px;
  }
  div:last-of-type {
    margin-bottom: 100px;
  }
`;
