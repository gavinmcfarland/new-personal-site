import Link from "next/link";
import Tabs from "./Tabs";

export default function Header(props) {
  return (
    <header className="Header" width="viewport">
      <Link href="/"><a className="Logo">G</a></Link>

      <Tabs>
        <Link href="/thoughts"><a>Thoughts</a></Link>
        <Link href="/about"><a>About</a></Link>
      </Tabs>
    </header>
  );
}
