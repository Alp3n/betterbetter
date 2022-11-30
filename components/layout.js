import Header from './header';
import Footer from './footer';
import Consent from './consent/Consent';

export default function Layout({ children, menu }) {
  return (
    <>
      <Header header={menu.data} />
      <main>{children}</main>
      <Footer footer={menu.data} />
      <Consent privacyLink={menu.data.privacyLink} />
    </>
  );
}
