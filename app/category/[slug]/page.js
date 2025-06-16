"use client"
import { useState, useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Main Page Component - now client-side
export default function DetailedPage({ params }) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const slug = params?.slug || 'default-product' // fallback for demo
        const url = `http://localhost:1337/api/products?filters[slug][$eq]=${slug}&publicationState=live&populate=*`
        const res = await fetch(url)
        const json = await res.json()
        
        if (!json.data || json.data.length === 0) {
          setError('Product not found')
          return
        }
        
        setProduct(json.data[0])
      } catch (err) {
        setError('Failed to load product')
        console.error('Error fetching product:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-700">{error || 'Product not found'}</h1>
      </div>
    )
  }

  const imageUrl = product.image?.formats?.small?.url || product.image?.url
  const fullImageUrl = `http://localhost:1337${imageUrl}`

  
  const carouselImages = Array(5).fill(fullImageUrl) 

  return <ProductPageContent product={product} carouselImages={carouselImages} />
}

function ProductPageContent({ product, carouselImages }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [api, setApi] = useState(null)

  // Listen to carousel changes
  useEffect(() => {
    if (!api) return
    
    const handleSelect = () => {
      setCurrentSlide(api.selectedScrollSnap())
    }
    
    api.on("select", handleSelect)
    
    return () => {
      api.off("select", handleSelect)
    }
  }, [api])

  const goToSlide = (index) => {
    if (api) {
      api.scrollTo(index)
      setCurrentSlide(index)
    }
  }

  const handlePrevious = () => {
    if (api && currentSlide > 0) {
      api.scrollPrev()
    }
  }

  const handleNext = () => {
    if (api && currentSlide < carouselImages.length - 1) {
      api.scrollNext()
    }
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10 md:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Product Image Carousel */}
        <div className="relative group">
          {/* Main Carousel Container with shadcn/ui Carousel */}
          <Carousel
            className="w-full"
            setApi={setApi}
            opts={{
              align: "start",
              loop: false,
            }}
          >
            <CarouselContent className="h-[400px] md:h-[500px]">
              {carouselImages.map((imageUrl, index) => (
                <CarouselItem key={index} className="relative">
                  <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg bg-gray-50">
                    <img
                      loading="lazy"
                      src={imageUrl}
                      alt={`${product.name} - View ${index + 1}`}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Image number overlay */}
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-sm font-medium">
                      {index + 1} / {carouselImages.length}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom Previous Arrow - Only show if not on first slide */}
            {currentSlide > 0 && (
              <CarouselPrevious 
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg border-0 w-12 h-12 rounded-full transition-all duration-300 hover:scale-110"
                onClick={handlePrevious}
              />
            )}
            
            {/* Custom Next Arrow - Only show if not on last slide */}
            {currentSlide < carouselImages.length - 1 && (
              <CarouselNext 
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg border-0 w-12 h-12 rounded-full transition-all duration-300 hover:scale-110"
                onClick={handleNext}
              />
            )}

            {/* Touch/Swipe Areas for Mobile */}
            {currentSlide > 0 && (
              <div 
                className="absolute left-0 top-0 w-1/3 h-full z-10 cursor-pointer md:hidden"
                onClick={handlePrevious}
              />
            )}
            {currentSlide < carouselImages.length - 1 && (
              <div 
                className="absolute right-0 top-0 w-1/3 h-full z-10 cursor-pointer md:hidden"
                onClick={handleNext}
              />
            )}
          </Carousel>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-6 space-x-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  index === currentSlide
                    ? 'bg-blue-600 shadow-lg transform scale-110'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {/* Active dot glow effect */}
                {index === currentSlide && (
                  <div className="absolute inset-0 rounded-full bg-blue-400 animate-pulse opacity-75 scale-150"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          {/* Product Title and Pricing */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-lg text-gray-600 mb-1">
                  From ${product.price?.toFixed(0) || '4999'} or ${((product.price || 4999) / 12).toFixed(2)}/mo. for 12 mo.
                  <span className="text-sm align-super">†</span>
                </p>
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-base font-medium hover:bg-blue-700 transition-all duration-200 hover:shadow-lg">
                Buy
              </button>
            </div>
          </div>

          {/* Product Features */}
          <div className="space-y-6">
            {/* Display Size Feature */}
            <div className="flex items-start space-x-4 pb-6 border-b border-gray-100">
              <div className="w-8 h-8 flex-shrink-0 mt-1">
                <svg viewBox="0 0 24 24" className="w-full h-full text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="m8 3 4 8 5-5v11H6.5M15 14l5 5M20.5 8.5H9" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {product.displaySize || 'Good size '} 6K Retina display
                  <span className="text-sm align-super">1</span>
                </h3>
                <p className="text-gray-600">
                  provides astoundingly sharp and detailed imagery
                </p>
              </div>
            </div>

            {/* XDR Feature */}
            <div className="flex items-start space-x-4 pb-6 border-b border-gray-100">
              <div className="w-8 h-8 flex-shrink-0 mt-1 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-gray-700">XDR</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Extreme Dynamic Range (XDR)
                </h3>
                <p className="text-gray-600">
                  for next-level brightness, contrast, and color
                </p>
              </div>
            </div>

            {/* Brightness Feature */}
            <div className="flex items-start space-x-4 pb-6 border-b border-gray-100">
              <div className="w-8 h-8 flex-shrink-0 mt-1">
                <svg viewBox="0 0 24 24" className="w-full h-full text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="m12 2 0 2"/>
                  <path d="m12 20 0 2"/>
                  <path d="m4.93 4.93 1.41 1.41"/>
                  <path d="m17.66 17.66 1.41 1.41"/>
                  <path d="m2 12 2 0"/>
                  <path d="m20 12 2 0"/>
                  <path d="m6.34 17.66-1.41 1.41"/>
                  <path d="m19.07 4.93-1.41 1.41"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {product.brightness || '1000'} nits full-screen sustained brightness and {product.peakBrightness || '1600'} nits peak brightness
                  <span className="text-sm align-super">2</span>
                </h3>
              </div>
            </div>

            {/* Contrast Ratio Feature */}
            <div className="flex items-start space-x-4 pb-6 border-b border-gray-100">
              <div className="w-8 h-8 flex-shrink-0 mt-1">
                <svg viewBox="0 0 24 24" className="w-full h-full text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                  <circle cx="9" cy="9" r="2"/>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {product.contrastRatio || '1,000,000:1'} contrast ratio
                </h3>
                <p className="text-gray-600">
                  and stunningly real XDR imagery
                </p>
              </div>
            </div>

            {/* Color Gamut Feature */}
            <div className="flex items-start space-x-4 pb-6">
              <div className="w-8 h-8 flex-shrink-0 mt-1">
                <svg viewBox="0 0 24 24" className="w-full h-full text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
                  <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
                  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
                  <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  P3 wide color gamut and 10-bit color depth
                </h3>
                <p className="text-gray-600">
                  for the highest-quality color possible
                </p>
              </div>
            </div>
          </div>

          {/* Explore More Link */}
          <div className="pt-4">
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium text-base transition-colors duration-200">
              Explore {product.name} further &gt;
            </a>
          </div>

          {/* Additional Services */}
          <div className="border-t border-gray-200 pt-6 space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Free delivery
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Free returns
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              1-year warranty
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}