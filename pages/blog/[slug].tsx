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
            <div className='mx-auto lg:max-w-7xl md:px-48 mb-16'>
            <h1 className="font-bold text-5xl mb-4">
                {blog.attributes.title}
            </h1>
            <p className='text-sm mb-16'>
                {blog.attributes.date}
            </p>
            <p>
                <div className='tracking-wide font-normal text-sm' 
                dangerouslySetInnerHTML={{__html: content}}></div>
            </p>
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
