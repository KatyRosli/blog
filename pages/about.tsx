import Link from 'next/link';
import Layout from '../components/Layout';
import Summary from '@/components/Summary';

export default function About() {
  return (
    <Layout>
      <div className='mx-auto lg:max-w-7xl md:px-48 mb-16'>
      <Summary />
      <div className='mt-16'>
        <h3>Background</h3>
        <p className='text-base mb-16'>Born in Singapore. Other than Singapore, I have lived in other parts of the world 
        like in Glasgow (Scotland), Toronto (Canada), Malmö (Sweden) and now in Stockholm with my 
        husband and my son.</p>
        <h3>Education</h3>
        <p className='text-base mb-16'>I have a BA Hons in Communication Design from The Glasgow School of Art. I have over
        7 years of working experience as a UX/UI Designer. I’m currently working as a Frontend 
        Developer after completing a FullStack JavaScript Developer a career program from SALT 
        (School of Applied Technology).</p>
        <h3>Experiences</h3>
        <p className='text-base mb-16'>Over the years, I have worked for large organisations to start ups. 
        To name some, I’ve worked for Klarna, Braive, Hero Gaming, Asia Genomics and Sonoport. 
        All of my past experiences can be seen <Link className='text-violet-700 underline' href='https://www.linkedin.com/in/katy-rosli-761b70185/'> here </Link> on my LinkedIn.</p>
        <h3>Skills and Expertise</h3>
        <p className='text-base'>Languages: TypeScript, JavaScript, HTML, CSS, SCSS.</p>
        <p className='text-base'>Frontend: React Js, Next Js, Vue Js, Redux, jQuery, Bootstrap, Tailwind, React Native.</p>
        <p className='text-base'>Backend: NodeJs, ExpressJs, Axios, Nodemon, REST, GraphQL, MongoDB, PostgresSQL, Strapi.</p>
        <p className='text-base mb-16'>Test: Mocha, Jest.</p>
        </div>
      </div>
    </Layout>
  )
};
