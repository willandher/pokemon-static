import { FC } from "react"
import Head from "next/head"
import { Navbar } from "../ui";
import {useRouter} from "next/router";


interface Props {
    title?: string;
    children: any;
}

const origin = (typeof  window === 'undefined') ? '' : window.location.origin;
export const Layout: FC<Props> = ({ children, title }) =>{
    return (
        <>
        <Head>
            <title>{title || 'Pokemon App'}</title>
            <meta name="author" content="Willandher Goyo"/>
            <meta name="description" content={`Información sobre el pokémon ${title}`}/>
            <meta name="keywords" content={`${title}, pokemon, pokedex`}/>
            <meta property="og:title" content={`Información sobre el pokemon ${title}`} />
            <meta property="og:description" content={`Estas es la pagina ${title}`} />
            <meta property="og:image" content={`${origin}/img/banner.png`} />
        </Head>
        <Navbar></Navbar>
        <main style={{
            padding: '0px 20px'
        }}>
            {children}
        </main>
        </>
    )
}
