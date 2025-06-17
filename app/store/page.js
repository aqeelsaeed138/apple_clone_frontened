import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CategoryCarousel from "../components/categoryCarousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default async function Home({ searchParams }) {
  const baseUrl = "https://great-sunshine-1e8ef876e6.strapiapp.com";
  const selectedCategory = searchParams?.category || null;

  let products = [];
  try {
    const res = await fetch(`${baseUrl}/api/products?populate=*`);

    if (!res.ok) throw new Error("Failed to fetch products");
    const json = await res.json();
    products = json.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        Failed to load products. Please check your server.
      </div>
    );
  }

  const categoryUrl = `${baseUrl}/api/categories?populate=*`;
  const res = await fetch(categoryUrl, { cache: "no-store" });
  const json = await res.json();
  const categories = json.data;

  // Filter products by selected category if one is selected
  let filteredProducts = products;
  if (selectedCategory) {
    filteredProducts = products.filter(product =>
      product.category?.slug === selectedCategory
    );
  }

  // Group products by category name
  const productsByCategory = {};
  filteredProducts.forEach(product => {
    const categoryName = product.category?.name || "Uncategorized";
    if (!productsByCategory[categoryName]) {
      productsByCategory[categoryName] = [];
    }
    productsByCategory[categoryName].push(product);
  });

  // Find the selected category name for display
  const selectedCategoryName = selectedCategory
    ? categories.find(cat => cat.slug === selectedCategory)?.name
    : null;

  return (
    <div className="min-h-screen min-w-screen bg-gray-100 py-10">
      <div className="flex items-center justify-center mb-10">
        <h1 className="text-3xl font-bold">
          {selectedCategoryName ? `${selectedCategoryName} Products` : "Our Products"}
        </h1>
      </div>

      <CategoryCarousel categories={categories} selectedCategory={selectedCategory} />

      {Object.keys(productsByCategory).length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl text-gray-600">No products found in this category.</h2>
        </div>
      ) : (
        Object.entries(productsByCategory).map(([categoryName, items]) => (
          <div key={categoryName} className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 ml-13 sm:ml-25">{categoryName}</h2>

            <Carousel
              opts={{
                align: "start",
                dragFree: true,
                loop: false,
              }}
              className="relative"
            >
              <CarouselContent className="px-6">
                {items.map((product, index) => {
                  const imageUrl = (
                    product.image?.formats?.small?.url ||
                    product.image?.formats?.thumbnail?.url ||
                    product.image?.url
                  );


                  return (
                    <CarouselItem
                      key={product.id}
                      className={`max-w-80 max-h-110 sm:min-w-120 sm:min-h-153 bg-white rounded-3xl shadow-sm 
                      transition-all duration-1000 transform hover:scale-103 hover:shadow-2xl p-6 m-2 ml-4 
                      flex flex-col group cursor-pointer
                      ${index === 0 ? 'ml-10 sm:ml-22' : ''} 
                      ${index === items.length - 1 ? 'mr-10 sm:mr-22' : ''}`}
                    >
                      <div className="flex flex-col h-full">
                        <Link href={`/category/${product.slug}`}>
                          {/* Header section with fixed height */}
                          <div className="mb-4 sm:mb-5 pl-2 sm:pl-5 min-h-[80px] sm:min-h-[120px] flex flex-col justify-start">
                            <span className="inline-block text-orange-700 text-lg sm:text-xl font-semibold sm:py-1 rounded-full sm:mb-1">New</span>
                            {/* Fixed height container for product name */}
                            <div className="h-[48px] sm:h-[72px] flex items-start">
                              <h3 className="text-2xl sm:text-4xl font-semibold text-gray-900 leading-tight line-clamp-2">
                                {product.name}
                              </h3>
                            </div>
                          </div>

                          <div className="relative grid place-items-center mb-4 flex-grow
                                        overflow-hidden text-center group min-h-[200px] sm:min-h-[280px]">
                            <img
                              loading="lazy"
                              width={360}
                              height={280}
                              src={imageUrl}
                              alt={product.name}
                              className="w-full h-full object-contain rounded-xl transition-transform duration-1000 group-hover:scale-103"
                            />

                            <Button
                              variant="default"
                              size="lg"
                              className="absolute bottom-2 opacity-0 scale-95 z-10 
                                        group-hover:opacity-100 group-hover:scale-100 
                                        transition-all duration-600 ease-in-out
                                        group-hover:z-20 cursor-pointer hover:bg-blue-600 
                                        rounded-4xl group-hover:-translate-y-8 px-6 py-7
                                        text-lg font-medium text-white"
                            >
                              Take a closer look
                            </Button>
                          </div>

                          <div className="mt-auto pt-4 sm:pt-6 sm:mb-8 flex items-end justify-between space-x-2 sm:p-3">
                            <p className="sm:text-lg font-normal text-sm leading-tight">
                              From ${product.price?.toFixed(0) || '4999'} or ${((product.price || 4999) / 12).toFixed(2)}/mo. for 12 mo.
                              <span className="text-sm align-super">†</span>
                            </p>
                            <button
                              href={`/category/${product.slug}`}
                              className="bg-blue-600 text-white py-1 sm:py-2.5 px-3 sm:px-6 rounded-3xl hover:bg-blue-700 cursor-pointer whitespace-nowrap"
                            >
                              Buy
                            </button>
                          </div>
                        </Link>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="w-14 h-14 ml-10 bg-slate-200 text-slate-700 rounded-full shadow-lg hover:bg-slate-300  transition" />
              <CarouselNext className="w-14 h-14 mr-10 bg-slate-200 text-slate-700 rounded-full shadow-lg hover:bg-slate-300 transition" />
            </Carousel>
          </div>
        ))
      )}
      {selectedCategory && (
        <div className="flex justify-center py-16">
          <Link
            href="/store"
            className="px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            View All Products
          </Link>
        </div>
      )}
    </div>
  );
}