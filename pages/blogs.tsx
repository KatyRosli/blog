import Layout from "../components/Layout";

const BlogList = () => {
    return (
        <Layout>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                    Blogs
                </span>
            </h1>
        </Layout>
    )
};

export default BlogList;

export async function getServerSideProps() {
    //testing123
}