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
    const [pageIndex, setPageIndex] = useState(1);
    const [filteredBlogs, setFilteredBlogs] = useState<BlogDataResponse | undefined>(undefined);
    const [searchValue, setSearchValue] = useState('');

    const sortByDate = ((array: Array<BlogEntry>) => {
      array?.sort((a: BlogEntry, b: BlogEntry) => Date.parse(a.attributes.date) - Date.parse(b.attributes.date));
      array?.reverse();
      return array;
    })

    const { data } = useSWR<BlogDataResponse>(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs?populate=*&pagination[page]=${pageIndex}&pagination[pageSize]=5`, 
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
          filteredBlogs.data.sort((a: BlogEntry, b: BlogEntry) => Date.parse(a.attributes.date) - Date.parse(b.attributes.date));
          filteredBlogs.data.reverse();
          setFilteredBlogs(filteredBlogs);
      } else {
        data?.data.sort((a: BlogEntry, b: BlogEntry) => Date.parse(a.attributes.date) - Date.parse(b.attributes.date));
        data?.data.reverse();
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
                <Blogs blogs={filteredBlogs ?? { data: [], meta: {pagination: { pageCount: 0 }}}} />
                <div className='justify-between md:flex md:px-48 mt-32'>
                    <button
                        className={`border-2 text-black dark:text-white font-bold py-2 px-2 rounded-full ${
                            pageIndex === 1 ? 'bg-gray-300' : 'bg-blue-400'
                        }`}
                        disabled={pageIndex === 1}
                        onClick={() => setPageIndex(pageIndex - 1)}
                    >
                        {' '}
                        Previous
                    </button>
                    <span className='mx-3.5'>{`${pageIndex} of ${
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
