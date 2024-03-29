import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-black shadow-lg sticky top-0 z-10'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-2'>
        <Link to='/'>
          <h1 className='text-lg sm:text-2xl flex flex-wrap'>
            <span className='text-orange-400'>Orange</span>
            <span className='text-white'>Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-1 rounded-sm flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch />
          </button>
        </form>
        <ul className='flex gap-4 text-md text-white items-center'>
          <Link to='/'>
            <li className='hidden sm:inline hover:font-bold'>home</li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline hover:font-bold'>about</li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img className='rounded-full h-8 w-8 object-cover' src={currentUser.avatar} alt='profile' />
            ) : (
              <li className='hover:font-bold'>sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
