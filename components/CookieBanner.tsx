import { useState } from 'react';

const CookieBanner: React.FC = () => {
    const [accepted, setAccepted] = useState(false);

    const handleAccept = () => {
        setAccepted(true);
    };

    if (accepted) {
        return null;
    }
    return (
        <div className='fixed bottom-0 w-full bg-violet-900 text-white py-4 px-4 md:px-16'>
            <div className='container mx-auto flex justify-center items-center'>
                <p className='text-base'>This website uses cookies to enchance the user experience.</p>
                <button className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded-full ml-4" onClick={handleAccept}>I understand</button>
            </div>
        </div>
    )
};

export default CookieBanner;