import { useState } from "react";
import { BsSearch } from "react-icons/bs";

const SearchBox = (props: { setSearchValue: (arg0: string) => void; value: string | number | readonly string[] | undefined; }) => {
    const [searchValue, setSearchValue] = useState('');

    const onKeyDownHandler = (event: { key: string; }) => {
        if (event.key === 'Enter' && searchValue && searchValue.length > 0) {
            props.setSearchValue(searchValue);
        }
    }

    return (
        <div className='flex justify-start'>
            <div className='mb-3 xl:w-96'>
                <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                    <input type='search'
                    id='' value={props.value}
                    className='relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-200'
                    onChange={(event) => setSearchValue(event.target.value)}
                    onKeyDown={onKeyDownHandler}
                    placeholder='Search blogpost...' />
                    <button
                    type='button'
                    className='relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg'>
                        <BsSearch /></button>
                    </div>
            </div>
        </div>
    );
};

export default SearchBox;