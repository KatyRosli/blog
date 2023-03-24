import { BsLinkedin, BsGithub, BsBehance, BsInstagram } from 'react-icons/bs';

const Footer = () => {
    const openInNewTab = (url:string) => {
        window.open(url, '_blank', 'noreferrer');
    };
    return (
        <footer className='bg-neutral-100 dark:bg-stone-900 w-full fixed bottom-0 p-4'>
        <div className="w-full md:flex md:w-auto">
        <ul className="justify-between px-4 mx-auto lg:max-w-7xl md:flex md:px-8">
          <li className='pb-6 text-xl py-2 md:px-6 text-center border-b-2 md:border-b-0'>
          <button><BsLinkedin onClick={() => openInNewTab('https://www.linkedin.com/in/katy-rosli-761b70185/')} /></button>
          </li>
          <li className='pb-6 text-xl py-2 md:px-6 text-center border-b-2 md:border-b-0'>
          <button><BsGithub onClick={() => openInNewTab('https://github.com/KatyRosli')} /></button>
          </li>
          <li className='pb-6 text-xl py-2 md:px-6 text-center border-b-2 md:border-b-0'>
          <button><BsBehance onClick={() => openInNewTab('https://www.behance.net/KatyLii')} /></button>
          </li>
          <li className='pb-6 text-xl py-2 md:px-6 text-center border-b-2 md:border-b-0'>
          <button><BsInstagram onClick={() => openInNewTab('https://www.instagram.com/katy.rosli/')} /></button>
          </li>
        </ul>
        </div>
        <div className='justify-center mx-auto lg:max-w-7xl md:items-center md:flex md:px-8'>
            <p>© 2023 Katy Rosli</p>
            </div>
        </footer>
    )
};
export default Footer;