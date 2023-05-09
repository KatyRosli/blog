/* eslint-disable react/no-children-prop */
import Layout from '@/components/Layout';
import { BlogEntry } from '../../lib/types';
import { fetcher } from '../../lib/api';
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight'
import { NextSeo } from 'next-seo';
import { ImageUrl } from '@/utils';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
    materialDark,
    materialLight,
    oneLight,
  } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CSSProperties, ReactElement } from 'react';
import PrismJsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';


type Props = {
    blog: BlogEntry,
    content: string,
}

type CodeProps = {
    node: ReactElement,
    inline: boolean,
    className: string,
    children: ReactElement[]
}

const Blog = ({ blog, content }: Props) => {
    SyntaxHighlighter.registerLanguage('jsx', jsx);
    SyntaxHighlighter.registerLanguage('markdown', markdown);

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
                          width: 200,
                          height: 118,
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
            <ReactMarkdown
          children={content}
          components={{
            code({ node, inline, className, children, style, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  language={match[1]}
                  style={{ code: { fontFamily: 'inherit' }, ...materialDark } as any as { [key: string]: CSSProperties }}
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
        /> 
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
    const blogResponse = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/blog/${slug}`
        );
    const currentBlog = blogResponse.data;
    const content = currentBlog.attributes.content;
    return {
        props: {
            blog: currentBlog,
            content,
        }
    }
}

export default Blog;
