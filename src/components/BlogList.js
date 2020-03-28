import Link from "next/link";
import ReactMarkdown from "react-markdown";

const BlogList = (props) => {

  function truncateSummary(content) {
    return content.slice(0, 200).trimEnd();
  }

  function reformatDate(fullDate) {
    const date = new Date(fullDate)
    return date.toDateString().slice(4);
  }

  const posts = props.allBlogs

  return (
    <>
      <ul>
        {posts.length > 1 && posts.map(post => (
          <Link
            key={post.slug}
            href={{ pathname: `/thoughts/${post.slug}` }} >
            <a>
              <li>
                <h2>{post.document.data.title}</h2>
                {/* <h3>{reformatDate(post.document.data.date)}</h3> */}
                {/* <ReactMarkdown source={truncateSummary(post.document.content)} /> */}
              </li>
            </a>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default BlogList;
