import Layout from '@/components/Layout';
import { BlogEntry } from '../../lib/types';
import { fetcher } from '../../lib/api';
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight'
import Link from 'next/link';

type Props = {
    blog: BlogEntry,
    content: string,
    prevBlog?: BlogEntry,
    nextBlog?: BlogEntry,
}

const Blog = ({ blog, content, prevBlog, nextBlog }: Props) => {
//console.log ('next/prev blog', prevBlog, nextBlog);
    return (
        <Layout>
            <div className='mx-auto lg:max-w-7xl md:px-48 mb-16'>
            <h3 className="font-bold text-5xl mb-4">
                {blog.attributes.title}
            </h3>
            <p className='text-sm mb-16'>
                {blog.attributes.date}
            </p>
            <ReactMarkdown className='justify-between' rehypePlugins={[rehypeRaw, rehypeHighlight]}>
                {content}
            </ReactMarkdown>
            </div>
        </Layout>
    )
}

type ServerSideProps = {
    params: {
        slug: string,
        prevblog: boolean | undefined,
        nextblog: boolean | undefined,
    }
}

export async function getServerSideProps({ params }: ServerSideProps) {
    const { slug } = params;
    //console.log('params', params)
    const blogResponse = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/blog/${slug}`
        );
    const currentBlog = blogResponse.data;
    const prevBlog = params.prevblog !== undefined ? params.prevblog : null;
    const nextBlog = params.nextblog !== undefined ? params.nextblog : null;
    const content = currentBlog.attributes.content;
    return {
        props: {
            blog: currentBlog,
            content,
            prevBlog,
            nextBlog,
        }
    }
}


export default Blog;
