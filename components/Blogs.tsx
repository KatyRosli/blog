import Link from 'next/link';

const Blogs = ({ blogs }) => {
    console.log('yoo', blogs);
  return (
    <>
      <ul className="list-none space-y-4 text-4xl font-bold mb-3">
        {blogs  &&
          blogs.data.map((blog: any) => {
            return (
              <li key={blog.id}>
                <Link href={`blog/` + blog.attributes.title}>
                </Link>
              </li>
          );
          })}
      </ul>
    </>
  );
};

export default Blogs;