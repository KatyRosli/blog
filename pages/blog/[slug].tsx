import Layout from '@/components/Layout';
import { BlogEntry } from '../../lib/types';
import { fetcher } from '../../lib/api';
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight'
import { NextSeo } from 'next-seo';
import { ImageUrl } from '@/utils';

type Props = {
    blog: BlogEntry,
    content: string,
    prevBlog?: BlogEntry,
    nextBlog?: BlogEntry,
}

const Blog = ({ blog, content }: Props) => {
    return (
        <Layout>
            <NextSeo 
                title={blog.attributes.title}
                canonical={`blog/` + blog.attributes?.slug}
                openGraph={{
                    type: 'article',
                    article: {
                        publishedTime: blog.attributes.date,
                        authors:['Katy Rosli'],
                        tags: ['JavaScript', 'TypeScript', 'Node.js', 'ReactJs', 'React Native', 'VueJs', 'Angular'],
                    },
                    url: 'https://www.codewithkatyrosli.com/',
                    images: [
                        {
                          url: `${ImageUrl('banner.png')}`,
                          width: 400,
                          height: 237,
                          alt: 'banner',
                          type: 'image/jpeg',
                        }
                    ],   
                    site_name: 'Code With Katy Rosli'
                }}
            />

            <div className='mx-auto lg:max-w-7xl md:px-48 mb-16'>
            <h3 className="font-bold text-5xl mb-4">
                {blog.attributes.title}
            </h3>
            <p className='text-sm mb-16'>
                {blog.attributes.date}
            </p>
            <ReactMarkdown className='justify-between'  rehypePlugins={[rehypeRaw, rehypeHighlight]} >
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
