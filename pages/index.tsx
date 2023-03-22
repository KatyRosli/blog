import Layout from '../components/Layout';
import Link from 'next/link';
import Summary from '@/components/Summary';

export default function Home() {
  return (
    <Layout>
      <h1 className='font-bold text-5xl'>Hi,<br/>I’m Katy Rosli.</h1>
      <h2>Frontend Developer, with Backend knowledge.</h2>
      <p>ReactJS . TypeScript . JavaScript . NextJs . VueJs . CSS . NodeJs . React Native</p>
      <a target='_blank' href='https://www.katyrosli.com/#portfolio' rel='noopener noreferrer'><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">View Portfolio</button></a>
      <Link href='/blog'><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Read the Blog</button></Link>
      <Summary />
    </Layout>
  )
};
