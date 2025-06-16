'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const BASE_URL = "http://localhost:1337";

export default function CategoryCarousel({ categories, selectedCategory }) {
  const [api, setApi] = useState();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const updateScrollState = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    // Initial state
    updateScrollState();

    // Listen for scroll events
    api.on("scroll", updateScrollState);
    api.on("reInit", updateScrollState);

    return () => {
      api.off("scroll", updateScrollState);
      api.off("reInit", updateScrollState);
    };
  }, [api]);

  const getImageUrl = (image) => {
    return BASE_URL + (
      image?.formats?.small?.url ||
      image?.formats?.thumbnail?.url ||
      image?.url
    );
  };

  return (
    <div className="w-full bg-gray-100">
      <div className="relative">
        <Carousel 
          opts={{
            align: "start",
            dragFree: true,
            loop: false,
            duration: 25,
            skipSnaps: false,
          }}
          setApi={setApi} 
          className="mx-auto relative"
        >
          <CarouselContent className="px-6 gap-4 scroll-smooth">
            {categories.map((category, index) => (
              <CarouselItem 
                key={category.id} 
                className={`max-w-30 max-h-33 sm:max-w-38 sm:max-h-41 ${
                  index === 0 ? "ml-20" : ""
                } ${
                  index === categories.length - 1 ? "mr-20" : ""
                }`}
              >
                <Link href={`/store/?category=${category.slug}`}>
                  <div className="bg-gray-100">
                    <img
                      loading="lazy"
                      src={getImageUrl(category.image)}
                      alt={category.name}
                      width={350}
                      height={230}
                      className="object-contain"
                    />
                    <div className="p-4 text-center">
                      <h2 className="text-sm font-medium mb-2 text-gray-700">
                        {category.name}
                      </h2>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {canScrollPrev && (
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-slate-200 text-slate-700 rounded-full shadow-lg hover:bg-slate-300 transition-colors" />
          )}
          {canScrollNext && (
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-slate-200 text-slate-700 rounded-full shadow-lg hover:bg-slate-300 transition-colors" />
          )}
        </Carousel>
      </div>
    </div>
  );
}