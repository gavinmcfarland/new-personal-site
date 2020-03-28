import matter from 'gray-matter'
import { useLocalMarkdownForm } from 'next-tinacms-markdown'

import Layout from '../components/Layout'
import BlogList from '../components/BlogList'

const Thoughts = ({ markdownFile, allBlogs }) => {
	const formOptions = {
		fields: [
			{
				name: 'frontmatter.title',
				label: 'Page Title',
				component: 'text'
			}
		]
	}
	const [data] = useLocalMarkdownForm(markdownFile, formOptions)

	return (
		<Layout
			pathname='/'
			siteTitle={data.frontmatter.title}
		>
			<section>
				<h1>{data.frontmatter.title}</h1>
				<BlogList allBlogs={allBlogs} />
			</section>
		</Layout>
	)
}

export default Thoughts

Thoughts.getInitialProps = async function () {
	const content = await import(`../data/thoughts.md`)
	const data = matter(content.default)

	// get all blog data for list
	const posts = (context => {
		const keys = context.keys()
		const values = keys.map(context)
		const data = keys.map((key, index) => {
			// Create slug from filename
			const slug = key
				.replace(/^.*[\\\/]/, '')
				.split('.')
				.slice(0, -1)
				.join('.')
			const value = values[index]
			// Parse yaml metadata & markdownbody in document
			const document = matter(value.default)
			return {
				document,
				slug
			}
		})
		return data
	})(require.context('../posts', true, /\.md$/))

	return {
		allBlogs: posts,

		markdownFile: {
			fileRelativePath: `src/data/thoughts.md`,
			frontmatter: data.data,
			markdownBody: data.content
		}
	}
}
