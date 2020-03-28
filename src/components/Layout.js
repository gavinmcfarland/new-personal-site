import Header from "./Header";
import Meta from './Meta'
import Link from "next/link";

export default function Layout(props) {
  return (
    <section>
      <Meta
        siteTitle={props.siteTitle}
        siteDescription={props.siteDescription}
      />
      <Header siteTitle={props.siteTitle} />
      <div className="content">{props.children}</div>
      <footer>
        <Link href="#"><a>Twitter</a></Link>
        <Link href="#"><a>Github</a></Link>
        <Link href="#"><a>Figma</a></Link>
        <Link href="#"><a>Dribbble</a></Link>
        <Link href="#"><a>LinkedIn</a></Link>
      </footer>
    </section>
  );
}