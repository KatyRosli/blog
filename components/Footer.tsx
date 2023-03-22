import { BsLinkedin, BsGithub, BsBehance, BsInstagram } from 'react-icons/bs';

const Footer = () => {
    const openInNewTab = (url:string) => {
        window.open(url, '_blank', 'noreferrer');
    };
    return (
        <footer
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
          <BsLinkedin onClick={() => openInNewTab('https://www.linkedin.com/in/katy-rosli-761b70185/')} />
          </li>
          <li>
          <BsGithub onClick={() => openInNewTab('https://github.com/KatyRosli')} />
          </li>
          <li>
          <BsBehance onClick={() => openInNewTab('https://www.behance.net/KatyLii')} />
          </li>
          <li>
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