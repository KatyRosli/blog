import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BlogDataResponse } from '../lib/types'

type Props = {
  blogs: BlogDataResponse | undefined
}

const Blogs = ({ blogs }: Props) => {
  console.log('blogimage', process.env.STRAPI_URL );
  return (
    <>
      <ul className="list-none space-y-4 text-4xl font-bold mb-3">
        {blogs  &&
          blogs.data.map((blog: any) => {
            return (
              <div key={blog.id}>
                <Image src={process.env.STRAPI_URL + blog.attributes.cover.data.attributes.url} alt={blog.attributes.title} width={300} height={300}/>
                  <Link className='text-xl hover:text-violet-700' href={`blog/` + blog.attributes.slug}> 
                  {blog.attributes.title}
                </Link>
                <p className='text-sm'>{blog.attributes.date}</p>
                <p className='text-sm'>{blog.attributes.description}</p>
                <Link className='text-violet-700 underline text-sm' href={`blog/` + blog.attributes.slug}>Read More</Link>
              </div>
          );
          })}
      </ul>
    </>
  );
};

export default Blogs;