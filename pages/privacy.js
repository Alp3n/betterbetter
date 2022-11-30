import { createClient } from '../prismicio';
import Layout from '../components/layout';
import SEO from '../components/SEO';
import { PrismicRichText } from '@prismicio/react';
import Bounded from '../components/bounded';
import styled from '@emotion/styled';

export default function Home({ page, menu }) {
  return (
    <Layout menu={menu}>
      <SEO
        metaDescription={page.data.metaDescription}
        metaTitle={page.data.metaTitle}
      />
      <Bounded>
        <StyledWrapper>
          <PrismicRichText field={page.data.title} />
          <PrismicRichText field={page.data.policy} />
        </StyledWrapper>
      </Bounded>
    </Layout>
  );
}

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID('privacy', 'privacy');
  const menu = await client.getSingle('menu', 'menu');

  return {
    props: {
      page,
      menu,
    },
  };
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 3rem 0;
  * > li {
    font-size: 1.1rem;
  }
  > h1 {
    font-family: 'Open Sans' !important;
  }
`;
