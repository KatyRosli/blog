import Head from 'next/head';
import { ReactNode } from 'react';
import Footer from './Footer';
import Nav from './Nav';

type Props = {
    children: ReactNode
}

const Layout = ({ children }: Props) => (
    <>
    <Head>
        <title>Code With Katy Rosli</title>
    </Head>
    <Nav />
    <main className='px-4'>
        <div
        /* className='
        flex
        justify-center
        items-center
        bg-whit
        mx-auto
        w-2/4
        rounded-lg
        my-16
        p-16' */
        >
            <div className='text-2xl font-medium'>{children}</div>
        </div>
    </main> 
    <Footer />
    </>
);
export default Layout;
