import Layout from '../components/Layout';
import Blogs from "../components/Blogs";
import { fetcher } from '../lib/api';

const BlogsList = ({ blogs }) => {
    return (
        <Layout>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                    Blogs
                </span>
            </h1>
            <Blogs blogs={blogs} />
        </Layout>
    )
};

export default BlogsList;

export async function getStaticProps() {
    console.log('gooo', process.env.NEXT_PUBLIC_STRAPI_URL);
    const blogsResponse = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs`
    );
    console.log('yaaa', blogsResponse);
    return {
        props: {
            blogs: blogsResponse,
        },
    };
}