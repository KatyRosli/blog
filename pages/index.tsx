import Layout from '../components/Layout';
import Link from 'next/link';
import Summary from '@/components/Summary';
import { NextSeo } from 'next-seo';
import Banner from '../components/assets/Code With Katy Rosli.jpg';

function getBase64Image(image: HTMLImageElement): string {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(image, 0, 0);
  const dataURL = canvas.toDataURL('image/jpeg');
  return dataURL.replace(/^data:image\/(png|jpeg);base64,/, '');
}

export default function Home() {
  const image : HTMLImageElement = new Image();
  image.src = Banner.src;
  const base64 = getBase64Image(image);

  return (
    <Layout>
      <NextSeo
      title='Code with Katy Rosli, a blog about programming and design'
      description='Frontend Developer | Fullstack Developer | UX/UI Designer'
      openGraph={{
        url: 'https://www.codewithkatyrosli.com',
        title: 'Code with Katy Rosli, a blog about programming and design',
        description: 'Frontend Developer | Fullstack Developer | UX/UI Designer',
        images: [
          {
          url: `data:image/jpeg;base64,${base64}`,
          width: 1224,
          height: 724,
          alt: 'CodeWithKatyRosliBanner',
          type: 'image/jpeg',
          },
        ],
        site_name: 'Code With Katy Rosli',
      }}
      />
      <div className='justify-between mx-auto lg:max-w-7xl md:flex md:px-48 mb-40'>
        <div className='mb-8'>
          <h1 className='font-bold text-5xl'>Hi,<br/>I’m Katy Rosli.</h1>
          <h2>Frontend Developer, with Backend knowledge.</h2>
          <p className='text-base'>ReactJS . TypeScript . JavaScript . NextJs . VueJs . CSS . NodeJs . React Native</p>
        </div>
        <div className='flex flex-col'>
          <a target='_blank' href='https://www.katyrosli.com/#portfolio' rel='noopener noreferrer'><button className="bg-violet-700 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded-full mb-8">View Portfolio</button></a>
          <Link href='/blog'><button className="border-2 border-violet-700 hover:bg-violet-900 hover:text-white text-violet-700 font-bold py-2 px-4 rounded-full">Read the Blog</button></Link>
        </div>
      </div>
      <div className='justify-between mx-auto lg:max-w-7xl md:flex md:px-48 mb-40'>
        <Summary />
      </div>
    </Layout>
  )
};
