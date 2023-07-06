import Link from 'next/link';
import { useState, useEffect } from 'react';
import { BsFillBrightnessHighFill, BsFillMoonFill, BsList, BsXLg } from 'react-icons/bs';
import { useTheme } from 'next-themes';
import { event } from '../gtag';

const Nav = () => {
  const [mounted, setMounted] = useState(false);
  const {theme, setTheme} = useTheme()
  const [nav, setNav] = useState(false);
  const openInNewTab = (url:string) => {
    window.open(url, '_blank', 'noreferrer');
  };
  useEffect(() => setMounted(true), [])
  if(!mounted) return null;

  const hanldeThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    event({
      action: 'theme_toggle',
      category: 'Nav',
      label: `Theme: ${theme === 'light' ? 'dark' : 'light'}`,
    });
  };

  const handleNavTooggle = () => {
    setNav(!nav);
    event({
      action: 'nav_toggle',
      category: 'Nav',
      label: `Nav: ${!nav ? 'open' : 'closed'}`,
    });
  };

    return (
      <div className='mb-24'>
        <nav className='bg-violet-50 dark:bg-stone-900 w-full top-0 left-0 right-0 z-10'>  
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-48">
        <div>
          <div className='flex items-center justify-between py-3 md:py-5 md:block'>
            <div className='flex items-center pr-2'>
                {/* LOGO */}
                <Link href='/'>
                  <h4 className='px-4 text-violet-700 text-2xl font-bold'>Katy</h4>
                </Link>
                <button className='px-4 light:text-dark dark:text-light'
                onClick={hanldeThemeChange}> 
                  {theme === 'light' ? <BsFillMoonFill/> : <BsFillBrightnessHighFill/>}
                </button>
                </div>
            {/* HAMBURGER BUTTON FOR MOBILE */}
            <div className="md:hidden">
                <button
                  className="p-2 rounded-md outline focus:border-gray-400 focus:border"
                  onClick={handleNavTooggle}>
                  {nav ? <BsXLg /> : <BsList />}
                </button>
                </div>
                </div>
              </div>
              <div>
              <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                nav ? 'p-12 md:p-0 block' : 'hidden'
              }`}
            >
            <ul className='h-screen md:h-auto items-center justify-center md:flex'>
          <li className='pb-6 text-xl pt-5 my-0 md:px-6 text-center border-b-2 md:border-b-0 hover:bg-violet-700  border-violet-700  md:hover:text-violet-700 md:hover:bg-transparent'
            onClick={() =>
              event({
                action: 'blog_button_click',
                category: 'Nav',
                label: 'Blog Button',
              })
            }
          >
            <Link href='/blog'>
              <h5>Blog</h5>
            </Link>
          </li>
          <li className='pb-6 text-xl pt-5 my-0 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-violet-700  border-violet-700  md:hover:text-violet-700 md:hover:bg-transparent'
            onClick={() =>
              event({
                action: 'about_button_click',
                category: 'Nav',
                label: 'About Button',
              })
            }
          >
            <Link href='/about'>
              <h5>About</h5>
            </Link>
          </li>
          <li className='pb-6 text-xl pt-5 my-0 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-violet-700  border-violet-700  md:hover:text-violet-700 md:hover:bg-transparent'
            onClick={() =>
              event({
                action: 'portfolio_button_click',
                category: 'Nav',
                label: 'Portfolio Button',
              })
            }
          >
            <a target='_blank' href='https://www.katyrosli.com/#portfolio' rel='noopener noreferrer'>
              <h5>Portfolio</h5></a>
          </li>
        </ul>
        </div>
        </div>
        </div>
        </nav>
        </div>
    )
};
export default Nav;
