import { Link } from 'react-router-dom';
import { HiArrowRight, HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

import ListingItem from '../components/ListingItem';

export default function Home() {

  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  SwiperCore.use([Navigation]);

  console.log(offerListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=6');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch('api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
      {/*  top */}
      <div className='flex flex-col gap-6 p-20 px-3 max-w-6xl mx-auto'>
        <h1 className='font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-orange-500'>perfect</span>
          <br />
          place with <span className='text-orange-500'>ease</span>.
        </h1>
        <div className='text-gray-800 text-md md:text-xl'>
          Let Orange Estate find your dream home in the most magnificent places in the world.
          <br />
          We focus on searching and proposing a wide range of quality properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='flex items-center text-md md:text-lg font-bold gap-1 hover:scale-95 transition-scale duration-300'
        >
          Let's get <span className='text-orange-500'>started</span>
          <HiArrowRight />
        </Link>
      </div>

      {/*  Swiper */}
      <Swiper navigation={{nextEl:'.button-next-slide', prevEl:'.button-prev-slide'}} className='relative group'>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))
        }
        <div className='top-[50%] absolute z-10 button-prev-slide group-hover:left-0 -left-[23rem] duration-300 w-[40px] h-[40px] bg-black opacity-70 cursor-pointer text-white text-sm grid place-items-center'>
          <HiOutlineArrowNarrowLeft />
        </div>
        <div className='top-[50%] absolute z-10 button-next-slide group-hover:right-0 -right-[23rem] duration-300 w-[40px] h-[40px] bg-black opacity-70 cursor-pointer text-white grid place-items-center'>
          {" "}
          <HiOutlineArrowNarrowRight />
        </div>
      </Swiper>

      {/* Listing results for offer, sale and rent */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold'>Recent offers</h2>
              <Link to={'/search?offer=true'} className='text-sm text-gray-600 flex items-center gap-1 hover:font-bold'>
                show more offers
                <HiArrowRight />
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold'>Recent places for rent</h2>
              <Link to={'/search?type=rent'} className='text-sm text-gray-600 flex items-center gap-1 hover:font-bold'>
                show more places for rent
                <HiArrowRight />
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold'>Recent places for sale</h2>
              <Link to={'/search?type=sale'} className='text-sm text-gray-600 flex items-center gap-1 hover:font-bold'>
                show more places for sale
                <HiArrowRight />
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
