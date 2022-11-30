import Script from 'next/script';

export const GoogleTag = ({ googleTag }) => {
  return (
    <Script
      id='gtag'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{
        __html: `${googleTag}`,
      }}
    />
  );
};
