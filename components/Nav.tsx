import Link from 'next/link';

const Nav = () => {
  const openInNewTab = (url:string) => {
    window.open(url, '_blank', 'noreferrer');
  };
    return (
        <nav
        className='
        flex flex-wrap
        items-center
        justify-between
        w-full
        py-4
        md:py-0
        px-4
        text-lg text-gray-700
        bg-white'
        >
            <div>
                <Link href='/'>
                        Katy
                </Link>
            </div>
        <div
        className="hidden w-full md:flex md:items-center md:w-auto"
        id="menu"
      >
        <ul
          className="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0 space-x-2"
        >
          <li>
            <Link href='/blog'>
                Blog
            </Link>
          </li>
          <li>
            <Link href='/about'>
                About
            </Link>
          </li>
          <li>
            <a target='_blank' href='https://www.katyrosli.com/#portfolio' rel='noopener noreferrer'>Portfolio</a>
          </li>
        </ul>
        </div>
        </nav>
    )
};
export default Nav;
