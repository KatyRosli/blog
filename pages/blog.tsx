import Layout from '../components/Layout';
import Blogs from "../components/Blogs";
import Search from "../components/Search";
import { fetcher } from '../lib/api';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { BlogDataResponse, BlogEntry } from '../lib/types';
import Link from 'next/link';

type Props = {
    blogs: BlogDataResponse
}

const BlogsList = ({ blogs }: Props) => {
    const [currentPageIndex, setCurrentPageIndex] = useState(1);
    const [filteredBlogs, setFilteredBlogs] = useState<BlogDataResponse | undefined>(undefined);
    const [searchValue, setSearchValue] = useState('');

    const { data } = useSWR<BlogDataResponse>(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs?populate=*&pagination[page]=${currentPageIndex}&pagination[pageSize]=5&sort[0]=date%3Adesc`, 
        fetcher, 
        {
            fallbackData: { data: [], meta: { pagination: { pageCount: 0 }}},
        }
    );

    useEffect(() => {
      if (searchValue && searchValue.length > 0) {
          const filteredBlogs = {
              data: data?.data.filter(blog =>
                  blog.attributes.title.toLowerCase().includes(searchValue.toLowerCase())
              ) || [],
              meta: { pagination: { pageCount: 0 }}
          };
          setFilteredBlogs(filteredBlogs);
      } else {
        setFilteredBlogs(data);
      }
  }, [searchValue, data]);

    return (
        <Layout>
            <div className='mx-auto lg:max-w-7xl md:px-48 mb-16'>
                <p className="font-bold text-5xl mb-16">All Blog Post</p>
                <Search value={searchValue} setSearchValue={setSearchValue} />
                {filteredBlogs?.data.length === 0 && (
                  <p className="text-xl text-center my-8">
                    No results found. Please try another search.
                    < br/>
                    <Link href="/blog" 
                    className="text-decoration-line: underline"
                    onClick={() => window.location.reload()}>
                      Click here to view all blog posts
                    </Link>
                  </p>
                )}
                <Blogs blogs={filteredBlogs ?? { data: [], meta: {pagination: { pageCount: 1 }}}} />
                <div className='justify-between md:flex md:px-48 mt-32'>
                    <button
                        className={`border-2 text-black dark:text-white font-bold py-2 px-2 rounded-full ${
                            currentPageIndex === 1 ? 'bg-gray-300' : 'bg-violet-700 text-white'
                        }`}
                        disabled={currentPageIndex === 1}
                        onClick={() => setCurrentPageIndex(currentPageIndex - 1)}
                    >
                        {' '}
                        Previous
                    </button>
                    <span className='mx-3.5'>{`${currentPageIndex} of ${
                        data && data.meta.pagination.pageCount
                    }`}</span>
                    <button
                        className={`border-2 text-black dark:text-white font-bold py-2 px-2 rounded-full ${
                            currentPageIndex === (data && data.meta && data.meta.pagination && data.meta?.pagination?.pageCount)
                                ? 'bg-gray-300'
                                : 'bg-violet-700 text-white'
                        }`}
                        disabled={currentPageIndex === (data && data.meta && data.meta.pagination && data.meta?.pagination?.pageCount)}
                        onClick={() => setCurrentPageIndex(currentPageIndex + 1)}
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
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs?populate=*&pagination[page]=1&pagination[pageSize]=5&sort=date%3Adesc`
  );
  const blogs = blogsResponse.data;
  const latestBlog = blogs[0];
  const pageIndex = Math.ceil((blogs.indexOf(latestBlog) + 1) / 5);

  return {
      props: {
          blogs: {
            datae: blogs,
            meta: { pagination: { pageCount: Math.ceil(blogs.length / 5)}},
      },
      pageIndex,
    },
  };
}
