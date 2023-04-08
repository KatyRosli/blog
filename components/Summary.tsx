import Image from 'next/image';
import ProfilePhoto from './assets/ProfilePhoto.svg';

const Summary = () => {
  return (
    <div className='max-w-7xl w-full lg:max-w-full mx-auto lg:flex border border-gray-400 rounded-md'>
      <div className='h-46'>
        <Image src={ProfilePhoto} alt='profile photo'/>
      </div>
      <div className="p-2 flex flex-col justify-between leading-normal max-w-7xl">
        <p className="text-base mb-0 my-1 ml-2">I’m a Frontend Developer who is passionate about programming with TypeScript and
          JavaScript to create beautiful responsive web applications. I love to learn 
          and stay up to date with the latest technologies. This blog is about me sharing what my passion about programming.
          Outside of work, I enjoy skiing and kayaking as my hobbies. I live in Stockholm, Sweden with my husband and my son 
          and I’m excited to share my knowledge and insights on my blog.</p>
      </div>
    </div>
  )
};

export default Summary;
