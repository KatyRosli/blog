import Layout from '@/components/Layout';
import { fetcher } from '../../lib/api';
import markdownToHTML from '../../lib/markdownToHTML';

const Blog = ({ blog, content }) => {
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
                <span>
                {blog.attributes.image}
                </span>
            </p>
        </Layout>
    )
}


export async function getServerSideProps({ params }) {
    const { slug } = params;
    const blogResponse = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/blog/${slug}`
        );
    const content = await markdownToHTML(blogResponse.data.attributes.content);
    return {
        props: {
            blog: blogResponse.data,
            content,
        }
    }
}

export default Blog;