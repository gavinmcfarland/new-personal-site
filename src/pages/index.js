import matter from 'gray-matter'
import { useLocalJsonForm } from 'next-tinacms-json'

import Layout from '../components/Layout'
import BlogList from '../components/BlogList'

const Index = ({ jsonFile, allBlogs }) => {
	const formOptions = {
		fields: [
			{
				name: 'title',
				label: 'Site Title',
				component: 'text'
			},
			{
				name: 'description',
				label: 'Site Description',
				component: 'text'
			},
			{
				name: 'intro',
				label: 'Introduction',
				component: 'textarea'
			},
			{
				name: 'repositoryUrl',
				label: 'Repository Url',
				component: 'text'
			}
		]
	}
	const [data] = useLocalJsonForm(jsonFile, formOptions)

	return (
		<Layout
			pathname='/'
			siteTitle={data.title}
			siteDescription={data.description}
		>
			<section>
				<h1>{data.intro}</h1>

				<h3>People I've Helped</h3>
				<div>Some content here</div>

				<h3>What I'm Thinking</h3>
				<BlogList allBlogs={allBlogs} />
				<hr />
				<h3>Things I've Made</h3>
				<h6>PostCSS Plugins</h6>
				<ul>
					<li>
						<a href="https://github.com/limitlessloop/postcss-proportional-spacing">Proportional Spacing</a>
					</li>
					<li>
						<a href="https://github.com/limitlessloop/postcss-negative-padding">Negative Padding</a>
					</li>
					<li>
						<a href="https://github.com/limitlessloop/postcss-border-align">Border Align</a>
					</li>
					<li>
						<a href="https://github.com/limitlessloop/postcss-custom-values">Custom Values</a>
					</li>
					<li>
						<a href="https://github.com/limitlessloop/postcss-sqrt">Sqrt and Pow Functions</a>
					</li>
					<li>
						<a href="https://github.com/limitlessloop/flex-gap-polyfill">Flex Gap Polyfill</a>
					</li>
				</ul>
				<h6>Figma Resources</h6>
				<ul>
					<li>
						<a href="https://www.figma.com/community/file/784773846783975923">Redlining Kit</a>
					</li>
					<li>
						<a href="https://www.figma.com/community/file/776921648331857127">Device Frames</a>
					</li>
					<li>
						<a href="https://www.figma.com/community/file/776917132627530982">Design Deliverables</a>
					</li>
					<li>
						<a href="https://www.figma.com/community/file/776913337659021541">Icon Template</a>
					</li>
					<li>
						<a href="https://www.figma.com/community/file/817057027097651580">Syntax Designer</a>
					</li>
				</ul>
			</section>
		</Layout>
	)
}

export default Index

Index.getInitialProps = async function () {
	const content = await import(`../data/config.json`)
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
		jsonFile: {
			fileRelativePath: `src/data/config.json`,
			data: content.default
		},

		allBlogs: posts
	}
}
