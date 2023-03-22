import Layout from '@/components/Layout';
import { BlogEntry } from '../../lib/types';
import { fetcher } from '../../lib/api';
import { markdownToHTML, replaceImageUrls } from '../../lib/markdownToHTML';

type Props = {
    blog: BlogEntry,
    content: string
}

const Blog = ({ blog, content }: Props) => {
    return (
        <Layout>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                {blog.attributes.title}
                </span>
            </h1>
            <p>
                <span>
                {blog.attributes.date}
                </span>
            </p>
            <p>
                <div className='tracking-wide font-normal text-sm' 
                dangerouslySetInnerHTML={{__html: content}}></div>
            </p>
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
    let content = await markdownToHTML(blogResponse.data.attributes.content);
    //content = replaceImageUrls(content)
    return {
        props: {
            blog: blogResponse.data,
            content,
        }
    }
}

export default Blog;