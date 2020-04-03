import Head from 'next/head'

export default function Meta(props) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <title>{props.siteTitle}</title>
                <meta name="Description" content={props.description}></meta>
                <link href="https://fonts.googleapis.com/css2?family=Cousine:wght@400;700&family=Fira+Code:wght@400;500;700&family=Roboto+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </Head>
        </>
    )
}