import Header from './header';
import Footer from './footer';

export default function Layout({ children, menu }) {
  console.log(menu);
  return (
    <>
      <Header header={menu.data} />
      <main>{children}</main>
      <Footer footer={menu.data} />
    </>
  );
}
