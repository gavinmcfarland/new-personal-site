import Header from "./Header";
import Meta from './Meta'
import Link from "next/link";

export default function Layout(props) {
  return (
    <>
      <div className="App">
        <Meta
          siteTitle={props.siteTitle}
          siteDescription={props.siteDescription}
        />
        <Header siteTitle={props.siteTitle} />
        <main className="Main">{props.children}</main>
        <footer className="Footer" width="viewport">
          <Link href="#"><a>Twitter</a></Link>
          <Link href="#"><a>Github</a></Link>
          <Link href="#"><a>Figma</a></Link>
          <Link href="#"><a>Dribbble</a></Link>
          <Link href="#"><a>LinkedIn</a></Link>
        </footer>
      </div>
    </>
  );
}