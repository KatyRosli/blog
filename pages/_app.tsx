import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import { ImageUrl } from '@/utils';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <DefaultSeo 
      title='codewithkatyrosli.com'
      description='Katy Rosli: Experienced Frontend Developer | Fullstack Developer'
      openGraph={{
        url: 'https://www.codewithkatyrosli.com',
        title: 'Katy Rosli, experienced Frontend Developer | Fullstack Developer',
        description: 'Experienced Frontend Developer | Fullstack Developer',
        images: [
          {
            url: `${ImageUrl('banner.png')}`,
            width: 200,
            height: 118,
            alt: 'banner',
            type: 'image/jpeg',
          },
        ],
        site_name: 'Code With Katy Rosli',
      }} />
    <ThemeProvider attribute='class'>
      <Component {...pageProps} />
    </ThemeProvider>
    </>
  ) 
}
