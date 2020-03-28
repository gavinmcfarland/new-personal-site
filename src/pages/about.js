import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import { useLocalMarkdownForm } from 'next-tinacms-markdown'

import Layout from '../components/Layout'

export default function Info(props) {

	const formOptions = {
		fields: [
			{
				name: 'frontmatter.photo',
				label: 'Photo',
				component: 'image',

				parse: (filename) => `../static/${filename}`,

				uploadDir: () => '/src/public/static/',

				previewSrc: data => `/static/${data.frontmatter.photo}`
			},
			{
				name: 'markdownBody',
				label: 'Info Content',
				component: 'markdown'
			}
		]
	}

	const [data] = useLocalMarkdownForm(props.markdownFile, formOptions)

	return (
		<Layout
			pathname='about'
			siteTitle={props.title} >

			<h1>About</h1>

			<img
				src={data.frontmatter.photo}
				alt={`blog_hero_${data.frontmatter.title}`} />

			<ReactMarkdown source={data.markdownBody} />

		</Layout>
	)
}

Info.getInitialProps = async function () {
	const content = await import(`../data/about.md`)
	const config = await import(`../data/config.json`)
	const data = matter(content.default)

	return {
		markdownFile: {
			fileRelativePath: `src/data/about.md`,
			frontmatter: data.data,
			markdownBody: data.content
		},
		title: config.default.title
	}
}
