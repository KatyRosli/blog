import Link from 'next/link';
import { BlogDataResponse } from '../lib/types'

type Props = {
  blogs: BlogDataResponse | undefined
}

const Blogs = ({ blogs }: Props) => {
  return (
    <>
      <ul className="list-none space-y-4 text-4xl font-bold mb-3">
        {blogs  &&
          blogs.data.map((blog: any) => {
            return (
              <li key={blog.id}>
                <Link className='text-xl hover:text-violet-700' href={`blog/` + blog.attributes.slug}> 
                  {blog.attributes.title}
                </Link>
                <p className='text-sm'>{blog.attributes.date}</p>
                <Link className='text-violet-700' href={`blog/` + blog.attributes.slug}>Read More</Link>
              </li>
          );
          })}
      </ul>
    </>
  );
};

export default Blogs;