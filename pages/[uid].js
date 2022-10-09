import { createClient, linkResolver } from '../prismicio';
import { PrismicRichText, SliceZone } from '@prismicio/react';
import * as prismicH from '@prismicio/helpers';
import styled from '@emotion/styled';
import { components } from '../slices';
import Layout from '../components/layout';
import Bounded from '../components/bounded';
import Image from '../components/image';
import SEO from '../components/SEO';

const Page = ({ page, menu }) => {
  const heroImage = `${page.data.imageMain.url}?dpr=2`;

  return (
    <Layout menu={menu}>
      <SEO
        metaDescription={page.data.metaDescription}
        metaTitle={page.data.metaTitle}
      />
      {page.uid === 'wydarzenia' ? (
        <StyledBounded>
          <SliceZone
            slices={[
              page?.data?.slices?.find(
                (slice) => slice.slice_type === 'galeria_wydarzen'
              ),
            ]}
            components={components}
          />
        </StyledBounded>
      ) : (
        <StyledBounded>
          <StyledImagesWrapper>
            <StyledImage>
              <Image
                src={heroImage}
                alt=''
                layout='fill'
                quality={100}
                priority
              />
            </StyledImage>
            <MobileWrapper>
              {page?.data?.slices?.find(
                (slice) => slice.slice_type === 'galeria_zdjec'
              ) ? (
                <SliceZone
                  slices={[
                    page?.data?.slices?.find(
                      (slice) => slice.slice_type === 'galeria_zdjec'
                    ),
                  ]}
                  components={components}
                  context={page.data}
                />
              ) : null}
            </MobileWrapper>
          </StyledImagesWrapper>

          <StyledTexts>
            <StyledTitle field={page.data.title} />
            <StyledDescription field={page.data.description} />
            <SliceZone
              slices={[
                page?.data?.slices?.find(
                  (slice) => slice.slice_type === 'sekcja_tekst'
                ),
              ]}
              components={components}
              context={page.data}
            />
          </StyledTexts>
          <DesktopWrapper>
            {page?.data?.slices?.find(
              (slice) => slice.slice_type === 'galeria_zdjec'
            ) ? (
              <SliceZone
                slices={[
                  page?.data?.slices?.find(
                    (slice) => slice.slice_type === 'galeria_zdjec'
                  ),
                ]}
                components={components}
                context={page.data}
              />
            ) : null}
          </DesktopWrapper>
        </StyledBounded>
      )}
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
      'images'
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
      gap: 4rem;
    }
  }
  @media only screen and (min-width: 1102px) {
    gap: 6rem;
    > div {
      grid-template-columns: 1fr 1fr;
      grid-template-areas: 'images texts';
      gap: 4rem;
      margin-top: 4rem;
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
      gap: 4rem;
      grid-template-areas: 'images texts';
    }
  }
`;
const StyledImagesWrapper = styled.div`
  grid-area: images;
  grid-template-columns: 1fr;
  grid-template-areas:
    'image'
    'gallery';
`;
const StyledImage = styled.div`
  position: relative;
  width: 100%;
  grid-area: image;

  img {
    object-fit: cover;
  }

  /* @media only screen and (max-width: 640px) { */
  height: 50vh;
  /* } */

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
    'description'
    'texts';
  grid-area: texts;
  place-content: start;
  gap: 2rem;

  @media only screen and (max-width: 640px) {
    margin: 0 5%;
  }
  @media only screen and (min-width: 640px) {
    margin: 0 5%;
    p {
      font-weight: 400;

      /* font-size: 20px; */
      line-height: 2;
    }
  }
  @media only screen and (min-width: 1102px) {
    margin-top: 250px;
    p {
      font-weight: 400;
      /* font-size: 28px; */
      line-height: 2;
    }
  }
`;

const StyledTitle = styled(PrismicRichText)`
  grid-area: title;
  color: red;
  font-family: 'Gotham Black';
`;

const StyledDescription = styled(PrismicRichText)`
  grid-area: descritpion;
`;

const MobileWrapper = styled.div`
  display: none;
  @media only screen and (min-width: 1102px) {
    display: block;
  }
`;

const DesktopWrapper = styled.div`
  display: block;
  @media only screen and (min-width: 1102px) {
    display: none;
  }
`;
