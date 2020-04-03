import Header from "./Header";
import Meta from './Meta'
import Link from "next/link";
import Box from './Box'

export default function Layout(props) {
  return (
    <>
      <div className="App">
        <Meta
          siteTitle={props.siteTitle}
          siteDescription={props.siteDescription}
        />
        <Header siteTitle={props.siteTitle} />
        <main className="Main">{props.children}</main>
        <footer className="Footer" width="viewport">
          <Box flexGrow="1" gapColumn="var(--rem-1)">
            <span>Copyright 2020 &copy; Limitless Loop</span>
            <Link href="#"><a>Built with Typolize</a></Link>
          </Box>
          <Box gapColumn="var(--rem-1)" flexGrow="0">
            <Link href="#"><a>Twitter</a></Link>
            <Link href="#"><a>Github</a></Link>
            <Link href="#"><a>Figma</a></Link>
            <Link href="#"><a>Dribbble</a></Link>
            <Link href="#"><a>LinkedIn</a></Link>
          </Box>
        </footer>
      </div>

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
                    padding-left: var(--rem-3);
                    padding-right: var(--rem-3);
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
                    z-index: 200;
                }

                .Header {
                    flex-direction: row;
                    display: flex;
                    padding-top: var(--rem-1);
                    padding-bottom: var(--rem-1);
                    align-items: center;
                    font-size: var(--font-size--1);
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
                    font-size: var(--font-size--1);
                    display: flex;
                    padding-top: var(--rem-6);
                    padding-bottom: var(--rem-3);
                }

                .Logo {
                    font-weight: bold;
                    font-size: var(--font-size-1);
                }

                /* Styling */
                .Header {
                    /* border-bottom: 1px solid; */
                    padding-left: inherit;
                    padding-right: inherit;
                }

                .Header > * {
                    --has-bfc: 0;
                }

                .Header > * > * {
                    /* --has-bfc: initial; */
                }

                .App {
                    max-width: 1400px;
                    box-sizing: content-box;
                    
                    /* Centers the site */
                    /* margin-left: auto; */
	                /* margin-right: auto; */

                    /* Passed nesting into children elements */
                    padding-left: inherit;
                    padding-right: inherit;
                }
                article > h1 {
                    max-width: 19ch
                }
                article > p {
                    max-width: 70ch
                }
        `}
      </style>
    </>
  );
}