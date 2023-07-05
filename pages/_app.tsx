import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import { ImageUrl } from '@/utils';
import Script from 'next/script';
import { GA_TRACKING_ID, pageview } from '../gtag';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
  };

  router.events.on('routeChangeComplete', handleRouteChange);

  return () => {
    router.events.off('routeChangeComplete', handleRouteChange);
  };
}, [router.events]);
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
            width: 100,
            height: 59,
            alt: 'banner',
            type: 'image/jpeg',
          },
        ],
        site_name: 'Code With Katy Rosli',
      }} />
    <ThemeProvider attribute='class'>
      <Component {...pageProps} />
    </ThemeProvider>
    <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
