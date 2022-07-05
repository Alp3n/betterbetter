import { createClient, linkResolver } from '../prismicio';
import { PrismicRichText, SliceZone } from '@prismicio/react';
import * as prismicH from '@prismicio/helpers';
import styled from '@emotion/styled';
import { components } from '../slices';
import Layout from '../components/layout';
import Bounded from '../components/bounded';
import Image from '../components/image';

const Page = ({ page, menu }) => {
  const heroImage = `${page.data.imageMain.url}?dpr=2`;
  return (
    <Layout menu={menu}>
      <StyledBounded>
        <StyledImage>
          <Image src={heroImage} alt='' layout='fill' quality={100} />
        </StyledImage>
        <StyledTexts>
          <StyledTitle field={page.data.title} />
          <StyledDescirption field={page.data.description} />
          {/* <StyledLine /> */}
        </StyledTexts>
      </StyledBounded>
      <StyledDynamicBounded>
        <SliceZone slices={page.data.slices} components={components} />
      </StyledDynamicBounded>
    </Layout>
  );
};

export default Page;

export const getStaticProps = async ({ params, previewData }) => {
  const client = createClient({ previewData });

  const page = await client.getByUID('page', params.uid);
  const menu = await client.getSingle('menu', 'menu');
  return {
    props: {
      page,
      menu,
      // fallback: false,
    },
  };
};

export const getStaticPaths = async () => {
  const client = createClient();
  const pages = await client.getAllByType('page');
  return {
    paths: pages.map((doc) => prismicH.asLink(doc, linkResolver)),
    fallback: false,
  };
};

const StyledBounded = styled(Bounded)`
  > div {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
      'image'
      'texts';

    margin-top: 0;
  }
  @media only screen and (max-width: 640px) {
    > div {
      gap: 3rem;
      max-width: 100%;
    }
  }
  @media only screen and (min-width: 640px) {
    > div {
      grid-template-columns: 1fr 1fr;
      grid-template-areas: 'image texts';
      gap: 6rem;
      margin-top: 5rem;
    }
  }
`;

const StyledDynamicBounded = styled(Bounded)`
  > div {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
      'images'
      'texts';

    margin-top: 3rem;
    @media only screen and (min-width: 1102px) {
      margin-top: 1rem;
      grid-template-columns: 1fr 1fr;
      gap: 6rem;
      grid-template-areas: 'images texts';
    }
  }
`;

const StyledImage = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  grid-area: image;

  img {
    object-fit: cover;
  }

  @media only screen and (min-width: 1102px) {
    /* width: 600px; */
    height: 600px;
  } ;
`;

const StyledTexts = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'title'
    'description';
  grid-area: texts;
  place-content: center;
  gap: 2rem;
  border-bottom: 1px solid black;
  margin-bottom: 3rem;

  @media only screen and (max-width: 640px) {
    margin: 0 5%;
    margin-bottom: 50px;
  }
  @media only screen and (min-width: 640px) {
    p {
      font-weight: 400;
      font-size: 20px;
      line-height: 2;
    }
  }
  @media only screen and (min-width: 1102px) {
    gap: 4rem;
    p {
      font-weight: 400;
      font-size: 28px;
      line-height: 2;
    }
  }
`;

const StyledTitle = styled(PrismicRichText)`
  grid-area: title;
  color: red;
  font-family: 'Gotham Black';
`;

const StyledDescirption = styled(PrismicRichText)`
  grid-area: descritpion;
`;
const StyledLine = styled.div`
  position: absolute;
  right: 0;
  width: 100%;
  border-top: 1px solid black;
  bottom: -30px;
  @media only screen and (min-width: 640px) {
    bottom: 70px;
  }
`;
