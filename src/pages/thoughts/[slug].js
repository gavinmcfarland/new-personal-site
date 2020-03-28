import * as React from 'react'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import { useLocalMarkdownForm } from 'next-tinacms-markdown'

import Layout from '../../components/Layout'

export default function BlogTemplate(props) {
	const formOptions = {
		fields: [
			{
				label: 'Hero Image',
				name: 'frontmatter.hero_image',
				component: 'image',
				// Generate the frontmatter value based on the filename
				parse: filename => `../static/${filename}`,

				// Decide the file upload directory for the post
				uploadDir: () => '/src/public/static/',

				// Generate the src attribute for the preview image.
				previewSrc: data => `/static/${data.frontmatter.hero_image}`
			},
			{
				name: 'frontmatter.title',
				label: 'Title',
				component: 'text'
			},
			{
				name: 'frontmatter.date',
				label: 'Date',
				component: 'date'
			},
			{
				name: 'frontmatter.author',
				label: 'Author',
				component: 'text'
			},
			{
				name: 'markdownBody',
				label: 'Blog Body',
				component: 'markdown'
			}
		]
	}

	const [post] = useLocalMarkdownForm(props.markdownFile, formOptions)

	function reformatDate(fullDate) {
		const date = new Date(fullDate)
		return date.toDateString().slice(4)
	}

	return (
		<Layout siteTitle={props.title}>
			<article className='blog'>
				<figure className='blog__hero'>
					<img
						src={post.frontmatter.hero_image}
						alt={`blog_hero_${post.frontmatter.title}`}
					/>
				</figure>
				<div className='blog__info'>
					<h1>{post.frontmatter.title}</h1>
					<h3>{reformatDate(post.frontmatter.date)}</h3>
				</div>
				<div className='blog__body'>
					<ReactMarkdown source={post.markdownBody} />
				</div>
				<h2 className='blog__footer'>Written By: {post.frontmatter.author}</h2>
			</article>
		</Layout>
	)
}

BlogTemplate.getInitialProps = async function (ctx) {
	const { slug } = ctx.query
	const content = await import(`../../posts/${slug}.md`)
	const config = await import(`../../data/config.json`)
	const data = matter(content.default)

	return {
		markdownFile: {
			fileRelativePath: `src/posts/${slug}.md`,
			frontmatter: data.data,
			markdownBody: data.content
		},
		title: config.default.title
	}
}
