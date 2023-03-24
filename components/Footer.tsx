import { BsLinkedin, BsGithub, BsBehance, BsInstagram } from 'react-icons/bs';

const Footer = () => {
    const openInNewTab = (url:string) => {
        window.open(url, '_blank', 'noreferrer');
    };
    return (
        <footer className='bg-neutral-100 dark:bg-stone-900 w-full fixed bottom-0'>
        <div className="w-full md:flex md:items-center md:w-auto">
        <ul className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <li className='pb-6 text-xl py-2 md:px-6 text-center border-b-2 md:border-b-0'>
          <BsLinkedin onClick={() => openInNewTab('https://www.linkedin.com/in/katy-rosli-761b70185/')} />
          </li>
          <li className='pb-6 text-xl py-2 md:px-6 text-center border-b-2 md:border-b-0'>
          <BsGithub onClick={() => openInNewTab('https://github.com/KatyRosli')} />
          </li>
          <li className='pb-6 text-xl py-2 md:px-6 text-center border-b-2 md:border-b-0'>
          <BsBehance onClick={() => openInNewTab('https://www.behance.net/KatyLii')} />
          </li>
          <li className='pb-6 text-xl py-2 md:px-6 text-center border-b-2 md:border-b-0'>
          <BsInstagram onClick={() => openInNewTab('https://www.instagram.com/katy.rosli/')} />
          </li>
        </ul>
        </div>
        <div>
            <p className='copyrights'>© 2023 Katy Rosli</p>
            </div>
        </footer>
    )
};
export default Footer;