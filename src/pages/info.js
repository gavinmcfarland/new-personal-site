import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import { useLocalMarkdownForm } from 'next-tinacms-markdown'

import Layout from '../components/Layout'

export default function Info(props) {
	const formOptions = {
		fields: [
			{
				name: 'frontmatter.background_color',
				label: 'Background Color',
				component: 'color'
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
			pathname='info'
			bgColor={data.frontmatter.background_color}
			siteTitle={props.title}
		>
			<section className='info_blurb'>
				<ReactMarkdown source={data.markdownBody} />
			</section>
		</Layout>
	)
}

Info.getInitialProps = async function () {
	const content = await import(`../data/info.md`)
	const config = await import(`../data/config.json`)
	const data = matter(content.default)

	return {
		markdownFile: {
			fileRelativePath: `src/data/info.md`,
			frontmatter: data.data,
			markdownBody: data.content
		},
		title: config.default.title
	}
}
