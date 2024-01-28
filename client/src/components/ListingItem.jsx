import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

export default function ListingItem({ listing }) {
  SwiperCore.use([Navigation]);
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-sm w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <Swiper navigation={{nextEl:'.button-next-slide', prevEl:'.button-prev-slide'}} className='relative group'>
          {listing.imageUrls.map((url) => (
            <SwiperSlide key={url}>
              <img
                src={url}
                alt='listing images'
                className='relative h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
              />
            </SwiperSlide>
          ))}
          <div className='top-[50%] absolute z-10 button-prev-slide group-hover:left-0 -left-[23rem] duration-300 w-[20px] h-[20px] bg-black opacity-85 text-white text-sm grid place-items-center'>
            <HiOutlineArrowNarrowLeft />
          </div>
          <div className='top-[50%] absolute z-10 button-next-slide group-hover:right-0 -right-[23rem] duration-300 w-[20px] h-[20px] bg-black opacity-85 text-white grid place-items-center'>
            {" "}
            <HiOutlineArrowNarrowRight />
          </div>
        </Swiper>
        {/* <img
          src={listing.imageUrls[0]}
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        /> */}
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold'>{listing.name}</p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-orange-500'/>
            <p className='text-sm truncate w-full'>{listing.address}</p>
          </div>
          <div>
            <p className='text-sm text-gray-900 line-clamp-3 text-justify'>{listing.description}</p>
            <p className='mt-2 font-semibold'>
              {listing.offer ? listing.discountPrice.toLocaleString('fr-FR') : listing.regularPrice.toLocaleString('fr-FR')}€
              {listing.type === 'rent' && ' / month'}
            </p>
            <div className='text-gray-600 flex gap-4'>
              <div className='text-xs font-bold'>
                {listing.bedrooms > 1 ? `${listing.bedrooms} bedrooms ` : `${listing.bedrooms} bedroom `}
              </div>
              <div className='text-xs font-bold'>
                {listing.bathrooms > 1 ? `${listing.bathrooms} bathrooms ` : `${listing.bathrooms} bathroom `}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
