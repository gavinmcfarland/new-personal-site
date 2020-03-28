import Link from "next/link";

export default function Header(props) {
  return (
    <header className="Header" width="viewport">
      <Link href="/"><a>G</a></Link>

      <nav>
        <Link href="/thoughts"><a>Thoughts</a></Link>
        <Link href="/about"><a>About</a></Link>
      </nav>
    </header>
  );
}
