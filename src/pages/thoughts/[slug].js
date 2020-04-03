import * as React from 'react'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown/with-html'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { useLocalMarkdownForm } from 'next-tinacms-markdown'
import { Button as TinaButton } from '@tinacms/styles'
import emoji from 'remark-emoji';
import deflist from 'remark-deflist';
import remark2rehype from 'remark-rehype';

import { useForm, Wysiwyg } from 'tinacms'
import {
	InlineForm,
	InlineTextField,
	InlineField,
	useInlineForm,
} from 'react-tinacms-inline'

import Layout from '../../components/Layout'

function WithCodeStyles({ language, value }) {
	return (
		<SyntaxHighlighter language={language} useInlineStyles={false}>
			{value}
		</SyntaxHighlighter>
	)
}

function DefinitionList(props) {
	return (
		<dl>
			{props.children}
		</dl>
	)
}

function DefinitionTerm(props) {
	return (
		<dt>
			{props.children}
		</dt>
	)
}

function DefinitionDetails(props) {
	return (
		<dd>
			{props.children}
		</dd>
	)
}



function EditToggle() {
	const { status, activate, deactivate } = useInlineForm()
	const editing = status === 'active'
	return (
		<button
			onClick={() => {
				if (editing) deactivate()
				else activate()
			}}
		>
			{editing ? 'Preview' : 'Edit'}
		</button>
	)
}

export function SaveButton() {
	const { status, form } = useInlineForm()
	const editing = status === 'active'
	if (!editing) return null
	return (
		<button
			onClick={() => {
				form.finalForm.submit()
			}}
		>
			Save
		</button>
	)
}

export function SaveButtonTwo() {
	const { form } = useInlineForm()

	return (
		<TinaButton primary onClick={form.submit}>
			Save
		</TinaButton>
	)
}

function ResetButton() {
	const { status, form } = useInlineForm()
	const editing = status === 'active'
	if (!editing) return null
	return (
		<button
			onClick={() => {
				form.reset()
			}}
		>
			Reset
		</button>
	)
}

export default function BlogTemplate(props) {

	// const data = props.markdownFile

	// const formConfig = {
	// 	id: data.fileRelativePath,
	// 	label: 'Edit Post',
	// 	fields: [
	// 		{
	// 			name: 'markdownBody',
	// 			label: 'content',
	// 			component: 'markdown',
	// 		}
	// 	],
	// 	initialValues: {
	// 		markdownBody: data.markdownBody
	// 	},
	// 	onSubmit: (formData) => {

	// 	}
	// }
	// const formConfig = {
	// 	fields: [
	// 		{
	// 			label: 'Hero Image',
	// 			name: 'frontmatter.hero_image',
	// 			component: 'image',
	// 			// Generate the frontmatter value based on the filename
	// 			parse: filename => `../static/${filename}`,

	// 			// Decide the file upload directory for the post
	// 			uploadDir: () => '/src/public/static/',

	// 			// Generate the src attribute for the preview image.
	// 			previewSrc: data => `/static/${data.frontmatter.hero_image}`
	// 		},
	// 		{
	// 			name: 'frontmatter.title',
	// 			label: 'Title',
	// 			component: 'text'
	// 		},
	// 		{
	// 			name: 'frontmatter.date',
	// 			label: 'Date',
	// 			component: 'date'
	// 		},
	// 		{
	// 			name: 'frontmatter.author',
	// 			label: 'Author',
	// 			component: 'text'
	// 		},
	// 		{
	// 			name: 'markdownBody',
	// 			label: 'Blog Body',
	// 			component: 'markdown'
	// 		}
	// 	]
	// }

	// const [post, form] = useForm(formConfig)

	const [data, form] = useLocalMarkdownForm(props.markdownFile, {
		fields: [
			{ name: 'frontmatter.title', component: 'text' },
			{ name: 'markdownBody', component: 'markdown' },
		],
	})

	// const [post] = useLocalMarkdownForm(props.markdownFile, formOptions)

	function reformatDate(fullDate) {
		const date = new Date(fullDate)
		return date.toDateString().slice(4)
	}

	return (
		<Layout siteTitle="hello">
			<InlineForm form={form}>
				<article>
					{/* <img
					src={post.frontmatter.hero_image}
					alt={`blog_hero_${post.frontmatter.title}`}
				/> */}
					{/* <h1>{post.frontmatter.title}</h1> */}
					{/* <h3>{reformatDate(post.frontmatter.date)}</h3> */}
					<InlineField name="frontmatter.title">
						{
							({ input, status }) => {
								if (status === 'active') {
									return <input type='text' {...input} />
								}
								return <h1>{input.value}</h1>
							}
						}
					</InlineField>
					<InlineField name="markdownBody">
						{
							({ input, status }) => {
								if (status === 'active') {
									return <Wysiwyg input={input} />
								}
								return <ReactMarkdown source={input.value} renderers={{ code: WithCodeStyles, definitionList: DefinitionList, descriptionlist: DefinitionList, descriptionterm: DefinitionTerm, descriptiondetails: DefinitionDetails }} escapeHtml={false} plugins={[deflist, emoji]} />
							}
						}
					</InlineField>
					{/* <ReactMarkdown source={post.markdownBody} /> */}
				</article>
				<EditToggle />
				<SaveButton />
			</InlineForm>
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
