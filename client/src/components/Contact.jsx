import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({listing}) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        console.log('Fetching landlord with userRef:', listing.userRef);
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        console.log('Landlord data', data);
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLandlord();
  }, [listing.userRef]);

  console.log('Listing:', listing);
  console.log('Landlord:', landlord);

  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>
            {landlord.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border border-gray-600 p-3 rounded-sm'
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className='bg-black text-white text-center rounded-sm w-[120px] items-center p-2 hover:opacity-90'
          >
            Send message
          </Link>
        </div>
      )}
    </>
  )
}
