import Head from 'next/head'
import hljs from 'highlight.js';

export default function Meta(props) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <title>{props.siteTitle}</title>
                <meta name="Description" content={props.description}></meta>
                <link rel="stylesheet"
                    href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/default.min.css" />
                <link href="https://myCDN.com/prism@v1.x/themes/prism.css" rel="stylesheet" />
            </Head>
            <style jsx global>
                {`
                /* Fullwidth */
                [width="viewport"] {
                    /* Removes the max-wdith */
                    max-width: none !important;
                    width: 100vw;
                    box-sizing: border-box;
                    /* margin-left: calc(var(--container-margin) * -1); */

                    /* Centers the element */
                    position: relative;
                    /*left: 50%; */
                    margin-left: 50%;
                    transform: translate(-50vw);
                    /* Inherits any padding set on parent */
                    padding-left: inherit;
                    padding-right: inherit;
                }

                /* Sticky Footer */
                #__next {
                    min-height: 100%;
                }
                #__next > div {
                    min-height: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                html {
                    height: 100%;
                }

                body {
                    padding: 0;
                    margin: 0;
                    min-height: 100%;
                    
                }
                .Header {
                    position: sticky;
                    top: 0;
                }

                .Header {
                    flex-direction: row;
                    display: flex;
                }

                .Header *:nth-child(1) {
                    flex-grow: 1;
                }
                .App {
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                    flex-shrink: 0;
                    width: 100%; /* Fixes issue with CMS sidebar being open */
                }
                .Main {
                    flex-grow: 1;
                }
                .Footer {
                    flex-grow: 0;
                }

                /* Styling */
                .Header {
                    border-bottom: 1px solid;
                }

                .App {
                    max-width: 1400px;
                    box-sizing: content-box;
                    
                    /* Centers the site */
                    {/* margin-left: auto; */}
	                {/* margin-right: auto; */}
                }
        `}
            </style>
        </>
    )
}