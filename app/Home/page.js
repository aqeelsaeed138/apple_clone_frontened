import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Content Section */}
      <div className='min-h-screen px-4 pt-12'>
        <div className='text-center max-w-2xl mx-auto'>
          {/* iPhone Title */}
          <h1 className='text-5xl sm:text-6xl font-bold text-black mb-3 tracking-tight'>
            iPhone
          </h1>
          
          {/* Subtitle */}
          <h2 className='text-2xl md:text-3xl font-light text-gray-700 mb-5 tracking-wide'>
            Meet the iPhone 16 family.
          </h2>
          
          {/* Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-6'>
            <button className='bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors duration-200 min-w-[140px]'>
              Learn more
            </button>
            <Link href='/store/?category=iphone'>
            <button className='border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-full text-lg font-medium transition-colors duration-200 min-w-[140px]'>
              Shop iPhone
            </button>
            </Link>
          </div>
          
          {/* Apple Intelligence Text */}
          <p className='text-xl md:text-2xl font-light mb-4'>
            Built for{' '}
            <span className='bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-medium'>
              Apple Intelligence
            </span>
            .
          </p>
        </div>
      </div>

      {/* Seamless Image Section */}
      <div className='w-full -mt-40 sm:-mt-80 relative'>
        <div className='relative w-full h-[400px] md:h-[500px] lg:h-[600px]'>
          {/* Mobile Image - shows on small screens */}
          <img 
            src="https://www.apple.com/newsroom/images/product/iphone/geo/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_GEO_09142021_inline.jpg.large_2x.jpg"
            alt="iPhone Mobile View"
            className='sm:hidden w-full h-full object-contain'
            style={{ backgroundColor: '#f3f4f6' }}
          />
          
          {/* Desktop Image - shows on small screens and above */}
          <img 
            src="https://www.apple.com/v/iphone/home/cb/images/overview/consider_modals/environment/modal_trade_in__k5xx81wg61ei_large.jpg"
            alt="iPhone Trade In Environment"
            className='hidden sm:block w-full h-full object-cover object-center'
            style={{ backgroundColor: '#f3f4f6' }}
          />
        </div>
      </div>
      <div className='bg-white p-2'></div>
      <div className='min-h-screen pt-12'>
        <div className='text-center max-w-2xl mx-auto'>
          <h1 className='text-4xl sm:text-5xl font-bold text-black mb-1 sm:mb-3 tracking-tight'>
            WATCH
          </h1>
          
          <h2 className='text-lg sm:text-xl font-bold text-gray-700 mb-1 sm:mb-3 tracking-wide'>
            SERIES 10
          </h2>
          <h2 className='text-xl sm:text-3xl font-light text-gray-700 mb-3 tracking-wide'>
            Thinstant classic
          </h2>
      
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-6'>
            <button className='bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors duration-200 min-w-[140px]'>
              Learn more
            </button>
            <button className='border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-full text-lg font-medium transition-colors duration-200 min-w-[140px]'>
              Buy
            </button>
          </div>
        </div>
        <div className='relative w-full h-[400px] md:h-[500px] lg:h-[600px]'>
          {/* Mobile Image - shows on small screens */}
          <img 
            src="https://www.apple.com/newsroom/images/product/watch/standard/Apple_watch-series7_hero_09142021_big.jpg.slideshow-medium_2x.jpg"
            alt="iPhone Mobile View"
            className='md:hidden w-full h-full object-contain'
            style={{ backgroundColor: '#f3f4f6' }}
          />
          
          {/* Desktop Image - shows on small screens and above */}
          <img 
            src="https://www.apple.com/v/apple-watch-series-10/d/images/overview/welcome/welcome_hero_endframe__d71hj6st53gy_xlarge.jpg"
            alt=""
            className='hidden md:block w-full h-full object-cover object-center'
            style={{ backgroundColor: '#f3f4f6' }}
          />
        </div>
      
      </div>
    </div>
  );
}
