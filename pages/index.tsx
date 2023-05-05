import Layout from '../components/Layout';
import Link from 'next/link';
import Summary from '@/components/Summary';
import { NextSeo } from 'next-seo';
import BannerImage from '../components/assets/Code With Katy Rosli.jpg';
import React from 'react';

export default function Home() {
  const [base64Image, setBase64Image] = React.useState<string>('');

  React.useEffect(() => {
    const image = new Image();
    image.src = BannerImage.src;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(image, 0, 0);
      const dataURL = canvas.toDataURL('image/jpeg');
      setBase64Image(dataURL.replace(/^data:image\/(png|jpeg);base64,/, ''));
    };
  }, []);

  return (
    <Layout>
      <NextSeo
      title='Code with Katy Rosli, experienced Frontend Developer | Fullstack Developer'
      description='Experienced Frontend Developer | Fullstack Developer'
      openGraph={{
        url: 'https://www.codewithkatyrosli.com',
        title: 'Experienced Frontend Developer | Fullstack Developer',
        description: 'Experienced Frontend Developer | Fullstack Developer',
        images: [
          {
          url: `data:image/jpeg;base64,${base64Image}`,
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
