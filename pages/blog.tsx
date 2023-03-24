import Layout from '../components/Layout';
import Blogs from "../components/Blogs";
import { fetcher } from '../lib/api';
import useSWR from 'swr';
import { useState } from 'react';
import { BlogDataResponse } from '../lib/types';

type Props = {
    blogs: BlogDataResponse
}

const BlogsList = ({ blogs }: Props) => {
    const [pageIndex, setPageIndex] = useState(1);
    const { data } = useSWR<BlogDataResponse>(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs?pagination[page]=${pageIndex}&pagination[pageSize]=5`, 
        fetcher, 
        {
            fallbackData: blogs,
        }
    );
    return (
        <Layout>
          <div className='mx-auto lg:max-w-7xl md:px-48 mb-16'>
            <p className="font-bold text-5xl mb-16">All Blog Post</p>
            <Blogs blogs={data} />
            <div className="space-x-2 space-y-2">
        <button
          className={`md:p-2 rounded py-2 text-black text-white p-2 ${
            pageIndex === 1 ? 'bg-gray-300' : 'bg-blue-400'
          }`}
          disabled={pageIndex === 1}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          {' '}
          Previous
        </button>
        <span>{`${pageIndex} of ${
          data && data.meta.pagination.pageCount
        }`}</span>
        <button
          className={`md:p-2 rounded py-2 text-black text-white p-2 ${
            pageIndex === (data && data.meta && data.meta.pagination && data.meta?.pagination?.pageCount)
              ? 'bg-gray-300'
              : 'bg-blue-400'
          }`}
          disabled={pageIndex === (data && data.meta && data.meta.pagination && data.meta?.pagination?.pageCount)}
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          Next
        </button>
      </div>
      </div>
        </Layout>
    )
};

export default BlogsList;

export async function getStaticProps() {
    const blogsResponse = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs?pagination[page]=1&pagination[pageSize]=5`
    );
    console.log('getStaticProps data: ', blogsResponse)
    return {
        props: {
            blogs: blogsResponse,
        },
    };
}