import Layout from '@/components/Layout';
import { fetcher } from '../../lib/api';

const Blog = ({ blog }) => {
    return (
        <Layout>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                {blog.attributes.title}
                </span>
            </h1>
        </Layout>
    )
}


export async function getServerSideProps({ params }) {
    const { slug } = params;
    const blogResponse = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/blog/${slug}`
        );
    return {
        props: {
            blog: blogResponse.data
        }
    }
}

export default Blog;