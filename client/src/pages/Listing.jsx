import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useSelector } from 'react-redux';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare } from 'react-icons/fa';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi';
import Contact from '../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const {currentUser} = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong !</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation={{nextEl:'.button-next-slide', prevEl:'.button-prev-slide'}} className='relative group'>
            {listing.imageUrls.map((url) => ( 
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
            <div className='top-[50%] absolute z-10 button-prev-slide group-hover:left-0 -left-[23rem] duration-300 w-[40px] h-[40px] bg-black opacity-70 cursor-pointer text-white text-sm grid place-items-center'>
              <HiOutlineArrowNarrowLeft />
            </div>
            <div className='top-[50%] absolute z-10 button-next-slide group-hover:right-0 -right-[23rem] duration-300 w-[40px] h-[40px] bg-black opacity-70 cursor-pointer text-white grid place-items-center'>
              {" "}
              <HiOutlineArrowNarrowRight />
            </div>
          </Swiper>
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied !
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-5xl font-bold'>
              {listing.name}
            </p>
            <p className='text-2xl font-semibold'>
              {listing.offer ? listing.discountPrice.toLocaleString('fr-FR') : listing.regularPrice.toLocaleString('fr-FR')}
              €
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-3 gap-2 text-gray-500'>
              <FaMapMarkerAlt className='text-orange-500 text-lg' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-black w-full max-w-[150px] text-white text-center p-1'>
                {listing.type === 'rent' ? 'For rent' : 'For sale' }
              </p>
              {
                listing.offer && (
                  <p className='bg-orange-500 w-full max-w-[175px] text-white font-semibold text-center p-1'>
                    {(+listing.regularPrice - +listing.discountPrice).toLocaleString('fr-FR')}€ discount
                  </p>
                )
              }
            </div>
          <p className='font-semibold text-black'>Description</p>
          <p className='text-gray-800 -mt-3 text-justify'>
            {listing.description}
          </p>
          <ul className='font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
            <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaBed className='text-xl' />
              {listing.bedrooms > 1 ? `${listing.bedrooms} bedrooms ` : `${listing.bedrooms} bedroom `}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaBath className='text-xl' />
              {listing.bathrooms > 1 ? `${listing.bathrooms} bathrooms ` : `${listing.bathrooms} bathroom `}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaParking className='text-xl' />
              {listing.parking ? 'Parking spot' : 'No parking'}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaChair className='text-xl' />
              {listing.furnished ? 'Furnished' : 'Unfurnished'}
            </li>
          </ul>
          {currentUser && listing.userRef !== currentUser._id && !contact && (
            <button
              onClick={() => setContact(true)}
              className='bg-black text-white uppercase hover:opacity-90 hover:font-bold p-3'
            >
              Contact landlord
            </button>
          )}
          {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}