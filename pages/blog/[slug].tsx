import Layout from '@/components/Layout';
import { BlogEntry } from '../../lib/types';
import { fetcher } from '../../lib/api';
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';

type Props = {
    blog: BlogEntry,
    content: string
}

const Blog = ({ blog, content }: Props) => {

    return (
        <Layout>
            <div className='mx-auto lg:max-w-7xl md:px-48 mb-16'>
            <h3 className="font-bold text-5xl mb-4">
                {blog.attributes.title}
            </h3>
            <p className='text-sm mb-16'>
                {blog.attributes.date}
            </p>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {content}
            </ReactMarkdown>
            </div>
        </Layout>
    )
}

type ServerSideProps = {
    params: { slug: string }
}

export async function getServerSideProps({ params }: ServerSideProps) {
    const { slug } = params;
    const blogResponse = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/blog/${slug}`
        );
    // let content = await markdownToHTML(blogResponse.data.attributes.content);
   let content = blogResponse.data.attributes.content;
    //content = replaceImageUrls(content)
    return {
        props: {
            blog: blogResponse.data,
            content,
        }
    }
}

export default Blog;
