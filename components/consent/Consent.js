import React, { Fragment, useEffect, useState } from 'react';
import { setCookie, hasCookie } from 'cookies-next';
import { Dialog, Transition } from '@headlessui/react';
import { PrismicLink } from '@prismicio/react';
import styled from '@emotion/styled';

function Consent({ privacyLink }) {
  const [consent, setConsent] = useState(false);
  useEffect(() => {
    setConsent(hasCookie('googleAnalytics'));
  }, []);

  const acceptCookie = () => {
    setConsent(true);
    setCookie('googleAnalytics', 'true', { maxAge: 60 * 60 * 24 * 365 });
    gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
    });
  };
  const closeP = () => {
    setConsent(true);
  };
  const denyCookie = () => {
    setConsent(true);
    setCookie('googleAnalytics', 'false', { maxAge: 60 * 60 * 24 * 365 });
  };
  if (consent === true) {
    return null;
  }

  //TODO Export to Prismic CMS
  return (
    // <Transition appear show={consent ? false : true} as={Fragment}>
    //   <Dialog as='div' onClose={() => {}}>
    //      <Transition.Child
    //       as={Fragment}
    //       enter='ease-out duration-300'
    //       enterFrom='opacity-0'
    //       enterTo='opacity-100'
    //       leave='ease-in duration-200'
    //       leaveFrom='opacity-100'
    //       leaveTo='opacity-0'
    //     >
    //       <StyledBackground />
    //     </Transition.Child> 
    //     <div>
    //       <Transition.Child
    //         as={Fragment}
    //         enter='ease-out duration-300'
    //         enterFrom='opacity-0 scale-95'
    //         enterTo='opacity-100 scale-100'
    //         leave='ease-in duration-200'
    //         leaveFrom='opacity-100 scale-100'
    //         leaveTo='opacity-0 scale-95'
    //       > 
            <StyledDialogPanel>
              <StyledTitle as='p'>Cenimy Twoją prywatność</StyledTitle>
              <StyledText>
                {`Używamy opcjonalne cookies google analytics w celach analizy ruchu na stronie.
                Klikając "Akceptuj", zgadzasz się na ich używanie zgodnie z naszą `}
                <StyledLink>
                  <PrismicLink field={privacyLink}>
                    polityką prywatności.
                  </PrismicLink>
                </StyledLink>
              </StyledText>

              <ButtonWrapper>
                <Button
                  onClick={() => {
                    acceptCookie();
                  }}
                  primary
                >
                  Akceptuj
                </Button>
                <Button onClick={(e) => denyCookie()}>Odrzuć</Button>
                <Button
                  onClick={(e) => {
                    closeP();
                  }}
                >
                  Zamknij
                </Button>
              </ButtonWrapper>
            </StyledDialogPanel>
          
  );
}

export default Consent;

const StyledText = styled.p`
  color: white;
`;

const StyledTitle = styled.h1`
  color: white;
  font-size: 24px;
`;

const StyledDialogPanel = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  padding: 2rem;
  display: grid;
  gap: 1.5rem;
  z-index: 5;
`;

const StyledLink = styled.span`
  > a:hover {
    text-decoration: underline;
  }
`;

const StyledBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: black;
  opacity: 0.6;
  z-index: 4;
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 1.5rem;
  place-items: start;
  grid-auto-rows: min-content;

  @media only screen and (min-width: 640px) {
    display: flex;
  }
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 54px;
  color: white;
  padding: 3px 8px;
  ${({ primary }) =>
    primary
      ? `background-color: #fff; color: #000; font-weight:700;`
      : `background-color: #000;`}

  &:hover {
    background-color: white;
    opacity: 0.8;
    cursor: pointer;
    color: black;
  }

  @media only screen and (min-width: 640px) {
    width: fit-content;
  }
`;
