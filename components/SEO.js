import Head from 'next/head';

const SEO = ({ metaTitle, metaDescription }) => {
  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name='description' content={metaDescription} />
    </Head>
  );
};

export default SEO;
