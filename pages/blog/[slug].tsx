/* eslint-disable react/no-children-prop */
import { CSSProperties, useState } from 'react';
import Layout from '@/components/Layout';
import { BlogEntry } from '../../lib/types';
import { fetcher } from '../../lib/api';
import ReactMarkdown from "react-markdown";
import { NextSeo } from 'next-seo';
import { ImageUrl } from '@/utils';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
    materialDark,
    materialLight,
    dracula,
  } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import { CopyToClipboard } from 'react-copy-to-clipboard';

type Props = {
    blog: BlogEntry,
    content: string,
}

const Blog = ({ blog, content }: Props) => {
    SyntaxHighlighter.registerLanguage('jsx', jsx);
    SyntaxHighlighter.registerLanguage('markdown', markdown);

    const [copied, setCopied] = useState(false);

    const handleCodeCopy = () => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    };

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
              const code = String(children).replace(/\n$/, '');
              return !inline && match ? (
                <SyntaxHighlighter
                  children={code}
                  language={match[1]}
                  style={{ code: { fontFamily: 'inherit', fontSize: '12px' }, ...dracula } as any as { [key: string]: CSSProperties }}
                  {...props}
                />
              ) : (
                <code className={className + 'code-font'} {...props}>
                  <CopyToClipboard text={code as string} onCopy={handleCodeCopy}>
                    <button className="copy-button">
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </CopyToClipboard>
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
