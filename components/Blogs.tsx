import Link from 'next/link';
import { BlogDataResponse, BlogEntry } from '../lib/types';
import { event } from '../gtag';

type Props = {
  blogs: BlogDataResponse | undefined;
};

const Blogs = ({ blogs }: Props) => {
  const blogsData = blogs?.data;

  const trackBlogClick = (blog: BlogEntry) => {
    event({
      action: 'blog_link_click',
      category: 'Blog',
      label: `Clicked on Blog: ${blog.attributes?.title}`,
    });
  };

  return (
    <>
      <ul className="list-none space-y-4 text-4xl font-bold mb-3">
        {blogsData &&
        blogsData.map((blog: BlogEntry, index: number) => {
            return (
              <div key={blog.id}>
                  <Link 
                    className='text-xl hover:text-violet-700' 
                    href={`blog/` + blog.attributes?.slug}
                    onClick={() => trackBlogClick(blog)}> 
                    {blog.attributes?.title}
                </Link>
                <p className='text-sm'>{blog.attributes?.date}</p>
                <p className='text-sm'>{blog.attributes?.description}</p>
                <Link 
                  className='text-violet-700 underline text-sm' 
                  href={{
                    pathname: `blog/` + blog.attributes?.slug,
                  }}
                  onClick={() => trackBlogClick(blog)}>
                    Read More
                </Link>
                <hr />
              </div>
            );
          })}
      </ul>
    </>
  );
};

export default Blogs;