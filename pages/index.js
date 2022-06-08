import { SliceZone } from '@prismicio/react';
import { createClient } from '../prismicio';
import { components } from '../slices/';
import Layout from '../components/layout';

export default function Home({ page, menu, brands }) {
  return (
    <Layout menu={menu}>
      <SliceZone
        slices={page.data.slices}
        components={components}
        context={brands}
      />
    </Layout>
  );
}

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID('homepage', 'homepage');
  const menu = await client.getSingle('menu', 'menu');
  const brands = await client.getAllByType('brand');

  return {
    props: {
      page,
      menu,
      brands,
    },
  };
}
