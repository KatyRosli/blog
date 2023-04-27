import { useState } from "react";

const Search = (props: { setSearchValue: (arg0: string) => void; value: string | number | readonly string[] | undefined;}) => {
  const [searchValue, setSearchValue] = useState('');

  const onKeyUpHandler = (event: { key: string; }) => {
    if (searchValue.length === 0) {
      props.setSearchValue('');
    }
  }

  const onEnterKeyDownHandler = (event: { key: string; }) => {
    if (event.key === 'Enter' && searchValue && searchValue.length > 0) {
      props.setSearchValue(searchValue);
    }
  }

  return (
    <div className='flex justify-start'>
      <div className='mb-3 xl:w-96'>
        <div className='relative mb-3 flex w-full flex-wrap items-stretch'>
          <input 
            type='search'
            value={searchValue}
            className='search-input relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-full border border-solid border-neutral-500 dark:border-neutral-400 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary'
            onChange={(event) => setSearchValue(event.target.value)}
            onKeyUp={onKeyUpHandler}
            onKeyDown={onEnterKeyDownHandler}
            placeholder='Search blogpost...'
          />
        </div>
      </div>
    </div>
  );
};

export default Search;

