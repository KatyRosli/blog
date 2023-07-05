import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import { ImageUrl } from '@/utils';
import Script from 'next/script';
import { GA_TRACKING_ID, pageview } from '../gtag';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CookieBanner from '@/components/CookieBanner';
import Layout from '@/components/Layout';
import ReactGA from 'react-ga';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const COOKIE_CONSENT_KEY = 'cookieConsent';
  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
  };

  router.events.on('routeChangeComplete', handleRouteChange);

  return () => {
    router.events.off('routeChangeComplete', handleRouteChange);
  };
}, [router.events]);

  useEffect(() => {
    if(cookieConsent) {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, [cookieConsent]);
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
      {!cookieConsent && <CookieBanner />}
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
