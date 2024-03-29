import Layout from '../components/Layout';
import Link from 'next/link';
import Summary from '@/components/Summary';
import { NextSeo } from 'next-seo';
import React from 'react';
import { ImageUrl } from '@/utils';
import { event } from '../gtag';

export default function Home() {
  return (
    <Layout>
      <NextSeo
      title='codewithkatyrosli.com'
      description='Katy Rosli: Experienced Frontend Developer | Fullstack Developer'
      openGraph={{
        url: 'https://www.codewithkatyrosli.com',
        title: 'Katy Rosli, experienced Frontend Developer | Fullstack Developer',
        description: 'Experienced Frontend Developer | Fullstack Developer',
        images: [
          {
            url: `${ImageUrl('banner.png')}`,
            width: 400,
            height: 237,
            alt: 'banner',
            type: 'image/jpeg',
          },
        ],
        site_name: 'Code With Katy Rosli',
      }}
      />
      <div className='justify-between mx-auto lg:max-w-7xl md:flex md:px-48 mb-40'>
        <div className='mb-8'>
          <h1 className='font-bold text-5xl'>Hi,<br/>I’m Katy Rosli.</h1>
          <h2>Experienced Frontend Developer | Fullstack Developer</h2>
          <p className='text-base'>ReactJS . TypeScript . JavaScript . NextJs . VueJs . CSS . NodeJs . React Native</p>
        </div>
        <div className='flex flex-col'>
          <a target='_blank' href='https://www.katyrosli.com/#portfolio' rel='noopener noreferrer'>
            <button 
              className="bg-violet-700 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded-full mb-8"
              onClick={() => 
              event({
                action: 'portfolio_button_click',
                category: 'Home Page',
                label:'View Portfolio Button',
              })
            }>View Portfolio</button></a>
          <Link href='/blog'>
            <button 
              className="border-2 border-violet-700 hover:bg-violet-900 hover:text-white text-violet-700 font-bold py-2 px-4 rounded-full"
              onClick={() =>
              event({
                action: 'bloh_button_click',
                category: 'Home Page',
                label: 'Read the Blog Button',
              })
            }>Read the Blog</button></Link>
        </div>
      </div>
      <div className='justify-between mx-auto lg:max-w-7xl md:flex md:px-48 mb-40'>
        <Summary />
      </div>
    </Layout>
  )
};
