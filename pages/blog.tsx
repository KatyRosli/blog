import Layout from '../components/Layout';
import Blogs from "../components/Blogs";
import { fetcher } from '../lib/api';
import useSWR from 'swr';
import { useState } from 'react';
import { BlogDataResponse, BlogEntry } from '../lib/types';

type Props = {
    blogs: BlogDataResponse
}

const BlogsList = ({ blogs }: Props) => {
    const [pageIndex, setPageIndex] = useState(1);
    const { data } = useSWR<BlogDataResponse>(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs?populate=*&pagination[page]=${pageIndex}&pagination[pageSize]=5`, 
        fetcher, 
        {
            fallbackData: blogs,
        }
    );
    return (
        <Layout>
          <div className='mx-auto lg:max-w-7xl md:px-48 mb-16'>
            <p className="font-bold text-5xl mb-16">All Blog Post</p>
            <Blogs blogs={blogs} />
            <div className="space-x-2 space-y-2 mt-48">
        <button
          className={`border-2 text-black dark:text-white font-bold py-2 px-2 rounded-full ${
            pageIndex === 1 ? 'bg-gray-300' : 'bg-blue-400'
          }`}
          disabled={pageIndex === 1}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          {' '}
          Previous Page
        </button>
        <span>{`${pageIndex} of ${
          data && data.meta.pagination.pageCount
        }`}</span>
        <button
          className={`border-2 text-black dark:text-white font-bold py-2 px-2 rounded-full ${
            pageIndex === (data && data.meta && data.meta.pagination && data.meta?.pagination?.pageCount)
              ? 'bg-gray-300'
              : 'bg-violet-700'
          }`}
          disabled={pageIndex === (data && data.meta && data.meta.pagination && data.meta?.pagination?.pageCount)}
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          Next Page
        </button>
      </div>
      </div>
        </Layout>
    )
};

export default BlogsList;

export async function getStaticProps() {
    const blogsResponse = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs?populate=*&pagination[page]=1&pagination[pageSize]=5`
    );
    blogsResponse.data.sort((a: BlogEntry, b: BlogEntry) => Date.parse(a.attributes.date) - Date.parse(b.attributes.date))
    blogsResponse.data.reverse()

    return {
        props: {
            blogs: blogsResponse,
        },
    };
}