import Layout from '../components/Layout';
import Summary from '@/components/Summary';
import { event } from '../gtag';

export default function About() {
  const handleLinkClick = (url: string, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    event({
      action: 'link_click',
      category: 'About Page',
      label: 'LinkedIn Link',
    });
    window.open(url, '_blank');
  };

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
        <p className='text-base mb-16'>I have a BA Hons in Communication Design from The Glasgow School of Art. I graduated back in 2014. 
        I am currently employed as a Frontend Developer.</p>
        <h3>Experiences</h3>
        <p className='text-base mb-16'>Over the years, I have worked for large organisations to start ups. 
        To name some, I’ve worked for Klarna, Braive, Hero Gaming, Asia Genomics and Sonoport. 
        I am currently employed as a Frontend Developer in Stockholm, Sweden. 
        My work involves creating intuitive and visually appealing user interfaces (UX and UI design) for web applications.
        All of my current and past experiences can be seen{' '} 
        <a 
          className='text-violet-700 underline' 
          href='https://www.linkedin.com/in/katy-rosli-761b70185/'
          target='_blank'
          rel='noopener noreferrer'
          onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => handleLinkClick('https://www.linkedin.com/in/katy-rosli-761b70185/', e)}>
            here
          </a>{' '} on my LinkedIn.</p>
        <h3>Skills and Expertise</h3>
        <p className='text-base'>Languages: TypeScript, JavaScript.</p>
        <p className='text-base'>Frontend: React Js, Next Js, Redux, React Native, Vue Js, Angular, jQuery, Bootstrap, Tailwind, Vuetify, Storybook.</p>
        <p className='text-base'>Backend: NodeJs, ExpressJs, Axios, Nodemon, REST, GraphQL, MongoDB, PostgresSQL, Strapi, Sanity.</p>
        <p className='text-base mb-16'>Test: Mocha, Jest, Jasmine, Karma.</p>
        </div>
      </div>
    </Layout>
  )
};
